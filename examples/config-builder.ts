import { Config, File, FileFormat } from "../index.js";

const fileSource = File.fromStr(
  JSON.stringify({
    server: {
      port: 8080,
      host: "localhost",
    },
  }),
  FileFormat.Json,
);

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(fileSource)
  .setOverride("override", "1")
  .build();

console.log("Server port:", config.getInt("server.port"));
console.log("Server host:", config.getString("server.host"));
console.log("Default setting:", config.getString("default"));
console.log("Override setting:", config.getString("override"));
