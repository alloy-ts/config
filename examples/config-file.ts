import { Config } from "../src/main.ts";

const config = Config.builder()
  .set_default("default", "1")
  .add_source(Config.File.from_str('{"key": "value"}', Config.File.Format.Json))
  .set_override("override", "1")
  .build();

console.log("Config loaded successfully:");
console.log("default:", config.get_string("default"));
console.log("key:", config.get_string("key"));
console.log("override:", config.get_string("override"));
