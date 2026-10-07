import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config } from "./main.ts";

describe("Config NAPI bindings (config.rs)", () => {
  it("supports Config.builder() static method and method chaining", () => {
    const fileSource = Config.File.from_str('{"fileKey": "fileVal", "default": "fileDef"}', Config.File.Format.Json);
    const config = Config.builder()
      .setDefault("default", "1")
      .addSource(fileSource)
      .setOverride("override", "1")
      .build();

    assert.strictEqual(config.getString("default"), "fileDef");
    assert.strictEqual(config.getString("fileKey"), "fileVal");
    assert.strictEqual(config.getString("override"), "1");
  });

  it("supports typed getters get_string, get_int, get_float, get_bool, get_table, get_array, get", () => {
    const fileSource = Config.File.from_str(
      JSON.stringify({
        str: "hello",
        num: 42,
        flt: 3.14,
        bool: true,
        tbl: { inner: "value" },
        arr: [1, 2, 3],
      }),
      Config.File.Format.Json,
    );

    const config = Config.builder().addSource(fileSource).build();

    assert.strictEqual(config.getString("str"), "hello");
    assert.strictEqual(config.getInt("num"), 42);
    assert.strictEqual(config.getFloat("flt"), 3.14);
    assert.strictEqual(config.getBool("bool"), true);
    assert.deepStrictEqual(config.getTable("tbl"), { inner: "value" });
    assert.deepStrictEqual(config.getArray("arr"), [1, 2, 3]);
    assert.strictEqual(config.get("str"), "hello");
  });

  it("supports Config.try_from / tryFrom and try_deserialize / tryDeserialize", () => {
    const data = { app: "alloy", port: 8080 };
    const config = Config.try_from(data);

    assert.strictEqual(config.getString("app"), "alloy");
    assert.strictEqual(config.getInt("port"), 8080);

    const deserialized = config.try_deserialize();
    assert.deepStrictEqual(deserialized, data);
  });
});
