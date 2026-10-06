import { Config, File } from "../dist/index.js";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.fromStr('{"settings": {"theme": "dark"}}', "json"))
  .setOverride("override", "1")
  .build();

console.log("default:", config.getString("default"));
console.log("settings:", config.getTable("settings"));
console.log("override:", config.getString("override"));
