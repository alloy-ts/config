import { Config } from "../src/main.ts";

// Create an example using Config.builder() and Config.File
const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log("Config loaded successfully:");
console.log("Default:", config.get_string("default"));
console.log("Override:", config.get_string("override"));
console.log("Setting key:", config.get_string("key"));
