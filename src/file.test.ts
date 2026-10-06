import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigBuilder, File } from "../dist/index.js";

describe("File NAPI bindings", () => {
  it("creates File using File.fromStr and loads config", () => {
    const file = File.fromStr('{"key": "value_from_str"}', "json");
    const config = new ConfigBuilder().addSource(file).build();
    assert.strictEqual(config.getString("key"), "value_from_str");
  });

  it("creates File using File.new and File.withName", () => {
    const file1 = File.new("config_test", "json");
    assert.ok(file1);

    const file2 = File.withName("config_test");
    assert.ok(file2);
  });

  it("chains format and required on File instance", () => {
    const file = File.fromStr('{"a": 1}', "json");
    file.format("json").required(false);

    const config = new ConfigBuilder().addSource(file).build();
    assert.strictEqual(config.getInt("a"), 1);
  });

  it("throws error for unsupported file format", () => {
    assert.throws(() => {
      File.fromStr('{"a": 1}', "invalid_format");
    });
  });
});
