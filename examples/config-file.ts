import { Config, ConfigBuilder, Environment, File, FileFormat } from "../index.js";

// 1. Basic usage with ConfigBuilder
console.log("--- 1. Basic ConfigBuilder Usage ---");
const builder = new ConfigBuilder();
builder
  .setDefault("server.port", 8080)
  .setDefault("server.host", "localhost")
  .setDefault("debug", true)
  .setOverride("server.port", 9000);

const config = builder.build();
console.log("Server Host:", config.getString("server.host"));
console.log("Server Port:", config.getInt("server.port")); // 9000
console.log("Debug Mode:", config.getBool("debug")); // true

// 2. Loading File and Environment Sources
console.log("\n--- 2. File and Environment Sources ---");
const jsonSettings = JSON.stringify({
  database: {
    url: "postgres://localhost:5432/app",
    pool_size: 10,
  },
  features: ["auth", "logging"],
});

const fileSource = File.fromStr(jsonSettings, FileFormat.Json);
const envSource = Environment.withPrefix("APP").separator("_");

const appConfig = Config.builder()
  .setDefault("database.pool_size", 5)
  .addSource(fileSource)
  .addSource(envSource)
  .build();

console.log("Database URL:", appConfig.getString("database.url"));
console.log("Pool Size:", appConfig.getInt("database.pool_size"));
console.log("Features:", appConfig.getArray("features"));

// 3. Serialization and Deserialization
console.log("\n--- 3. Deserialization ---");
const rawObject = {
  app_name: "AlloyConfigApp",
  version: "1.0.0",
  metrics: { enabled: true, interval_ms: 1000 },
};

const objectConfig = Config.tryFrom(rawObject);
console.log("App Name:", objectConfig.getString("app_name"));
console.log("Metrics Table:", objectConfig.getTable("metrics"));
console.log("Entire Config Object:", objectConfig.tryDeserialize());
