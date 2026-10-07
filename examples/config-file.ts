import { Config } from "../src/main.ts";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(Config.File.fromStr('{"key": "value"}', Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log("Config loaded successfully:");
console.log("default:", config.getString("default"));
console.log("key:", config.getString("key"));
console.log("override:", config.getString("override"));
