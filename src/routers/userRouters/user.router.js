import express from "express";
import { userModel } from "../../model/user.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";

export const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "user/profile");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
// multer({dest:"public/image"})
const upload = multer({ storage: storage });

userRouter.get("/info", (req, res) => {
  userModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
  // console.log(data);
  // return res.status(200).json(employees);
});

// add user
userRouter.post("/register", upload.single("file"), async (req, res) => {
  const { name, username, role, password } = req.body;
  const { filename } = req.file;

  // console.table([
  //   { name, fname, gfname, job, phone, email, education, departement },
  // ]);

  // save to mongoDB
  if (name && username && role && password) {
    userModel.create(
      {
        name,
        username,
        role,
        password,
        profilePicture: filename,
        createdAt: new Date(),
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
    return res.json({
      regestration: "successful",
    });
  }

  return res.json({
    regestration: "unsuccessful",
  });
});

// get profile picture
userRouter.get("/profile-picture/:userName", async (req, res) => {
  const user = await userModel.findOne({ name: req.params.userName });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Retrieve the file data from the file system
  const filePath = `user/profile/${user.profilePicture}`;
  const imageData = fs.readFileSync(filePath);

  // Convert the image data to a Base64-encoded string
  const base64Image = imageData.toString("base64");

  // Send the Base64-encoded string as the response body
  res.json({ image: base64Image });
});

// update user
userRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await userModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  // console.log(doc);

  if (doc) {
    return res.status(200).json({ regestration: "successful" });
  } else {
    return res.status(200).json({ regestration: "unsuccessful" });
  }
});

// update user profile setting
userRouter.put(
  "/setting/:userName",
  upload.single("file"),
  async (req, res) => {
    const { name, username, role, password, profilePicture } = req.body;
    // const { filename } = req.file;
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.userName },
      {
        name,
        username,
        role,
        password,
        profilePicture: req.file ? req.file.filename : profilePicture,
      },
      { new: true }
    );

    if (!user) {
      return res.status(200).json({ regestration: "unsuccessful" });
      // return res.status(404).json({ message: "User not found" });
    }

    const oldFilePath = `user/profile/${profilePicture}`;
    // const newFilePath = `user/profile/${req.file.filename}`;

    req.file && fs.unlinkSync(oldFilePath);
    // fs.renameSync(req.file.path, newFilePath);

    return res.status(200).json({ regestration: "successful", data: user });
    // return res.json({ message: "User updated successfully" });
  }
);

// delete user
userRouter.post("/delete", async (req, res) => {
  const { id } = req.body;

  const user = await userModel.findOneAndDelete({ _id: id });
  if (!user) {
    // return res.status(404).json({ message: "User not found" });
    return res.status(404).json({ regestration: "unsuccessful" });
  }

  const filePath = `user/profile/${user.profilePicture}`;
  fs.unlinkSync(filePath);

  // return res.json({ message: 'User deleted successfully' });
  return res.status(200).json({ regestration: "successful" });

  // userModel.deleteOne({ _id: id }, function (err) {
  //   // deleted at most one tank document
  //   if (err) {
  //     return res.status(200).json({ regestration: "unsuccessful" });
  //   } else {
  //     return res.status(200).json({ regestration: "successful" });
  //   }
  // });
});
