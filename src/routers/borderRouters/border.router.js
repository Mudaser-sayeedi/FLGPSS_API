import express from "express";
import { borderModel } from "../../model/border.model.js";
import { borders } from "../../model/data.js";

export const BorderRouter = express.Router();

BorderRouter.get("/", (req, res) => {
  // return res.status(200).json(borders);
  borderModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
});

// add employee
BorderRouter.post("/register", (req, res) => {
  const { company_name, owner, product, imports, exports, pricePerLiter } =
    req.body;

  const tax = 0.40;

  // save to mongoDB
  if (company_name && owner && product && imports && exports && pricePerLiter) {
    borderModel.create(
      {
        company_name,
        owner,
        product,
        imports: `${imports} Liter`,
        exports: `${exports} Liter`,
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
BorderRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await borderModel.findOneAndUpdate(filter, update, {
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
BorderRouter.post("/delete", (req, res) => {
  const { id } = req.body;

  borderModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});
