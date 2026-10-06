import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, Environment, File, FileFormat, Value, ValueKind } from "./main.ts";

test("ConfigBuilder set_default and set_override", () => {
  const builder = new ConfigBuilder();
  builder.setDefault("app.port", 8080);
  builder.setDefault("app.name", "my-app");
  builder.setOverride("app.port", 9090);

  const config = builder.build();
  expect(config.getInt("app.port")).toBe(9090);
  expect(config.getString("app.name")).toBe("my-app");
});

test("Config.builder() factory method", () => {
  const builder = Config.builder();
  builder.setDefault("debug", true);
  const config = builder.build();
  expect(config.getBool("debug")).toBe(true);
});

test("ConfigBuilder with File from_str JSON and TOML", () => {
  const jsonContent = JSON.stringify({
    server: {
      host: "localhost",
      port: 3000,
      ssl: false,
      rate: 1.5,
    },
    tags: ["web", "api"],
  });

  const file = File.fromStr(jsonContent, FileFormat.Json);
  const builder = new ConfigBuilder();
  builder.addSource(file);

  const config = builder.build();
  expect(config.getString("server.host")).toBe("localhost");
  expect(config.getInt("server.port")).toBe(3000);
  expect(config.getBool("server.ssl")).toBe(false);
  expect(config.getFloat("server.rate")).toBe(1.5);

  const tags = config.getArray("tags");
  expect(tags.length).toBe(2);
  expect(tags[0].intoString()).toBe("web");
  expect(tags[1].intoString()).toBe("api");

  const serverTable = config.getTable("server");
  expect(serverTable["host"].intoString()).toBe("localhost");
});

test("ConfigBuilder buildCloned", () => {
  const builder = new ConfigBuilder();
  builder.setDefault("key", "value1");

  const config1 = builder.buildCloned();
  builder.setOverride("key", "value2");
  const config2 = builder.build();

  expect(config1.getString("key")).toBe("value1");
  expect(config2.getString("key")).toBe("value2");
});

test("Config tryFrom and tryDeserialize", () => {
  const initialObj = {
    database: {
      url: "postgres://localhost/db",
      max_connections: 10,
    },
  };

  const config = Config.tryFrom(initialObj);
  expect(config.getString("database.url")).toBe("postgres://localhost/db");
  expect(config.getInt("database.max_connections")).toBe(10);

  const deserialized = config.tryDeserialize();
  expect(deserialized).toEqual(initialObj);
});

test("Environment source", () => {
  process.env["TEST_APP_HOST"] = "127.0.0.1";
  process.env["TEST_APP_PORT"] = "8000";

  const env = Environment.withPrefix("TEST_APP").separator("_");
  const builder = new ConfigBuilder();
  builder.addEnvironment(env);

  const config = builder.build();
  expect(config.getString("host")).toBe("127.0.0.1");
  expect(config.getInt("port")).toBe(8000);

  delete process.env["TEST_APP_HOST"];
  delete process.env["TEST_APP_PORT"];
});

test("Value operations and ValueKind", () => {
  const val = new Value(42, "test-origin");
  expect(val.origin()).toBe("test-origin");
  expect(val.kind).toBe(ValueKind.I64);
  expect(val.intoInt()).toBe(42);
  expect(val.intoString()).toBe("42");
  expect(val.intoFloat()).toBe(42.0);
  expect(val.intoBool()).toBe(true);

  const boolVal = new Value(false);
  expect(boolVal.kind).toBe(ValueKind.Boolean);
  expect(boolVal.intoBool()).toBe(false);
});

test("Config.get returns Value", () => {
  const builder = Config.builder();
  builder.setDefault("title", "Alloy");
  const config = builder.build();

  const val = config.get("title");
  expect(val.kind).toBe(ValueKind.String);
  expect(val.intoString()).toBe("Alloy");
});
