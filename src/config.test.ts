import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, File } from "./main.ts";

test("Config getters (getString, getInt, getFloat, getBool, getTable, getArray)", () => {
  const json = JSON.stringify({
    str: "hello",
    numInt: 100,
    numFloat: 2.718,
    flag: true,
    table: { innerKey: "innerVal" },
    arr: ["a", "b", "c"],
  });

  const config = new ConfigBuilder().addSource(File.fromStr(json, "json")).build();

  expect(config.getString("str")).toBe("hello");
  expect(config.getInt("numInt")).toBe(100);
  expect(config.getFloat("numFloat")).toBe(2.718);
  expect(config.getBool("flag")).toBe(true);

  const table = config.getTable("table");
  expect(table["innerKey"]).toBe("innerVal");

  const arr = config.getArray("arr");
  expect(arr.length).toBe(3);
  expect(arr[0]).toBe("a");
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
