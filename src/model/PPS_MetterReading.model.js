import { model, Schema } from "mongoose";

const PPS_MRSchema = new Schema({
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

export const PPS_MRModel = model("PPSMetterReading", PPS_MRSchema);

// DUMMY DATA FOR TEST
// (async function insertDummyData() {
//   const count = await PPS_MRModel.countDocuments();
//   if (count > 0) {
//     console.log(
//       `[*] PPSMetterReading collection already has ${count} documents`
//     );
//     return;
//   }

//   const docs = [];
//   for (let i = 0; i < 100; i++) {
//     docs.push({
//       tank_name: `Ahmadyar ${i + 1}`,
//       id_number: `PPSMR${i + 1}`,
//       location: `Shahr-e-naw ${i + 1}`,
//       product: "DESAL",
//       total_liter: `${i + 9}`,
//       total_charges: (70 / 2.5) * (i + 9),
//     });
//   }

//   await PPS_MRModel.insertMany(docs);
//   console.log(
//     "[*] Inserted 100 dummy documents into PPSMetterReading collection"
//   );
// })();
