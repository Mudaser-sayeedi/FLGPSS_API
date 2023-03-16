import { model, Schema } from "mongoose";

const GPSSchema = new Schema({
  license_number: {
    type: String,
  },
  tank_name: {
    type: String,
  },
  owner: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  IPG_Gun: {
    type: String,
  },
  pertrol_gun: {
    type: String,
  },
  desal_gun: {
    type: String,
  },
  tax: {
    type: String,
  },
});

export const GPSModel = model("governmenttanksInfo", GPSSchema);

// DUMMY DATA FOR TEST
// (async function insertDummyData() {
//   const count = await GPSModel.countDocuments();
//   if (count > 0) {
//     console.log(
//       `[*] governmenttanksInfo collection already has ${count} documents`
//     );
//     return;
//   }

//   const docs = [];
//   for (let i = 0; i < 100; i++) {
//     docs.push({
//       license_number: `GPSLN${i + 1}`,
//       tank_name: `Ahmadyar Group ${i + 1}`,
//       owner: `Ahmadyar Ltd ${i + 1}`,
//       location: `3rd Macrorayan ${i + 1}`,
//       phone: `078000000${i + 1}`,
//       IPG_Gun: 4,
//       pertrol_gun: 4,
//       desal_gun: 4,
//       tax: 2.5,
//     });
//   }

//   await GPSModel.insertMany(docs);
//   console.log(
//     "[*] Inserted 100 dummy documents into governmenttanksInfo collection"
//   );
// })();
