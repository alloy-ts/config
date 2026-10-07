import { Config, ConfigBuilder, Environment, File, FileFormat, Value } from "../index.js";

// 1. Basic defaults and overrides with ConfigBuilder
console.log("--- 1. ConfigBuilder Defaults & Overrides ---");
const builder = new ConfigBuilder();
builder
  .setDefault("server.host", "localhost")
  .setDefault("server.port", 8080)
  .setDefault("server.ssl", false)
  .setOverride("server.port", 9090)
  .setOverrideOption("server.cluster", "us-east-1");

const config1 = builder.build();
console.log("Server Host:", config1.getString("server.host"));
console.log("Server Port (overridden):", config1.getInt("server.port"));
console.log("Server SSL:", config1.getBool("server.ssl"));
console.log("Server Cluster:", config1.getString("server.cluster"));

// 2. Loading layered file sources (JSON string and named file)
console.log("\n--- 2. File Sources ---");
const jsonSettings = JSON.stringify({
  app: {
    name: "Alloy Application",
    features: ["metrics", "tracing", "logging"],
    settings: {
      timeoutMs: 5000,
      rateLimit: 12.5,
    },
  },
});

const jsonSource = File.fromStr(jsonSettings, FileFormat.Json);

const config2 = Config.builder().setDefault("app.version", "1.0.0").addSource(jsonSource).build();

console.log("App Name:", config2.getString("app.name"));
console.log("App Version:", config2.getString("app.version"));
console.log("Timeout (ms):", config2.getInt("app.settings.timeoutMs"));
console.log("Rate Limit:", config2.getFloat("app.settings.rateLimit"));
console.log(
  "Features List:",
  config2
    .getArray("app.features")
    .map((v) => ((v as any).intoString ? (v as any).intoString() : v)),
);

// 3. Environment Variable Source
console.log("\n--- 3. Environment Variables ---");
process.env["APP_DATABASE_URL"] = "postgres://admin:secret@localhost:5432/mydb";
process.env["APP_MAX_POOL_SIZE"] = "20";

const envSource = Environment.withPrefix("APP").separator("_");
const config3 = Config.builder().addSource(envSource).build();

console.log("Database URL:", config3.getString("database.url"));
console.log("Max Pool Size:", config3.getString("max.pool.size"));

delete process.env["APP_DATABASE_URL"];
delete process.env["APP_MAX_POOL_SIZE"];

// 4. Object TryFrom and TryDeserialize
console.log("\n--- 4. Serialization and Deserialization ---");
const appConfigObj = {
  service: "auth-service",
  workers: 8,
  enabled: true,
};

const config4 = Config.tryFrom(appConfigObj);
console.log("Service Name:", config4.getString("service"));
console.log("Workers:", config4.getInt("workers"));

const deserialized = config4.tryDeserialize();
console.log("Deserialized Object:", deserialized);

// 5. Explicit Value Usage
console.log("\n--- 5. Value Type Operations ---");
const valInt = Value.new(42, "memory_origin");
console.log("Value Origin:", valInt.origin());
console.log("Value as Int:", valInt.intoInt());
console.log("Value as Float:", valInt.intoFloat());

const valTable = Value.new({ key1: "value1", key2: 100 });
const tbl = valTable.intoTable();
console.log("Table key1:", tbl["key1"]?.intoString());
