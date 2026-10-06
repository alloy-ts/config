import { ConfigBuilder, File, FileFormat } from "../dist/index.js";

function main() {
  const file = File.fromStr(
    '{"app": {"name": "alloy", "version": "1.0.0"}}',
    FileFormat.Json
  );

  const config = new ConfigBuilder()
    .setDefault("default_host", "localhost")
    .addSource(file)
    .setOverride("env", "production")
    .build();

  console.log("host:", config.getString("default_host"));
  console.log("app name:", config.getString("app.name"));
  console.log("env:", config.getString("env"));
}

main();
