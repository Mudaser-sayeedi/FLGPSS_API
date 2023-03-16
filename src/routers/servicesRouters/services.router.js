import { services } from "../../model/data.js";
import express from "express";
import { serviceModel } from "../../model/service.model.js";

export const ServicesRouter = express.Router();

ServicesRouter.get("/", (req, res) => {
  // return res.status(200).json(services);
  serviceModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
ServicesRouter.post("/register", (req, res) => {
  const { company_name, owner, Reserve, Ton, FeeTonCharges } = req.body;

  // const tax = 2.5;

  // save to mongoDB
  if (company_name && owner && Reserve && Ton && FeeTonCharges) {
    serviceModel.create(
      {
        company_name,
        owner,
        reserve: Reserve,
        ton: Ton,
        feeTonChargesPerMonth: FeeTonCharges + " (AFG)",
        total_charges: Number(FeeTonCharges) * Ton + " (AFG)",
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
ServicesRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await serviceModel.findOneAndUpdate(filter, update, {
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
ServicesRouter.post("/delete", (req, res) => {
  const { id } = req.body;

  serviceModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});
