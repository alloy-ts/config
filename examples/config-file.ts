import { Config, File, FileFormat } from "../index.js";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.fromStr('{"setting": "json_val"}', FileFormat.Json))
  .setOverride("override", "1")
  .build();

console.log("Config default:", config.getString("default"));
console.log("Config setting:", config.getString("setting"));
console.log("Config override:", config.getString("override"));
