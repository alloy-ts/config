import { Config, File } from "../dist/index.js";

const fileSource = File.fromStr('{"fileKey": "fileVal", "default": "from_file"}', "json");

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(fileSource)
  .setOverride("override", "1")
  .build();

console.log("Default:", config.getString("default"));
console.log("FileKey:", config.getString("fileKey"));
console.log("Override:", config.getString("override"));
