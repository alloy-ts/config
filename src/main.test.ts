import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, File, Environment, Value } from "./main.ts";
import type { FileFormat, Case } from "./main.ts";

test("ConfigBuilder set_default, set_override and build", () => {
  const builder = new ConfigBuilder();
  builder
    .setDefault("host", "localhost")
    .setDefault("port", 8080)
    .setDefault("debug", true)
    .setOverride("port", 9090);

  const config = builder.build();

  expect(config.getString("host")).toBe("localhost");
  expect(config.getInt("port")).toBe(9090);
  expect(config.getBool("debug")).toBe(true);
});

test("Config.builder() factory method", () => {
  const builder = Config.builder();
  builder.setDefault("name", "alloy");
  const config = builder.build();

  expect(config.getString("name")).toBe("alloy");
});

test("File source from_str with JSON", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "my-app",
      version: 1,
      enabled: true,
    },
    servers: ["s1", "s2"],
  });

  const jsonFmt: FileFormat = "Json" as FileFormat;
  const file = File.fromStr(jsonContent, jsonFmt);
  const config = Config.builder().addSource(file).build();

  expect(config.getString("app.name")).toBe("my-app");
  expect(config.getInt("app.version")).toBe(1);
  expect(config.getBool("app.enabled")).toBe(true);
  expect(config.get("servers")).toEqual(["s1", "s2"]);
});

test("File source from_str with TOML", () => {
  const tomlContent = `
[database]
server = "192.168.1.1"
ports = [ 8001, 8002 ]
connection_max = 5000
enabled = true
`;

  const tomlFmt: FileFormat = "Toml" as FileFormat;
  const file = File.fromStr(tomlContent, tomlFmt);
  const config = Config.builder().addSource(file).build();

  expect(config.getString("database.server")).toBe("192.168.1.1");
  expect(config.getInt("database.connection_max")).toBe(5000);
  expect(config.getBool("database.enabled")).toBe(true);
});

test("Config tryDeserialize and tryFrom", () => {
  const initialData = { key: "val", count: 42 };
  const config = Config.tryFrom(initialData);

  expect(config.getString("key")).toBe("val");
  expect(config.getInt("count")).toBe(42);

  const deserialized = config.tryDeserialize();
  expect(deserialized).toEqual({ key: "val", count: 42 });
});

test("Value inspection and type conversions", () => {
  const valBool = new Value("test-origin", true);
  expect(valBool.intoBool()).toBe(true);
  expect(valBool.origin).toBe("test-origin");

  const valInt = new Value(null, 123);
  expect(valInt.intoInt()).toBe(123);

  const valString = new Value(null, "hello");
  expect(valString.intoString()).toBe("hello");

  expect(valBool.kind.kind).toBe("boolean");
});

test("Case type verification", () => {
  const lowerCase: Case = "Lower" as Case;
  expect(lowerCase).toBe("Lower");
});

test("Environment source", () => {
  const env = Environment.withPrefix("APP");
  expect(env).toBeDefined();
});
