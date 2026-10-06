import { Config, FileFormat } from "../src/main.ts";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("examples/config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log("Config default:", config.getString("default"));
console.log("Config app name:", config.getString("app.name"));
console.log("Config app port:", config.getInt("app.port"));
console.log("Config override:", config.getString("override"));
