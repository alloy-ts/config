import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

test("File.fromStr with JSON format", () => {
  const jsonStr = JSON.stringify({
    app: {
      name: "alloy-test",
      version: 1,
    },
  });

  const file = File.fromStr(jsonStr, FileFormat.Json);
  const config = Config.builder().addSource(file).build();

  expect(config.getString("app.name")).toBe("alloy-test");
  expect(config.getInt("app.version")).toBe(1);
});

test("Config.File constructor and Config.File.Format enum", () => {
  const jsonStr = JSON.stringify({
    database: {
      port: 5432,
      enabled: true,
    },
  });

  const file = File.fromStr(jsonStr, FileFormat.Json);
  const config = Config.builder()
    .setDefault("database.host", "localhost")
    .addSource(file)
    .setOverride("database.enabled", true)
    .build();

  expect(config.getString("database.host")).toBe("localhost");
  expect(config.getInt("database.port")).toBe(5432);
  expect(config.getBool("database.enabled")).toBe(true);
});

test("File.withName and file required setting", () => {
  const file = File.withName("non_existent_config.json").required(false);
  const config = Config.builder().setDefault("fallback", "ok").addSource(file).build();

  expect(config.getString("fallback")).toBe("ok");
});
