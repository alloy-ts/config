import { Config, ConfigBuilder } from "@alloy-ts/config";

// Create a builder and set default values
const builder = new ConfigBuilder();
builder
  .setDefault("port", 8080)
  .setDefault("host", "localhost")
  .setDefault("debug", true)
  .setDefault("database.max_connections", 10)
  .setOverride("port", 9000);

// Build the Config instance
const config: Config = builder.build();

// Retrieve configuration values
console.log("Host:", config.getString("host")); // "localhost"
console.log("Port:", config.getInt("port")); // 9000 (overridden)
console.log("Debug:", config.getBool("debug")); // true
console.log("Max Connections:", config.getInt("database.max_connections")); // 10

// Alternatively, use Config.builder()
const config2 = Config.builder()
  .setDefault("app_name", "alloy-app")
  .setDefault("version", "1.0.0")
  .build();

console.log("App Name:", config2.getString("app_name"));
