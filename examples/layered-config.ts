import { Config, ConfigBuilder, Environment, File, FileFormat } from "@alloy-ts/config";

// 1. Basic usage with ConfigBuilder
console.log("--- 1. Basic ConfigBuilder Usage ---");
const builder = new ConfigBuilder();
builder
  .set_default("server.port", 8080)
  .set_default("server.host", "localhost")
  .set_default("debug", true)
  .set_override("server.port", 9000);

const config = builder.build();
console.log("Server Host:", config.get_string("server.host"));
console.log("Server Port:", config.get_int("server.port")); // 9000
console.log("Debug Mode:", config.get_bool("debug")); // true

// 2. Loading File and Environment Sources
console.log("\n--- 2. File and Environment Sources ---");
const jsonSettings = JSON.stringify({
  database: {
    url: "postgres://localhost:5432/app",
    pool_size: 10,
  },
  features: ["auth", "logging"],
});

const fileSource = File.from_str(jsonSettings, FileFormat.Json);
const envSource = Environment.with_prefix("APP").separator("_");

const appConfig = Config.builder()
  .set_default("database.pool_size", 5)
  .add_source(fileSource)
  .add_source(envSource)
  .build();

console.log("Database URL:", appConfig.get_string("database.url"));
console.log("Pool Size:", appConfig.get_int("database.pool_size"));
console.log("Features:", appConfig.get_array("features"));

// 3. Serialization and Deserialization
console.log("\n--- 3. Deserialization ---");
const rawObject = {
  app_name: "AlloyConfigApp",
  version: "1.0.0",
  metrics: { enabled: true, interval_ms: 1000 },
};

const objectConfig = Config.try_from(rawObject);
console.log("App Name:", objectConfig.get_string("app_name"));
console.log("Metrics Table:", objectConfig.get_table("metrics"));
console.log("Entire Config Object:", objectConfig.try_deserialize());
