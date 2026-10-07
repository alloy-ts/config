import { ConfigBuilder, File, FileFormat } from "@alloy-ts/config";

// 1. From inline string content (JSON, TOML, YAML, etc.)
const jsonContent = JSON.stringify({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  logging: {
    level: "info",
  },
});

const jsonSource = File.fromStr(jsonContent, FileFormat.Json);

// 2. From a file path
const fileSource = File.new("config/default", FileFormat.Json);
fileSource.required(false); // Make optional if file might not exist

// 3. Auto-discover file by base name (checks .json, .toml, .yaml, etc.)
const autoSource = File.withName("config/settings");

// Combine sources in ConfigBuilder
const config = new ConfigBuilder()
  .addSource(jsonSource)
  .addSource(fileSource)
  .addSource(autoSource)
  .build();

console.log("Server Port:", config.getInt("server.port"));
console.log("Logging Level:", config.getString("logging.level"));
