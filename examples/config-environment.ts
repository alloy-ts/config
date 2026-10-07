import console from "node:console";
import { Config, Environment } from "../src/main.ts";

process.env["APP_SERVER_HOST"] = "127.0.0.1";
process.env["APP_SERVER_PORT"] = "9000";
process.env["APP_LOG_LEVEL"] = "info";

try {
  const env = Environment.withPrefix("APP").separator("_");
  const config = Config.builder()
    .setDefault("server.host", "0.0.0.0")
    .setDefault("server.port", 8080)
    .addEnvironment(env)
    .build();

  console.log("Server host from env:", config.getString("server.host"));
  console.log("Server port from env:", config.getInt("server.port"));
  console.log("Log level from env:", config.getString("log.level"));
} finally {
  delete process.env["APP_SERVER_HOST"];
  delete process.env["APP_SERVER_PORT"];
  delete process.env["APP_LOG_LEVEL"];
}
