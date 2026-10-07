import { ConfigBuilder, Environment } from "@alloy-ts/config";

// Set environment variables for demonstration
process.env["MYAPP_DATABASE_URL"] = "postgres://user:pass@localhost/db";
process.env["MYAPP_SERVER_PORT"] = "8080";

// Configure Environment source with prefix 'MYAPP' and '_' separator
const envSource = Environment.withPrefix("MYAPP").separator("_");

const config = new ConfigBuilder()
  .setDefault("server.port", 3000) // Default port 3000
  .addSource(envSource) // Environment variable MYAPP_SERVER_PORT=8080 will override
  .build();

console.log("Database URL:", config.getString("database.url")); // "postgres://user:pass@localhost/db"
console.log("Server Port:", config.getInt("server.port")); // 8080
