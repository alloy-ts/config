import { expect, test } from "vite-plus/test";
import { Config, Environment, File, Value } from "./main.ts";

test("ConfigBuilder set_default and set_override", () => {
  const builder = Config.builder();
  builder.setDefault("port", 8080);
  builder.setDefault("host", "localhost");
  builder.setOverride("port", 9090);

  const config = builder.build();

  expect(config.getInt("port")).toBe(9090);
  expect(config.getString("host")).toBe("localhost");
  expect(config.get("port")).toBe(9090);
});

test("Config with File source from JSON string", () => {
  const fileSource = File.fromStr(
    JSON.stringify({
      app: {
        name: "alloy-test",
        version: 1,
        debug: true,
        ratio: 3.14,
      },
      tags: ["alpha", "beta"],
    }),
    "Json",
  );

  const config = Config.builder().addSource(fileSource).build();

  expect(config.getString("app.name")).toBe("alloy-test");
  expect(config.getInt("app.version")).toBe(1);
  expect(config.getBool("app.debug")).toBe(true);
  expect(config.getFloat("app.ratio")).toBe(3.14);

  const tags = config.getArray("tags");
  expect(tags.length).toBe(2);
  expect(tags[0]?.intoString()).toBe("alpha");
  expect(tags[1]?.intoString()).toBe("beta");
});

test("Config with File source from TOML string", () => {
  const tomlSource = File.fromStr(
    `
[database]
server = "192.168.1.1"
ports = [ 8001, 8001, 8002 ]
connection_max = 5000
enabled = true
`,
    "Toml",
  );

  const config = Config.builder().addSource(tomlSource).build();

  expect(config.getString("database.server")).toBe("192.168.1.1");
  expect(config.getInt("database.connection_max")).toBe(5000);
  expect(config.getBool("database.enabled")).toBe(true);
});

test("Config tryFrom and tryDeserialize", () => {
  const config = Config.tryFrom({
    service: "auth",
    timeout: 30,
  });

  expect(config.getString("service")).toBe("auth");
  expect(config.getInt("timeout")).toBe(30);

  const obj = config.tryDeserialize();
  expect(obj).toEqual({
    service: "auth",
    timeout: 30,
  });
});

test("Value type accessors and kind", () => {
  const valInt = new Value("test", 42);
  expect(valInt.intoInt()).toBe(42);
  expect(valInt.intoString()).toBe("42");

  const valBool = new Value(null, true);
  expect(valBool.intoBool()).toBe(true);

  const valStr = new Value("origin_file", "hello");
  expect(valStr.intoString()).toBe("hello");
  expect(valStr.origin()).toBe("origin_file");
});

test("Environment source", () => {
  process.env["ALLOY_TEST_KEY"] = "env_value";

  const envSource = Environment.withPrefix("ALLOY_TEST");
  const config = Config.builder().addSource(envSource).build();

  expect(config.getString("key")).toBe("env_value");

  delete process.env["ALLOY_TEST_KEY"];
});
