import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigBuilder, File, Value } from "../dist/index.js";

describe("NAPI bindings", () => {
  it("ConfigBuilder and Config", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("key", "value");
    builder.setDefault("num", 42);

    const config = builder.build();
    assert.strictEqual(config.getString("key"), "value");
    assert.strictEqual(config.getInt("num"), 42);
  });

  it("File source with ConfigBuilder", () => {
    const file = File.fromStr('{"a": "b"}', "json");
    const builder = new ConfigBuilder();
    builder.addSource(file);

    const config = builder.build();
    assert.strictEqual(config.getString("a"), "b");
  });

  it("Value NAPI methods", () => {
    const val = Value.new("hello");
    assert.strictEqual(val.intoString(), "hello");

    const intVal = Value.new(123);
    assert.strictEqual(intVal.intoInt(), 123);
  });
});
