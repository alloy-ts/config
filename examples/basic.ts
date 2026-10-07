import { Config, ConfigBuilder } from "../src/main.ts";

// 1. Create a builder and set defaults & overrides
const builder = new ConfigBuilder();
builder
  .setDefault("server.host", "127.0.0.1")
  .setDefault("server.port", 8080)
  .setDefault("server.ssl", false)
  .setDefault("features.enabled", ["auth", "logging"])
  .setOverride("server.port", 9000);

// 2. Build the configuration
const config = builder.build();

// 3. Read values using type-safe getters
console.log("Host:", config.getString("server.host"));
console.log("Port:", config.getInt("server.port"));
console.log("SSL Enabled:", config.getBool("server.ssl"));
console.log("Features:", config.getArray("features.enabled"));

// 4. Retrieve entire sub-table or cache object
console.log("Server Table:", config.getTable("server"));
console.log("Entire Cache:", config.cache);
