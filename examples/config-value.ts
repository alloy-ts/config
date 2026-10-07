import console from "node:console";
import { Value, ValueKind } from "../src/main.ts";

const intVal = new Value(42, "user-config");
console.log("Origin:", intVal.origin());
console.log("Kind:", intVal.kind === ValueKind.I64);
console.log("As int:", intVal.intoInt());
console.log("As float:", intVal.intoFloat());
console.log("As string:", intVal.intoString());
console.log("As bool:", intVal.intoBool());

const tableVal = new Value({ host: "localhost", port: 5432 });
const table = tableVal.intoTable();
console.log("Table host:", table["host"]?.intoString());
console.log("Table port:", table["port"]?.intoInt());

const arrayVal = new Value(["primary", "secondary"]);
const arr = arrayVal.intoArray();
console.log(
  "Array items:",
  arr.map((item) => item.intoString()),
);

const obj = tableVal.tryDeserialize();
console.log("Deserialized table:", obj);
