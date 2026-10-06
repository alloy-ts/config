import { Config, File, FileFormat } from "../index.js";

const jsonContent = JSON.stringify({
  app: {
    title: "Alloy Config App",
    version: "1.0.0",
  },
  database: {
    host: "localhost",
    port: 5432,
  },
});

const fileSource = File.fromStr(jsonContent, FileFormat.Json);

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(fileSource)
  .setOverride("override", "1")
  .build();

console.log("App title:", config.getString("app.title"));
console.log("Database port:", config.getInt("database.port"));
console.log("Default setting:", config.getString("default"));
console.log("Override setting:", config.getString("override"));
