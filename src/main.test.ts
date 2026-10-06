import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, File, FileFormat, Value, ValueKind } from "../dist/index.js";

test("ConfigBuilder with defaults and overrides", () => {
  const builder = new ConfigBuilder();
  builder.setDefault("app.port", 8080);
  builder.setDefault("app.host", "localhost");
  builder.setOverride("app.port", 9090);

  const config = builder.build();

  expect(config.getInt("app.port")).toBe(9090);
  expect(config.getString("app.host")).toBe("localhost");
  expect(config.get("app.port")).toBe(9090);
});

test("ConfigBuilder with File from string source", () => {
  const jsonContent = JSON.stringify({
    database: { url: "postgres://localhost:5432/db", pool: 10 },
    enabled: true,
  });
  const file = File.fromStr(jsonContent, FileFormat.Json);

  const builder = new ConfigBuilder();
  builder.addSource(file);
  const config = builder.build();

  expect(config.getString("database.url")).toBe("postgres://localhost:5432/db");
  expect(config.getInt("database.pool")).toBe(10);
  expect(config.getBool("enabled")).toBe(true);
});

test("Config tryFrom and tryDeserialize", () => {
  const obj = { server: "nginx", threads: 4 };
  const config = Config.tryFrom(obj);

  expect(config.getString("server")).toBe("nginx");
  expect(config.getInt("threads")).toBe(4);

  const deserialized = config.tryDeserialize();
  expect(deserialized).toEqual(obj);
});

test("Value operations and ValueKind", () => {
  const val = new Value("123", "test_origin");
  expect(val.intoInt()).toBe(123);
  expect(val.intoString()).toBe("123");
  expect(val.origin()).toBe("test_origin");
  expect(val.kind).toBe(ValueKind.String);
});
