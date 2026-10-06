import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

test("Config getters (getString, getInt, getFloat, getBool, getTable, getArray)", () => {
  const json = JSON.stringify({
    str: "hello",
    numInt: 100,
    numFloat: 2.718,
    flag: true,
    table: { innerKey: "innerVal" },
    arr: ["a", "b", "c"],
  });

  const config = Config.builder().addSource(File.fromStr(json, FileFormat.Json)).build();

  expect(config.getString("str")).toBe("hello");
  expect(config.getInt("numInt")).toBe(100);
  expect(config.getFloat("numFloat")).toBe(2.718);
  expect(config.getBool("flag")).toBe(true);

  const table = config.getTable("table");
  expect(table["innerKey"]?.intoString()).toBe("innerVal");

  const arr = config.getArray("arr");
  expect(arr.length).toBe(3);
  expect(arr[0]?.intoString()).toBe("a");
});

test("Config.tryFrom and tryDeserialize", () => {
  const input = {
    appName: "my-app",
    workers: 4,
  };

  const config = Config.tryFrom(input);
  expect(config.getString("appName")).toBe("my-app");
  expect(config.getInt("workers")).toBe(4);

  const output = config.tryDeserialize();
  expect(output).toEqual(input);
});

test("Config.builder chaining with Config.File", () => {
  const config = Config.builder()
    .setDefault("default", "1")
    .addSource(new Config.File("config/settings", Config.File.Format.Json))
    .setOverride("override", "1")
    .build();

  expect(config.getString("default")).toBe("1");
  expect(config.getString("setting")).toBe("json_file_value");
  expect(config.getString("override")).toBe("1");
});
