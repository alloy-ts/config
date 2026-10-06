import console from "node:console";
import { Config } from "../src/main.ts";

const config = Config.builder()
  .set_default("default", "1")
  .add_source(new Config.File("config/settings", Config.File.Format.Json))
  .set_override("override", "1")
  .build();

console.log("Default setting:", config.getString("default"));
console.log("File setting:", config.getString("setting"));
console.log("Override setting:", config.getString("override"));
