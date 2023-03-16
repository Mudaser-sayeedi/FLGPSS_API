import { model, Schema } from "mongoose";

// const employeeSchema = new Schema({
//   name: {
//     type: String,
//   },
//   fname: {
//     type: String,
//   },
//   gfname: {
//     type: String,
//   },
//   job: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },
//   education: {
//     type: String,
//   },
//   salary: {
//     type: String,
//   },
//   departement: {
//     type: String,
//   },
//   Attendence: [
//     {
//       name: String,
//       status: String,
//       date: String,
//       time: String,
//     },
//   ],
//   createdAt: {
//     type: String,
//   },
// });

const attendanceSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  time: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Not Taked"],
    default: "Not Taked",
    // required: true,
  },
});

const employeeSchema = new Schema({
  name: {
    type: String,
  },
  fname: {
    type: String,
  },
  gfname: {
    type: String,
  },
  job: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  education: {
    type: String,
  },
  salary: {
    type: String,
  },
  departement: {
    type: String,
  },
  Attendence: {
    type: [attendanceSchema],
    // required: true,
  },
  createdAt: {
    type: String,
  },
});

export const EmployeeModel = model("employee", employeeSchema);

// DUMMY DATA FOR TEST
(async function insertDummyData() {
  const count = await EmployeeModel.countDocuments();
  if (count > 0) {
    console.log(`[*] Employees collection already has ${count} documents`);
    return;
  }

  const docs = [];
  for (let i = 0; i < 100; i++) {
    docs.push({
      name: `Employee ${i + 1}`,
      fname: `Ahmad${i + 1}`,
      gfname: `Mahmood${i + 1}`,
      job: "Developer",
      phone: `078000000${i + 1}`,
      email: `user${i + 1}@example.com`,
      education: "Bachelor",
      salary: `10000${i + 1}`,
      departement: "IT",
      Attendence: [],
      createdAt: new Date(),
    });
  }

  await EmployeeModel.insertMany(docs);
  console.log("[*] Inserted 100 dummy documents into employees collection");
})();
