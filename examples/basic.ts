import { ConfigBuilder, File, FileFormat } from "../dist/index.js";

function main() {
  // Build configuration using builder pattern
  const builder = new ConfigBuilder();

  // Set defaults
  builder
    .setDefault("host", "localhost")
    .setDefault("port", 8080)
    .setDefault("debug", true);

  // Load from inline JSON string source
  const jsonConfig = JSON.stringify({
    database: {
      url: "postgres://localhost:5432/mydb",
      max_connections: 20,
    },
  });
  const fileSource = File.fromStr(jsonConfig, FileFormat.Json);
  builder.addSource(fileSource);

  // Set override
  builder.setOverride("port", 9000);

  // Build the Config instance
  const config = builder.build();

  console.log("Host:", config.getString("host")); // "localhost"
  console.log("Port:", config.getInt("port")); // 9000
  console.log("Debug:", config.getBool("debug")); // true
  console.log("DB URL:", config.getString("database.url")); // "postgres://localhost:5432/mydb"
  console.log("DB Max Conn:", config.getInt("database.max_connections")); // 20
}

main();
