import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, Environment, File, FileFormat, Value } from "../index.js";

test("ConfigBuilder sets defaults, overrides, and builds Config", () => {
  const builder = new ConfigBuilder();
  builder
    .setDefault("port", 8080)
    .setDefault("host", "localhost")
    .setDefault("debug", true)
    .setOverride("port", 9000)
    .setOverrideOption("optional", "present")
    .setOverrideOption("absent", undefined);

  const config = builder.build();

  expect(config.getInt("port")).toBe(9000);
  expect(config.getString("host")).toBe("localhost");
  expect(config.getBool("debug")).toBe(true);
  expect(config.getString("optional")).toBe("present");
  expect(() => config.getString("absent")).toThrow();
});

test("new ConfigBuilder() static factory works", () => {
  const builder = new ConfigBuilder();
  builder.setDefault("key", "value");
  const config = builder.build();
  expect(config.getString("key")).toBe("value");
});

test("Config reading JSON file string source via File.fromStr and File.new", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "alloy-test",
      version: 1,
      rate: 4.5,
      features: ["auth", "billing"],
      metadata: { env: "test" },
    },
  });

  const file = File.fromStr(jsonContent, FileFormat.Json);
  const builder = new ConfigBuilder().addSource(file);
  const config = builder.build();

  expect(config.getString("app.name")).toBe("alloy-test");
  expect(config.getInt("app.version")).toBe(1);
  expect(config.getFloat("app.rate")).toBe(4.5);
  expect(config.getArray("app.features")).toEqual(["auth", "billing"]);
  expect(config.getTable("app.metadata")).toEqual({ env: "test" });
  expect(config.get("app.name")).toBe("alloy-test");

  const file2 = new File("config/settings", FileFormat.Json);
  expect(file2).toBeDefined();
});

test("Config Environment source", () => {
  process.env["APP_DATABASE_URL"] = "postgres://localhost/db";
  process.env["APP_MAX_CONNECTIONS"] = "10";

  const envSource = Environment.withPrefix("APP").separator("_");
  const builder = new ConfigBuilder().addSource(envSource);
  const config = builder.build();

  expect(config.getString("database.url")).toBe("postgres://localhost/db");
  expect(config.getString("max.connections")).toBe("10");

  delete process.env["APP_DATABASE_URL"];
  delete process.env["APP_MAX_CONNECTIONS"];
});

test("Config tryDeserialize and Config.tryFrom", () => {
  const inputObj = {
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    enabled: true,
  };

  const config = Config.tryFrom(inputObj);
  expect(config.getString("server.host")).toBe("0.0.0.0");
  expect(config.getInt("server.port")).toBe(3000);
  expect(config.getBool("enabled")).toBe(true);

  const deserialized = config.tryDeserialize();
  expect(deserialized).toEqual(inputObj);
});

test("Value class methods", () => {
  const vBool = Value.new(true, "origin_test");
  expect(vBool.origin()).toBe("origin_test");
  expect(vBool.intoBool()).toBe(true);

  const vInt = Value.new(42);
  expect(vInt.intoInt()).toBe(42);
  expect(vInt.intoUint()).toBe(42);
  expect(vInt.intoInt128()).toBe(42);

  const vFloat = Value.new(3.14);
  expect(vFloat.intoFloat()).toBe(3.14);

  const vString = Value.new("hello");
  expect(vString.intoString()).toBe("hello");

  const vArray = Value.new([1, 2, 3]);
  const arr = vArray.intoArray();
  expect(arr.length).toBe(3);
  expect(arr[0]!.intoInt()).toBe(1);

  const vTable = Value.new({ k: "v" });
  const tbl = vTable.intoTable();
  expect(tbl["k"]!.intoString()).toBe("v");
});

test("ConfigBuilder buildCloned allows multiple builds", () => {
  const builder = new ConfigBuilder().setDefault("a", 1);
  const config1 = builder.buildCloned();
  const config2 = builder.buildCloned();

  expect(config1.getInt("a")).toBe(1);
  expect(config2.getInt("a")).toBe(1);
});
