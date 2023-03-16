import express from "express";
import { userModel } from "../../model/user.model.js";

export const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
  const { username, password } = req.body;
  console.table([
    { username: username, password: password },
    // { username: username, password: password },
  ]);
  userModel.find({ username, password }, (err, doc) => {
    // console.log(doc.length);
    if (doc.length) {
      return res.status(200).json({ login: true, data: doc });
    }
    return res.status(404).json({ login: false});
  });
  // return res.json({ username, password });
});
