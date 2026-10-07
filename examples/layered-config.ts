import { Config, ConfigBuilder, Environment, File, FileFormat } from "../index.js";

// 1. Prepare file sources in different formats (JSON, TOML)
const jsonConfig = JSON.stringify({
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  logging: {
    level: "info",
  },
});

const tomlConfig = `
[server]
port = 9090

[features]
enable_metrics = true
max_workers = 8
`;

const fileJson = File.fromStr(jsonConfig, FileFormat.Json);
const fileToml = File.fromStr(tomlConfig, FileFormat.Toml);

// 2. Setup Environment source with prefix "APP"
process.env.APP_SERVER_PORT = "3000";
process.env.APP_LOGGING_LEVEL = "debug";
const envSource = Environment.withPrefix("APP").separator("_");

// 3. Chain ConfigBuilder to construct layered configuration
const builder = new ConfigBuilder();
builder
  .setDefault("server.host", "0.0.0.0")
  .setDefault("server.port", 80)
  .addSource(fileJson)
  .addSource(fileToml)
  .addSource(envSource)
  .setOverrideOption("server.port", process.env.PORT) // Sets if process.env.PORT is defined
  .setOverride("logging.format", "json");

// Build cloned instance allowing builder reuse
const config = builder.buildCloned();

console.log("=== Layered Configuration Output ===");
console.log("Server Host:", config.getString("server.host"));
console.log("Server Port:", config.getInt("server.port"));
console.log("Logging Level:", config.getString("logging.level"));
console.log("Logging Format:", config.getString("logging.format"));
console.log("Metrics Enabled:", config.getBool("features.enable_metrics"));
console.log("Max Workers:", config.getInt("features.max_workers"));

// Inspect entire deserialized configuration object
console.log("\nEntire Deserialized Config:", config.tryDeserialize());

delete process.env.APP_SERVER_PORT;
delete process.env.APP_LOGGING_LEVEL;
