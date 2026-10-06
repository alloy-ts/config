import { Config, File } from "../dist/index.js";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.fromStr('{"setting": "enabled"}', "json"))
  .setOverride("override", "1")
  .build();

console.log("default:", config.getString("default"));
console.log("setting:", config.getString("setting"));
console.log("override:", config.getString("override"));
