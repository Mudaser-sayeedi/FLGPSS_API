import { model, Schema } from "mongoose";

const borderSchema = new Schema({
  company_name: {
    type: String,
  },
  owner: {
    type: String,
  },
  product: {
    type: String,
  },
  imports: {
    type: String,
  },
  exports: {
    type: String,
  },
  total_charges: {
    type: String,
  },
});

export const borderModel = model("borderInfo", borderSchema);

// DUMMY DATA FOR TEST
// (async function insertDummyData() {
//   const count = await borderModel.countDocuments();
//   if (count > 0) {
//     console.log(`[*] borderInfo collection already has ${count} documents`);
//     return;
//   }

//   const docs = [];
//   for (let i = 0; i < 100; i++) {
//     docs.push({
//       company_name: `Ahmadyar LTD ${i + 1}`,
//       owner: `Ahmadyar${i + 1}`,
//       product: `LPG`,
//       imports: "12000 Liter",
//       exports: `1000 Liter${i + 1}`,
//       total_charges: 10 / 2.5 + "AFG",
//     });
//   }

//   await borderModel.insertMany(docs);
//   console.log("[*] Inserted 100 dummy documents into borderInfo collection");
// })();
