import console from "node:console";
import { Config } from "../src/main.ts";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log("Default:", config.getString("default"));
console.log("Override:", config.getString("override"));
console.log("Database Host:", config.getString("database.host"));
console.log("Database Port:", config.getInt("database.port"));
