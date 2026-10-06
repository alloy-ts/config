import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, File } from "../dist/index.js";

describe("File NAPI bindings (file.rs)", () => {
  it("creates File from string content using File.fromStr", () => {
    const file = File.fromStr('{"port": 8080, "host": "localhost"}', "json");
    const config = Config.builder().addSource(file).build();

    assert.strictEqual(config.getInt("port"), 8080);
    assert.strictEqual(config.getString("host"), "localhost");
  });

  it("creates File using File.new and File.withName", () => {
    const fileNew = File.new("non_existent_file", "json");
    fileNew.required(false);

    const fileWithName = File.withName("non_existent_base");
    fileWithName.required(false);

    const config = Config.builder()
      .setDefault("app", "myapp")
      .addSource(fileNew)
      .addSource(fileWithName)
      .build();

    assert.strictEqual(config.getString("app"), "myapp");
  });

  it("sets format dynamically on File", () => {
    const file = File.fromStr("key = 'value'", "toml");
    file.format("toml");

    const config = Config.builder().addSource(file).build();
    assert.strictEqual(config.getString("key"), "value");
  });

  it("handles unsupported file format gracefully", () => {
    assert.throws(() => {
      File.fromStr("data", "invalid_format");
    }, /Unsupported file format/);
  });
});
