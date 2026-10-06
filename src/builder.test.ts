import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, ConfigBuilder, File } from "../dist/index.js";

describe("ConfigBuilder NAPI bindings", () => {
  it("builds configuration using Config.builder() and fluent builder methods", () => {
    const config = Config.builder()
      .setDefault("default", "1")
      .addSource(File.fromStr('{"config": "json"}', "json"))
      .setOverride("override", "1")
      .build();

    assert.strictEqual(config.getString("default"), "1");
    assert.strictEqual(config.getString("config"), "json");
    assert.strictEqual(config.getString("override"), "1");
  });

  it("handles default values of various types", () => {
    const config = new ConfigBuilder()
      .setDefault("str", "hello")
      .setDefault("num", 42)
      .setDefault("bool", true)
      .setDefault("nested", { foo: "bar" })
      .build();

    assert.strictEqual(config.getString("str"), "hello");
    assert.strictEqual(config.getInt("num"), 42);
    assert.strictEqual(config.getBool("bool"), true);
    assert.deepStrictEqual(config.getTable("nested"), { foo: "bar" });
  });

  it("handles overrides and optional overrides", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("key", "initial");
    builder.setOverride("key", "overridden");
    builder.setOverrideOption("opt_key", "present");
    builder.setOverrideOption("none_key", null);

    const config = builder.build();
    assert.strictEqual(config.getString("key"), "overridden");
    assert.strictEqual(config.getString("opt_key"), "present");
    assert.throws(() => config.getString("none_key"));
  });

  it("supports addFile method", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("env", "test");
    // addFile adds file path source (will fail on build if required and missing, but without required flag or if exists)
    builder.addFile("non_existent_file", "json");
    const fileRef = File.withName("non_existent_file").required(false);
    const config = new ConfigBuilder()
      .setDefault("a", "b")
      .addSource(fileRef)
      .build();

    assert.strictEqual(config.getString("a"), "b");
  });

  it("supports buildCloned method", () => {
    const builder = Config.builder().setDefault("version", "1.0");

    const config1 = builder.buildCloned();
    const config2 = builder.buildCloned();

    assert.strictEqual(config1.getString("version"), "1.0");
    assert.strictEqual(config2.getString("version"), "1.0");
  });
});
