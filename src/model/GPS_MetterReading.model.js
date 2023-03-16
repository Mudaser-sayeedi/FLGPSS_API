import { model, Schema } from "mongoose";

const GPS_MRSchema = new Schema({
  tank_name: {
    type: String,
  },
  id_number: {
    type: String,
  },
  location: {
    type: String,
  },
  product: {
    type: String,
  },
  total_liter: {
    type: String,
  },
  total_charges: {
    type: String,
  },
});

export const GPS_MRModel = model("GPSMetterReading", GPS_MRSchema);

// // DUMMY DATA FOR TEST
// (async function insertDummyData() {
//   const count = await GPS_MRModel.countDocuments();
//   if (count > 0) {
//     console.log(`[*] GPSMetterReading collection already has ${count} documents`);
//     return;
//   }

//   const docs = [];
//   for (let i = 0; i < 100; i++) {
//     docs.push({
//       tank_name: `Ahmadyar ${i + 1}`,
//       id_number: `GPSMR${i + 1}`,
//       location: `3rd Macrorayan ${i + 1}`,
//       product: "PETROL",
//       total_liter: `${i + 9}`,
//       total_charges: (70/2.5)*(i + 9),
//     });
//   }

//   await GPS_MRModel.insertMany(docs);
//   console.log("[*] Inserted 100 dummy documents into GPSMetterReading collection");
// })();
