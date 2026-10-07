import { Value } from "../index.js";

// 1. Create a Value with origin metadata
const valNumber = Value.new(100, "settings.json line 12");
console.log("Origin:", valNumber.origin());
console.log("As integer:", valNumber.intoInt());
console.log("As float:", valNumber.intoFloat());
console.log("As string:", valNumber.intoString());

// 2. Create structured array Value
const valArray = Value.new(["auth", "cache", "database"], "env:FEATURES");
const features = valArray.intoArray();
console.log("\nFeatures count:", features.length);
console.log("First feature:", features[0].intoString());

// 3. Create table Value and inspect entries
const valTable = Value.new({
  database: {
    pool_size: 20,
    ssl: true,
  },
});
const tableMap = valTable.intoTable();
console.log("\nTable keys:", Object.keys(tableMap));

// 4. Deserialize complex Value into JS object
const deserialized = valTable.tryDeserialize();
console.log("Deserialized table:", deserialized);
