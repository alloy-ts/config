import { Config, ConfigBuilder, Environment, File, FileFormat, Value } from "../src/main.ts";

console.log("=== Alloy Config Examples ===");

// 1. Basic Builder Usage
console.log("\n--- 1. Basic ConfigBuilder ---");
const builder = new ConfigBuilder();
builder
  .setDefault("server.port", 8080)
  .setDefault("server.host", "localhost")
  .setDefault("app.debug", false)
  .setOverride("server.port", 9000);

const config1 = builder.build();
console.log("Port:", config1.getInt("server.port")); // 9000
console.log("Host:", config1.getString("server.host")); // localhost
console.log("Debug:", config1.getBool("app.debug")); // false

// 2. File Sources (Config.File & Config.File.Format)
console.log("\n--- 2. File Source ---");
const fileConfig = Config.builder()
  .setDefault("defaultKey", "defaultValue")
  .addSource(new Config.File("examples/config/settings", Config.File.Format.Json))
  .setOverride("overrideKey", "overrideValue")
  .build();

console.log("Default Key:", fileConfig.getString("defaultKey"));
console.log("App Name (from settings.json):", fileConfig.getString("app.name"));
console.log("App Port (from settings.json):", fileConfig.getInt("app.port"));
console.log("Override Key:", fileConfig.getString("overrideKey"));

// 3. String File Source via File.fromStr
console.log("\n--- 3. File Source from String ---");
const jsonString = JSON.stringify({
  database: {
    url: "postgres://user:pass@localhost:5432/db",
    maxConnections: 20,
  },
});
const stringSource = File.fromStr(jsonString, FileFormat.Json);
const configFromStr = new ConfigBuilder().addSource(stringSource).build();

console.log("DB URL:", configFromStr.getString("database.url"));
console.log("Max Connections:", configFromStr.getInt("database.maxConnections"));

// 4. Environment Source
console.log("\n--- 4. Environment Variables ---");
process.env.APP_PORT = "8000";
process.env.APP_HOST = "0.0.0.0";

const envSource = Environment.withPrefix("APP").separator("_");
const envConfig = new ConfigBuilder().addEnvSource(envSource).build();

console.log("Env Port:", envConfig.getString("port"));
console.log("Env Host:", envConfig.getString("host"));

delete process.env.APP_PORT;
delete process.env.APP_HOST;

// 5. Config.tryFrom and tryDeserialize
console.log("\n--- 5. Object Conversion & Deserialization ---");
const rawObject = {
  service: "auth",
  version: 1,
  enabled: true,
};

const configFromObj = Config.tryFrom(rawObject);
console.log("Service:", configFromObj.getString("service"));
console.log("Version:", configFromObj.getInt("version"));

const deserialized = configFromObj.tryDeserialize();
console.log("Deserialized Object:", deserialized);

// 6. Value Helper
console.log("\n--- 6. Value Class ---");
const val = Value.new(42);
console.log("Value as Int:", val.intoInt());
console.log("Value as String:", val.intoString());
