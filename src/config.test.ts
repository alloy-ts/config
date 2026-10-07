import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, Value } from "./main.ts";

describe("Config class and NAPI bindings (src/config.rs)", () => {
  it("supports Config.builder() with Config.File source", () => {
    const fileContent = JSON.stringify({ fileKey: "fileValue", default: "overridden" });
    const fileSource = Config.File.fromStr(fileContent, Config.File.Format.Json);

    const config = Config.builder()
      .setDefault("default", "1")
      .addSource(fileSource)
      .setOverride("override", "1")
      .build();

    assert.strictEqual(config.getString("default"), "overridden");
    assert.strictEqual(config.getString("fileKey"), "fileValue");
    assert.strictEqual(config.getString("override"), "1");
  });

  it("supports typed getters (getString, getInt, getFloat, getBool, getTable, getArray, get)", () => {
    const data = {
      str: "hello",
      num: 42,
      flt: 3.14,
      flag: true,
      arr: [1, 2, 3],
      nested: { k: "v" },
    };

    const config = Config.tryFrom(data);

    assert.strictEqual(config.getString("str"), "hello");
    assert.strictEqual(config.getInt("num"), 42);
    assert.strictEqual(config.getFloat("flt"), 3.14);
    assert.strictEqual(config.getBool("flag"), true);
    assert.deepStrictEqual(config.getArray("arr"), [1, 2, 3]);
    assert.deepStrictEqual(config.getTable("nested"), { k: "v" });
    assert.strictEqual(config.get("str"), "hello");
  });

  it("supports tryDeserialize and cache getter", () => {
    const input = { env: "test", port: 3000 };
    const config = Config.tryFrom(input);

    const deserialized = config.tryDeserialize();
    assert.deepStrictEqual(deserialized, input);

    const cache = config.cache;
    assert.ok(cache);
    assert.strictEqual(cache.env, "test");
    assert.strictEqual(cache.port, 3000);
  });

  it("supports Value object conversions", () => {
    const valStr = Value.new("world", "test_origin");
    assert.strictEqual(valStr.origin(), "test_origin");
    assert.strictEqual(valStr.intoString(), "world");

    const valInt = Value.new(100);
    assert.strictEqual(valInt.intoInt(), 100);

    const valBool = Value.new(false);
    assert.strictEqual(valBool.intoBool(), false);

    const valArr = Value.new([10, 20]);
    const arr = valArr.intoArray();
    assert.strictEqual(arr.length, 2);
    assert.strictEqual(arr[0].intoInt(), 10);

    const valTbl = Value.new({ name: "alloy" });
    const tbl = valTbl.intoTable();
    assert.strictEqual(tbl.name.intoString(), "alloy");
  });
});
