import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat, Value, type Value as ValueType } from "./main.ts";

test("ConfigBuilder with defaults and overrides", () => {
  const builder = Config.builder();
  builder.setDefault("host", "localhost");
  builder.setDefault("port", 8080);
  builder.setOverride("debug", true);

  const config = builder.build();

  expect(config.getString("host")).toBe("localhost");
  expect(config.getInt("port")).toBe(8080);
  expect(config.getBool("debug")).toBe(true);
});

test("Config with File source (JSON string)", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "alloy",
      version: 1,
    },
    features: ["a", "b", "c"],
  });

  const file = File.fromStr(jsonContent, FileFormat.Json);
  const config = Config.builder().addSource(file).build();

  expect(config.getString("app.name")).toBe("alloy");
  expect(config.getInt("app.version")).toBe(1);

  const arrayValues = config.getArray("features");
  expect(arrayValues.map((v: ValueType) => v.intoString())).toEqual(["a", "b", "c"]);

  const table = config.getTable("app");
  expect((table["name"] as ValueType).intoString()).toBe("alloy");
});

test("Config tryDeserialize and tryFrom", () => {
  const data = {
    database: {
      url: "postgres://localhost:5432/db",
      max_connections: 10,
    },
  };

  const config = Config.tryFrom(data);
  expect(config.getString("database.url")).toBe("postgres://localhost:5432/db");
  expect(config.getInt("database.max_connections")).toBe(10);

  const deserialized = config.tryDeserialize();
  expect(deserialized).toEqual(data);
});

test("Value class methods", () => {
  const val = new Value("test_origin", "foo");
  expect(val.intoString()).toBe("foo");
  expect(val.origin()).toBe("test_origin");
});
