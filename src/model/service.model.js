import { model, Schema } from "mongoose";

const serviceSchema = new Schema({
  company_name: {
    type: String,
  },
  owner: {
    type: String,
  },
  reserve: {
    type: String,
  },
  ton: {
    type: String,
  },
  feeTonChargesPerMonth: {
    type: String,
  },
  total_charges: {
    type: String,
  },
});

export const serviceModel = model("servicesInfo", serviceSchema);

// DUMMY DATA FOR TEST
// (async function insertDummyData() {
//   const count = await serviceModel.countDocuments();
//   if (count > 0) {
//     console.log(`[*] servicesInfo collection already has ${count} documents`);
//     return;
//   }

//   const docs = [];
//   for (let i = 0; i < 100; i++) {
//     docs.push({
//       company_name: `Ahmadyar Group ${i + 1}`,
//       owner: `Ahmadyar ${i + 1}`,
//       reserve: ``,
//       ton: 4,
//       feeTonChargesPerMonth: 10,
//       total_charges: 4 * 10,
//     });
//   }

//   await serviceModel.insertMany(docs);
//   console.log("[*] Inserted 100 dummy documents into servicesInfo collection");
// })();
