import express from "express";
import { PRIMetterReading, PRIPumpStation } from "../../model/data.js";
import { PPSModel } from "../../model/PPS.model.js";
import { PPS_MRModel } from "../../model/PPS_MetterReading.model.js";

export const PriPumpRouter = express.Router();

PriPumpRouter.get("/pumpstations", (req, res) => {
  // return res.status(200).json(PRIPumpStation);
  PPSModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
PriPumpRouter.post("/register", (req, res) => {
  const {
    license_number,
    tank_name,
    owner,
    location,
    phone,
    IPG_Gun,
    pertrol_gun,
    desal_gun,
    tax,
  } = req.body;

  // save to mongoDB
  if (
    license_number &&
    tank_name &&
    owner &&
    location &&
    phone &&
    IPG_Gun &&
    pertrol_gun &&
    desal_gun &&
    tax
  ) {
    PPSModel.create(
      {
        license_number,
        tank_name,
        owner,
        location,
        phone,
        IPG_Gun,
        pertrol_gun,
        desal_gun,
        tax,
      },
      (e, doc) => {
        if (e) {
          return res.json({
            regestration: "unsuccessful",
          });
        }
      }
    );

    // send respond to client
    return res.json({ regestration: "successful" });
  }

  return res.json({
    regestration: "unsuccessful",
  });
});

// update employee
PriPumpRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await PPSModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  // console.log(doc);

  if (doc) {
    return res.status(200).json({ regestration: "successful" });
  } else {
    return res.status(200).json({ regestration: "unsuccessful" });
  }
});

// delete employee
PriPumpRouter.post("/delete", (req, res) => {
  const { id } = req.body;

  PPSModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});

// --------------------------------------------------
// metter reading routers here
PriPumpRouter.get("/metterReading", (req, res) => {
  // return res.status(200).json(PRIMetterReading);
  PPS_MRModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
PriPumpRouter.post("/metterReading/register", (req, res) => {
  const {
    tank_name,
    id_number,
    location,
    product,
    current_degree,
    pricePerLiter,
  } = req.body;

  const tax = 0.40;

  // save to mongoDB
  if (
    tank_name &&
    id_number &&
    location &&
    product &&
    current_degree &&
    pricePerLiter
  ) {
    PPS_MRModel.create(
      {
        tank_name,
        id_number,
        location,
        product,
        total_liter: current_degree,
        total_charges: Number(pricePerLiter) / tax + " (AFG)",
      },
      (e, doc) => {
        if (e) {
          return res.json({
            regestration: "unsuccessful",
          });
        }
      }
    );

    // send respond to client
    return res.json({ regestration: "successful" });
  }

  return res.json({
    regestration: "unsuccessful",
  });
});

// update employee
PriPumpRouter.post("/metterReading/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await PPS_MRModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  // console.log(doc);

  if (doc) {
    return res.status(200).json({ regestration: "successful" });
  } else {
    return res.status(200).json({ regestration: "unsuccessful" });
  }
});

// delete employee
PriPumpRouter.post("/metterReading/delete", (req, res) => {
  const { id } = req.body;

  PPS_MRModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});
