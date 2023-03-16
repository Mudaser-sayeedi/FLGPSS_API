import express from "express";
import { employees, employeesAttendence } from "../../model/data.js";
import { EmployeeModel } from "../../model/employees.model.js";

export const EmployeesRouter = express.Router();

EmployeesRouter.get("/info", (req, res) => {
  EmployeeModel.find({}, (err, doc) => {
    // console.log(doc.length);
    return res.status(200).json(doc);
  });
  // console.log(data);
  // return res.status(200).json(employees);
});

EmployeesRouter.get("/attendence", (req, res) => {
  EmployeeModel.find({}, (err, doc) => {
    const data = [];

    doc.map((d) => {
      const count = d.Attendence.length;
      const attendence = {
        _id: d._id,
        name: d.name,
        departement: d.departement,
        job: d.job,
        present_absent: d.Attendence.length
          ? d.Attendence[count - 1].status
          : null,
        date: d.Attendence.length ? d.Attendence[count - 1].date : null,
      };
      data.push(attendence);
    });
    return res.status(200).json(data);
  });
  // return res.status(200).json(employeesAttendence);
});

EmployeesRouter.post("/attendence/employee", (req, res) => {
  const { id } = req.body;
  EmployeeModel.find({ _id: id }, (err, doc) => {
    // console.log(doc.length);
    // console.log(doc)
    return res.status(200).json(doc);
  });
});

// add employee
EmployeesRouter.post("/register", (req, res) => {
  const {
    name,
    fname,
    gfname,
    job,
    phone,
    email,
    education,
    salary,
    departement,
  } = req.body;

  // console.table([
  //   { name, fname, gfname, job, phone, email, education, departement },
  // ]);

  // save to mongoDB
  if (
    name &&
    fname &&
    gfname &&
    job &&
    phone &&
    email &&
    education &&
    salary &&
    departement
  ) {
    EmployeeModel.create(
      {
        name,
        fname,
        gfname,
        job,
        phone,
        email,
        education,
        salary,
        departement,
        // Attendence: [
        //   {
        //     name: name,
        //     date: new Date().toDateString(),
        //     time: new Date().toLocaleTimeString(),
        //     status: "",
        //     // date: `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`,
        //   },
        // ],
        Attendence: [],
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
    return res.json({ regestration: "successful" });
  }

  return res.json({
    regestration: "unsuccessful",
  });
});

// update employee
EmployeesRouter.post("/updates", async (req, res) => {
  const { id, value, field } = req.body;

  const filter = { _id: id };
  const update = {};
  update[field] = value;

  let doc = await EmployeeModel.findOneAndUpdate(filter, update, {
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
EmployeesRouter.post("/delete", (req, res) => {
  const { id } = req.body;

  EmployeeModel.deleteOne({ _id: id }, function (err) {
    // deleted at most one tank document
    if (err) {
      return res.status(200).json({ regestration: "unsuccessful" });
    } else {
      return res.status(200).json({ regestration: "successful" });
    }
  });
});

// update employee attendence

// EmployeesRouter.post("/attendence/update", async (req, res) => {
//   const { id, value } = req.body;
//   let user;
//   const currentDate = new Date().toDateString();

//   EmployeeModel.find({ _id: id }, (err, doc) => {
//     if (err || !doc) {
//       return res.status(404).json({ error: "Employee not found" });
//     }

//     console.log("findOne", doc);
//     user = doc[0].name;
//     const existingAttendanceRecord = doc[0].Attendance?.find(
//       (record) => record.date === currentDate
//     );

//     if (existingAttendanceRecord) {
//       // If an attendance record exists for the current date, update it
//       EmployeeModel.findOneAndUpdate(
//         {
//           _id: id,
//           "Attendance.date": currentDate,
//         },
//         { $set: { "Attendance.$.status": value } },
//         { new: true },
//         (err, updatedEmployee) => {
//           if (err) {
//             console.log(err);
//             return res
//               .status(500)
//               .json({ registration: "Failed to update attendance" });
//           }

//           console.log("Attendance record updated:", updatedEmployee);
//           return res
//             .status(200)
//             .json({ registration: "Attendance updated successfully" });
//         }
//       );
//     } else {
//       // If no attendance record exists for the current date, add a new record to the array
//       const atten = {
//         name: user,
//         date: currentDate,
//         time: new Date().toLocaleTimeString(),
//         status: value,
//       };

//       EmployeeModel.findOneAndUpdate(
//         { _id: id },
//         { $push: { Attendance: atten } },
//         { new: true },
//         (err, updatedEmployee) => {
//           if (err) {
//             console.log(err);
//             return res
//               .status(500)
//               .json({ registration: "Failed to update attendance" });
//           }

//           console.log("Attendance record added:", updatedEmployee);
//           return res
//             .status(200)
//             .json({ registration: "Attendance updated successfully" });
//         }
//       );
//     }
//   });
// });

// Add attendance records for an employee
EmployeesRouter.post("/attendence/update", async (req, res) => {
  const { id, value } = req.body;
  let user;
  const currentDate = new Date().toDateString();

  EmployeeModel.find({ _id: id }, (err, doc) => {
    if (err || !doc) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // console.log("findOne", doc);
    user = doc[0].name;
    const existingAttendanceRecord = doc[0].Attendence.find(
      (record) => record.date === currentDate
    );

    console.log("existingAttendanceRecord", existingAttendanceRecord);
    if (existingAttendanceRecord) {
      // If an attendance record exists for the current date, update it
      // console.log(value);

      EmployeeModel.findOneAndUpdate(
        {
          _id: id,
          "Attendence.date": currentDate,
        },
        {
          $set: {
            "Attendence.$.status": value,
            "Attendence.$.time": new Date().toLocaleTimeString(),
          },
        },
        { new: true, lean: true },
        (err, updatedEmployee) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ registration: "Failed to update attendance" });
          }

          // console.log("Attendance record updated:", updatedEmployee);
          return res
            .status(200)
            .json({ registration: "Attendance updated successfully" });
        }
      );
    } else {
      // If no attendance record exists for the current date, add a new record to the array
      const atten = {
        name: user,
        date: currentDate,
        time: new Date().toLocaleTimeString(),
        status: value,
      };

      // console.log(atten);

      EmployeeModel.findOneAndUpdate(
        { _id: id },
        { $push: { Attendence: atten } },
        { new: true },
        (err, updatedEmployee) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ registration: "Failed to update attendance" });
          }

          // console.log("Attendance record added:", updatedEmployee);
          return res
            .status(200)
            .json({ registration: "Attendance updated successfully" });
        }
      );
    }
  });
});

// version 3
// EmployeesRouter.post("/attendence/update", async (req, res) => {
//   const { id, value } = req.body;
//   let user;
//   EmployeeModel.find({ _id: id }, (err, doc) => {
//     if (err || doc.length === 0) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     user = doc[0].name;
//     const atten = {
//       name: user,
//       date: new Date().toDateString(),
//       time: new Date().toLocaleTimeString(),
//       status: value,
//     };

//     // Find the employee by ID and update the attendance array
//     EmployeeModel.findOneAndUpdate(
//       {
//         _id: id,
//         "Attendence.date": atten.date,
//         // "Attendence.time": atten.time,
//       },
//       { $set: { "Attendance.$.status": atten.status } },
//       { new: true },
//       (err, updatedEmployee) => {
//         if (err) {
//           console.log(err);
//           return res
//             .status(500)
//             .json({ regestration: "Failed to update attendance" });
//         } else if (updatedEmployee) {
//           console.log("record was now updated the attendence");
//           console.log("Attendance record updated:", updatedEmployee);
//           return res
//             .status(200)
//             .json({ regestration: "Attendance updated successfully" });
//         } else {
//           EmployeeModel.findByIdAndUpdate(
//             { _id: id },
//             { $push: { Attendance: atten } },
//             { new: true },
//             (err, updatedEmployee) => {
//               if (err) {
//                 console.log(err);
//                 return res
//                   .status(500)
//                   .json({ regestration: "Failed to update attendance" });
//               } else {
//                 console.log(
//                   "record was not in the record added the attendence"
//                 );

//                 console.log("Attendance record added:", updatedEmployee);
//                 return res
//                   .status(200)
//                   .json({ regestration: "Attendance updated successfully" });
//               }
//             }
//           );
//         }
//       }
//     );

//     // EmployeeModel.findOneAndUpdate(
//     //   { _id: id },
//     //   { $push: { Attendence: atten } },
//     //   { new: true },
//     //   (err, doc) => {
//     //     if (err) {
//     //       return res
//     //         .status(500)
//     //         .json({ regestration: "Failed to update attendance" });
//     //     }
//     //     return res
//     //       .status(200)
//     //       .json({ regestration: "Attendance updated successfully" });
//     //   }
//     // );
//   });
// });

// version 2,
// EmployeesRouter.post("/attendence/update", async (req, res) => {
//   const { id, value } = req.body;
//   let user;
//   EmployeeModel.find({ _id: id }, (err, doc) => {
//     // console.log(doc.length);
//     console.log(doc[0].name);
//     user = doc[0].name;
//     // return res.status(200).json(doc);
//   });

//   // console.log(user);
//   const filter = { _id: id };
//   const atten = {
//     name: user,
//     status: value,
//     date: new Date().toDateString(),
//     time: new Date().toLocaleTimeString(),
//   };

//   // console.log(new Date().toDateString(),new Date().toLocaleTimeString())
//   console.log(atten);
//   let doc = await EmployeeModel.findOneAndUpdate(
//     filter,
//     { $push: { Attendence: atten } },
//     {
//       new: true,
//     }
//   );

//   // console.log(doc);

//   if (doc) {
//     return res.status(200).json({ regestration: "successful" });
//   } else {
//     return res.status(200).json({ regestration: "unsuccessful" });
//   }
// });
