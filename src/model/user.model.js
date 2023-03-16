import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  secret: {
    type: String,
    // required,
  },
  profilePicture: {
    type: String,
    // required,
  },
  createdAt: {
    type: String,
  },
});

export const userModel = model("userInfo", userSchema);

// CHECK WEATHER DATABASE HAS ADMIN ACCOUNT OR NOT IF NOT CREATE ONE WITH DEFAULT PASSWORD!
// userModel.find({ role: "admin" }, function (err, docs) {
//   //   console.log(docs.length);

//   const admin = {
//     name: "admin",
//     username: "admin",
//     role: "admin",
//     password: "admin",
//     createdAt: `${new Date().toDateString()} - ${new Date().toTimeString()}`,
//     lastModifiedAt: `${new Date().toDateString()} - ${new Date().toTimeString()}`,
//   };
//   // console.log(admin.createdAt)

//   if (!docs.length) {
//     userModel.create(admin, function (err, admin) {
//       if (err) return console.error(err);
//       // saved!
//       // console.log(admin);
//       Log("admin user created for the first time!");
//     });
//   }
// });

// -----------------
const admin = {
  name: "admin",
  username: "admin",
  role: "Admin",
  password: "admin",
  secret: "admin",
  profilePicture: "file-1677795139399-614586500.jpg",
  createdAt: `${new Date().toDateString()} - ${new Date().toTimeString()}`,
  lastModifiedAt: `${new Date().toDateString()} - ${new Date().toTimeString()}`,
};
(async function () {
  let doc = await userModel.findOneAndUpdate({ secret: "admin" }, admin, {
    new: true,
    upsert: true,
  });
  //   console.log(doc);
  console.log("admin user created for the first time!");
})();

// -----------------------
