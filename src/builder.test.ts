import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, ConfigBuilder, File, FileFormat, Value } from "../dist/index.js";

describe("NAPI bindings & src/builder.test.ts equivalence", () => {
  it("Config.builder chaining and File source", () => {
    const file = new File("test_settings", FileFormat.Json);
    file.required(false);
    const config = ConfigBuilder.prototype ? new ConfigBuilder() : Config.builder();
    config
      .setDefault("default", "1")
      .addSource(file)
      .setOverride("override", "1");

    const builtConfig = config.build();
    assert.strictEqual(builtConfig.getString("default"), "1");
    assert.strictEqual(builtConfig.getString("override"), "1");
  });

  it("ConfigBuilder setSchema with Schema object", () => {
    const fakeSchema = { type: "object", properties: { name: { type: "string" } } };
    const builder = new ConfigBuilder();
    builder.setSchema(fakeSchema);
    builder.setDefault("name", "Alloy");

    const config = builder.build();
    assert.strictEqual(config.getString("name"), "Alloy");
  });

  it("ConfigBuilder and Config basic operations", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("key", "value");
    builder.setDefault("num", 42);

    const config = builder.build();
    assert.strictEqual(config.getString("key"), "value");
    assert.strictEqual(config.getInt("num"), 42);
  });

  it("File source fromStr with ConfigBuilder", () => {
    const file = File.fromStr('{"a": "b"}', FileFormat.Json);
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
