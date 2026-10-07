import { ConfigSchema } from "../dist/index.js";

function main() {
  const schema = new ConfigSchema("app");
  schema.coerceSerdeEnums(true);
  schema.insert("server", "app.server");
  schema.insert("database", "app.database");

  console.log("Registered prefixes:", schema.prefixes());
  console.log("Server location:", schema.locate("server"));
  console.log("Database location:", schema.locate("database"));
}

main();
