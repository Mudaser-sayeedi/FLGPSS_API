import express from "express";
import { GOVMetterReading, GOVPumpStation } from "../../model/data.js";
import { GPSModel } from "../../model/GPS.model.js";
import { GPS_MRModel } from "../../model/GPS_MetterReading.model.js";

export const GovPumpRouter = express.Router();

GovPumpRouter.get("/pumpstations", (req, res) => {
  // return res.status(200).json(GOVPumpStation);
  GPSModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
GovPumpRouter.post("/register", (req, res) => {
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
    GPSModel.create(
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
GovPumpRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await GPSModel.findOneAndUpdate(filter, update, {
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
GovPumpRouter.post("/delete", (req, res) => {
  const { id } = req.body;

  GPSModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});

// --------------------------------------------------
// Metter Reading routers here
GovPumpRouter.get("/metterReading", (req, res) => {
  // return res.status(200).json(GOVMetterReading);
  GPS_MRModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
GovPumpRouter.post("/metterReading/register", (req, res) => {
  const {
    tank_name,
    id_number,
    location,
    product,
    current_degree,
    pricePerLiter,
  } = req.body;

  const tax = 0.20;

  // save to mongoDB
  if (
    tank_name &&
    id_number &&
    location &&
    product &&
    current_degree &&
    pricePerLiter
  ) {
    GPS_MRModel.create(
      {
        tank_name,
        id_number,
        location,
        product,
        total_liter: current_degree,
        total_charges:
          (Number(pricePerLiter) / tax) * Number(current_degree) + " (AFG)",
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
GovPumpRouter.post("/metterReading/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await GPS_MRModel.findOneAndUpdate(filter, update, {
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
GovPumpRouter.post("/metterReading/delete", (req, res) => {
  const { id } = req.body;

  GPS_MRModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});
