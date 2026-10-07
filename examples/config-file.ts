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

// 3. Supported FileFormat Examples via File.fromStr
console.log("\n--- 3. Demonstration of supported FileFormat types ---");

// 1. JSON
const jsonSource = File.fromStr(
  JSON.stringify({ format: "JSON", port: 8080 }),
  FileFormat.Json
);

// 2. TOML
const tomlSource = File.fromStr(
  `
format = "TOML"
port = 8081
`,
  FileFormat.Toml
);

// 3. YAML
const yamlSource = File.fromStr(
  `
format: YAML
port: 8082
`,
  FileFormat.Yaml
);

// 4. INI
const iniSource = File.fromStr(
  `
format = INI
port = 8083
`,
  FileFormat.Ini
);

// 5. RON
const ronSource = File.fromStr(
  `
(
    format: "RON",
    port: 8084,
)
`,
  FileFormat.Ron
);

// 6. JSON5
const json5Source = File.fromStr(
  `
{
  // JSON5 comments supported
  format: 'JSON5',
  port: 8085,
}
`,
  FileFormat.Json5
);

const formats = [
  { name: "JSON", source: jsonSource },
  { name: "TOML", source: tomlSource },
  { name: "YAML", source: yamlSource },
  { name: "INI", source: iniSource },
  { name: "RON", source: ronSource },
  { name: "JSON5", source: json5Source },
];

for (const { name, source } of formats) {
  const config = new ConfigBuilder().addSource(source).build();
  console.log(`[${name}] format: ${config.getString("format")}, port: ${config.getInt("port")}`);
}

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
