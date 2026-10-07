import { expect, test } from "vite-plus/test";
import { Config, Environment, File, Value } from "../index.js";
import type { FileFormat, ValueKind } from "../index.js";

test("ConfigBuilder creates Config with defaults and overrides", () => {
  const builder = Config.builder();
  builder
    .setDefault("port", 8080)
    .setDefault("host", "127.0.0.1")
    .setOverride("port", 9000)
    .setOverrideOption("debug", true)
    .setOverrideOption("ignored", null);

  const config = builder.build();

  expect(config.getInt("port")).toBe(9000);
  expect(config.getString("host")).toBe("127.0.0.1");
  expect(config.getBool("debug")).toBe(true);
});

test("Config supports File source", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "my-app",
      version: 1,
    },
    features: ["auth", "logging"],
  });

  const fileSource = File.fromStr(jsonContent, 1 as FileFormat);
  const config = Config.builder().addSource(fileSource).build();

  expect(config.getString("app.name")).toBe("my-app");
  expect(config.getInt("app.version")).toBe(1);

  const arr = config.getArray("features");
  expect(arr.length).toBe(2);
  expect(arr[0]!.intoString()).toBe("auth");
  expect(arr[1]!.intoString()).toBe("logging");
});

test("Config supports Environment source", () => {
  process.env["APP_ENV"] = "test";
  process.env["APP_PORT"] = "3000";

  const envSource = Environment.withPrefix("APP").prefix("APP");
  const config = Config.builder().addSource(envSource).build();

  expect(config.getString("env")).toBe("test");
  expect(config.getInt("port")).toBe(3000);
});

test("Config tryFrom and tryDeserialize", () => {
  const initial = {
    title: "Test",
    count: 42,
    enabled: true,
  };

  const config = Config.tryFrom(initial);
  expect(config.getString("title")).toBe("Test");
  expect(config.getInt("count")).toBe(42);
  expect(config.getBool("enabled")).toBe(true);

  const deserialized = config.tryDeserialize();
  expect(deserialized.title).toBe("Test");
  expect(deserialized.count).toBe(42);
  expect(deserialized.enabled).toBe(true);
});

test("Value methods and ValueKind inspection", () => {
  const val = new Value({ key: "value", num: 123 } as any, "test-origin");

  expect(val.origin()).toBe("test-origin");
  expect(val.kind).toBe(8 as ValueKind);

  const table = val.intoTable();
  expect(table["key"]!.intoString()).toBe("value");
  expect(table["num"]!.intoInt()).toBe(123);
  expect(table["num"]!.intoFloat()).toBe(123.0);
});
