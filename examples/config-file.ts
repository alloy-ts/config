import console from "node:console";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { Config } from "../src/main.ts";

if (!existsSync("config")) {
  mkdirSync("config", { recursive: true });
}

writeFileSync(
  "config/settings.json",
  JSON.stringify({
    app_name: "Alloy Application",
    port: 8080,
    debug: false,
  }),
);

try {
  const config = Config.builder()
    .setDefault("default", "1")
    .addSource(new Config.File("config/settings", Config.File.Format.Json))
    .setOverride("override", "1")
    .build();

  console.log("Config loaded successfully!");
  console.log("default:", config.getString("default"));
  console.log("app_name:", config.getString("app_name"));
  console.log("port:", config.getInt("port"));
  console.log("override:", config.getString("override"));
} finally {
  if (existsSync("config/settings.json")) {
    unlinkSync("config/settings.json");
  }
}
