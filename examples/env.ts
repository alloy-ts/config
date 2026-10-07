import { ConfigBuilder, Environment } from "../dist/index.js";

function main() {
  process.env.APP_PORT = "3000";
  process.env.APP_DATABASE_URL = "postgres://localhost/app";

  const envSource = Environment.withPrefix("APP").separator("_");

  const config = new ConfigBuilder()
    .setDefault("port", 8080)
    .addSource(envSource)
    .build();

  console.log("Port:", config.getString("port")); // "3000"
  console.log("Database URL:", config.getString("database.url")); // "postgres://localhost/app"
}

main();
