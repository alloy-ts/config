import console from "node:console";
import { Config, File, FileFormat } from "../src/main.ts";

const file1 = File.fromStr(
  JSON.stringify({ app: { name: "Alloy Service", port: 3000 } }),
  FileFormat.Json,
);

const file2 = File.fromStr(
  `
[app]
port = 8080
mode = "production"
`,
  FileFormat.Toml,
);

const builder = Config.builder()
  .setDefault("app.host", "0.0.0.0")
  .setDefault("app.port", 80)
  .addSource(file1)
  .addSource(file2)
  .setOverrideOption("app.debug", false)
  .setOverride("app.host", "127.0.0.1");

const config = builder.build();

console.log("App Name:", config.getString("app.name"));
console.log("App Host:", config.getString("app.host"));
console.log("App Port:", config.getInt("app.port"));
console.log("App Mode:", config.getString("app.mode"));
console.log("App Debug:", config.getBool("app.debug"));
