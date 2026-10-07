import { Config, Environment, File, FileFormat } from "../src/main.ts";

// 1. Simulate reading settings from a JSON file string
const jsonConfig = JSON.stringify({
  database: {
    url: "postgres://localhost:5432/mydb",
    max_connections: 20,
  },
  logging: {
    level: "info",
  },
});

const fileSource = File.fromStr(jsonConfig, FileFormat.Json);

// 2. Set environment variables
process.env["APP_DATABASE_MAX_CONNECTIONS"] = "50";
process.env["APP_LOGGING_LEVEL"] = "debug";

const envSource = Environment.withPrefix("APP").separator("_");

// 3. Chain sources into builder (Environment overrides File)
const config = Config.builder().addSource(fileSource).addSource(envSource).build();

console.log("Database URL:", config.getString("database.url"));
console.log("Max Connections (from Env):", config.getString("database.max.connections"));
console.log("Log Level (from Env):", config.getString("logging.level"));

delete process.env["APP_DATABASE_MAX_CONNECTIONS"];
delete process.env["APP_LOGGING_LEVEL"];
