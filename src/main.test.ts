import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, File, FileFormat, Value } from "../dist/index.js";

test("ConfigBuilder with set_default and set_override", () => {
  const builder = new ConfigBuilder();
  builder.setDefault("debug", false);
  builder.setDefault("port", 8080);
  builder.setOverride("debug", true);

  const config = builder.build();

  expect(config.getBool("debug")).toBe(true);
  expect(config.getInt("port")).toBe(8080);
  expect(config.get("port")).toBe(8080);
});

test("File source from string (JSON and TOML)", () => {
  const jsonContent = JSON.stringify({
    server: {
      host: "localhost",
      port: 3000,
    },
    features: ["auth", "logging"],
  });

  const file = File.fromStr(jsonContent, FileFormat.Json);
  const builder = new ConfigBuilder();
  builder.addSource(file);

  const config = builder.build();

  expect(config.getString("server.host")).toBe("localhost");
  expect(config.getInt("server.port")).toBe(3000);

  const table = config.getTable("server");
  expect(table["host"].intoString()).toBe("localhost");
  expect(table["port"].intoInt()).toBe(3000);

  const arr = config.getArray("features");
  expect(arr.map((v) => v.intoString())).toEqual(["auth", "logging"]);
});

test("Value class functionality", () => {
  const val = new Value(42, "custom_source");
  expect(val.intoInt()).toBe(42);
  expect(val.origin()).toBe("custom_source");

  const strVal = new Value("true");
  expect(strVal.intoBool()).toBe(true);
});

test("Config tryFrom and tryDeserialize", () => {
  const config = Config.tryFrom({
    database: {
      url: "postgres://localhost/db",
      connections: 10,
    },
  });

  expect(config.getString("database.url")).toBe("postgres://localhost/db");
  expect(config.getInt("database.connections")).toBe(10);

  const deserialized = config.tryDeserialize() as any;
  expect(deserialized).toEqual({
    database: {
      url: "postgres://localhost/db",
      connections: 10,
    },
  });
});
