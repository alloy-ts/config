import { expect, test } from "vite-plus/test";
import { Config, File, type FileFormat, Value, type Value as ValueType } from "./main.ts";

test("ConfigBuilder with defaults and overrides", () => {
  const builder = Config.builder();
  builder.set_default("host", "localhost");
  builder.set_default("port", 8080);
  builder.set_override("debug", true);

  const config = builder.build();

  expect(config.get_string("host")).toBe("localhost");
  expect(config.get_int("port")).toBe(8080);
  expect(config.get_bool("debug")).toBe(true);
});

test("Config with File source (JSON string)", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "alloy",
      version: 1,
    },
    features: ["a", "b", "c"],
  });

  const file = File.from_str(jsonContent, 1 as unknown as FileFormat);
  const config = Config.builder().add_source(file).build();

  expect(config.get_string("app.name")).toBe("alloy");
  expect(config.get_int("app.version")).toBe(1);

  const arrayValues = config.get_array("features");
  expect(arrayValues.map((v: ValueType) => v.into_string())).toEqual(["a", "b", "c"]);

  const table = config.get_table("app");
  expect(table["name"].into_string()).toBe("alloy");
});

test("Config try_deserialize and try_from", () => {
  const data = {
    database: {
      url: "postgres://localhost:5432/db",
      max_connections: 10,
    },
  };

  const config = Config.try_from(data);
  expect(config.get_string("database.url")).toBe("postgres://localhost:5432/db");
  expect(config.get_int("database.max_connections")).toBe(10);

  const deserialized = config.try_deserialize();
  expect(deserialized).toEqual(data);
});

test("Value class methods", () => {
  const val = new Value("test_origin", "foo");
  expect(val.into_string()).toBe("foo");
  expect(val.origin()).toBe("test_origin");
});
