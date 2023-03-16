import express from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import { EmployeesRouter } from "./routers/employeesRouters/employees.router.js";
import { GovPumpRouter } from "./routers/govPumpRouters/govPump.router.js";
import { PriPumpRouter } from "./routers/priPumpRouters/priPump.router.js";
import { BorderRouter } from "./routers/borderRouters/border.router.js";
import { ServicesRouter } from "./routers/servicesRouters/services.router.js";
import { loginRouter } from "./routers/loginRouters/login.router.js";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouters/user.router.js";

export const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// Middleware to set Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// -------------------------------
// FOR USING FROM MONGO LOCALHOST
// try {
//   mongoose.connect("mongodb://127.0.0.1:27017/FLGPSS", () => {
//     console.log("DATABASE CONNECTED SUCCESSFULLY");
//   });
// } catch (error) {
//   console.log("Can not connect to database server");
// }

// FOR HOSTING MONGO ATLAS DO THIS
try {
  mongoose.connect(
    "mongodb+srv://mudasersayeedi:3DLEe063NRNbzYg0@flgpss.jzgyyql.mongodb.net/FLGPSS?retryWrites=true&w=majority",
    () => {
      console.log("DATABASE CONNECTED SUCCESSFULLY");
    }
  );
} catch (error) {
  console.log("Can not connect to database server");
}

// ------------------------------------
app.use("/login", loginRouter);
app.use("/employees", EmployeesRouter);
app.use("/gov", GovPumpRouter);
app.use("/pri", PriPumpRouter);
app.use("/border", BorderRouter);
app.use("/services", ServicesRouter);
app.use("/user", cors(corsOptions), userRouter);

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// app.use("/uploads", express.static("/uploads"));

// app.use(express.static(path.join("__dirname", "../user")));

// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "..", "uploads"))
// );

app.get("/", (req, res) => {
  return res.send("SERVER ROOT ROUTE");
});
