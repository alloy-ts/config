import { ConfigBuilder, File, FileFormat } from "../dist/index.js";

function main() {
  const file = File.fromStr('{"env": "development"}', FileFormat.Json);

  const config = new ConfigBuilder()
    .setDefault("default", "1")
    .addSource(file)
    .setOverride("override", "1")
    .build();

  console.log("default:", config.getString("default"));
  console.log("env:", config.getString("env"));
  console.log("override:", config.getString("override"));
}

main();
