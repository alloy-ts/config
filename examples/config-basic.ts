import { Config, ConfigBuilder } from "../dist/index.js";

function main() {
  // 1. Create a Config using Config.builder()
  const builder = Config.builder();
  builder.setDefault("app.name", "AlloyApp");
  builder.setDefault("app.port", 8080);
  builder.setDefault("app.debug", true);
  builder.setDefault("app.features", ["auth", "logging", "metrics"]);
  builder.setDefault("app.db", { host: "localhost", port: 5432 });

  const config = builder.build();

  // 2. Query values using getter methods
  console.log("App Name:", config.getString("app.name"));
  console.log("App Port:", config.getInt("app.port"));
  console.log("App Debug:", config.getBool("app.debug"));
  console.log("App Features:", config.getArray("app.features"));
  console.log("App DB Table:", config.getTable("app.db"));

  // 3. Query generic value or deserialized object
  console.log("Generic DB query:", config.get("app.db"));
  console.log("Full Cache:", config.cache);

  // 4. Create Config from a JavaScript object using Config.tryFrom
  const fromObjConfig = Config.tryFrom({
    service: "payment",
    timeout: 5000,
  });
  console.log("Service from obj:", fromObjConfig.getString("service"));
}

main();
