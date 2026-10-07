import { Config, File } from "../index.js";
import type { FileFormat } from "../index.js";

const jsonContent = JSON.stringify({
  settings: {
    theme: "dark",
  },
});

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.fromStr(jsonContent, 1 as FileFormat))
  .setOverride("override", "1")
  .build();

console.log("default:", config.getString("default"));
console.log("settings.theme:", config.getString("settings.theme"));
console.log("override:", config.getString("override"));
