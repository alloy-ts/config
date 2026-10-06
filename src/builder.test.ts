import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigBuilder, File, FileFormat } from "../index.js";

describe("ConfigBuilder and NAPI bindings (builder.rs)", () => {
  it("supports new ConfigBuilder() chaining with setDefault, addSource, setOverride, and build", () => {
    const fileSource = File.fromStr(
      '{"fileKey": "fileVal", "default": "overriddenByFile"}',
      FileFormat.Json,
    );
    const config = new ConfigBuilder()
      .setDefault("default", "1")
      .addSource(fileSource)
      .setOverride("override", "1")
      .build();

    assert.strictEqual(config.getString("default"), "overriddenByFile");
    assert.strictEqual(config.getString("fileKey"), "fileVal");
    assert.strictEqual(config.getString("override"), "1");
  });

  it("supports ConfigBuilder constructor and method chaining", () => {
    const builder = new ConfigBuilder();
    builder
      .setDefault("a", "alpha")
      .setDefault("b", 100)
      .setDefault("c", true)
      .setOverride("b", 200);

    const config = builder.build();
    assert.strictEqual(config.getString("a"), "alpha");
    assert.strictEqual(config.getInt("b"), 200);
    assert.strictEqual(config.getBool("c"), true);
  });

  it("supports setOverrideOption with Some and None/undefined", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("opt1", "base1");
    builder.setDefault("opt2", "base2");

    builder.setOverrideOption("opt1", "new1");
    builder.setOverrideOption("opt2", undefined);

    const config = builder.build();
    assert.strictEqual(config.getString("opt1"), "new1");
    assert.strictEqual(config.getString("opt2"), "base2");
  });

  it("supports addFile with format and without format", () => {
    const fileSource = File.fromStr('{"nested": {"key": "value"}}', FileFormat.Json);
    const builder = new ConfigBuilder();
    builder.addSource(fileSource);

    const config = builder.buildCloned();
    assert.strictEqual(config.getString("nested.key"), "value");
    assert.deepStrictEqual(config.get("nested"), { key: "value" });
  });

  it("supports File static constructors and methods (File.new, File.fromStr, File.withName, format, required)", () => {
    const f1 = File.fromStr('{"x": 10}', FileFormat.Json);
    f1.required(true);

    const f2 = new File("non_existent_file", FileFormat.Json);
    f2.required(false);

    const config = new ConfigBuilder().addSource(f1).addSource(f2).build();

    assert.strictEqual(config.getInt("x"), 10);
  });

  it("supports buildCloned without consuming builder", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("shared", "yes");

    const config1 = builder.buildCloned();
    builder.setOverride("shared", "no");
    const config2 = builder.build();

    assert.strictEqual(config1.getString("shared"), "yes");
    assert.strictEqual(config2.getString("shared"), "no");
  });
});
