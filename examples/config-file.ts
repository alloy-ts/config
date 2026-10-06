import { Config, File } from "../dist/index.js";

const fileSource = File.fromStr('{"database": {"url": "postgres://localhost:5432/db"}, "default": "from_file"}', "json");

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(fileSource)
  .setOverride("override", "1")
  .build();

console.log("Default:", config.getString("default"));
console.log("Database URL:", config.getString("database.url"));
console.log("Override:", config.getString("override"));
