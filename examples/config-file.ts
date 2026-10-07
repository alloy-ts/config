import { Config, File } from "../index.js";
import type { FileFormat } from "../index.js";

const file = File.fromStr('{"setting": "enabled"}', 1 as FileFormat);

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(file)
  .setOverride("override", "1")
  .build();

console.log("default:", config.getString("default"));
console.log("setting:", config.getString("setting"));
console.log("override:", config.getString("override"));
