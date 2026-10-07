import { Value } from "../dist/index.js";

function main() {
  // 1. Create Value instances from primitive JavaScript types
  const stringVal = Value.new("hello world");
  const intVal = Value.new(42);
  const boolVal = Value.new(true);
  const arrayVal = Value.new(["a", "b", "c"]);

  console.log("String Value:", stringVal.intoString());
  console.log("Int Value:", intVal.intoInt());
  console.log("Bool Value:", boolVal.intoBool());

  // 2. Value array conversion
  const items = arrayVal.intoArray();
  console.log(
    "Array elements:",
    items.map((item) => item.intoString())
  );

  // 3. Value table conversion
  const tableVal = Value.new({ key: "value", num: 100 });
  console.log("Table Value:", tableVal.intoTable());
}

main();
