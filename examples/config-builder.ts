import console from "node:console";
import { Config } from "../src/main.ts";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log("default:", config.getString("default"));
console.log("setting:", config.getString("setting"));
console.log("override:", config.getString("override"));
