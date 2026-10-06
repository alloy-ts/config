import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, ConfigBuilder, File, FileFormat } from "../dist/index.js";

describe("File module and NAPI bindings (src/file.rs)", () => {
  it("creates File from string with File.fromStr and uses it in ConfigBuilder", () => {
    const jsonStr = JSON.stringify({
      server: { host: "127.0.0.1", port: 8080 },
      enabled: true,
    });
    const fileSource = File.fromStr(jsonStr, FileFormat.Json);

    const config = new ConfigBuilder().addSource(fileSource).build();

    assert.strictEqual(config.getString("server.host"), "127.0.0.1");
    assert.strictEqual(config.getInt("server.port"), 8080);
    assert.strictEqual(config.getBool("enabled"), true);
  });

  it("supports Config.builder() factory returning builder", () => {
    const builder = Config.builder();
    builder.setDefault("key", "val");
    const config = builder.build();
    assert.strictEqual(config.getString("key"), "val");
  });

  it("supports File constructor (new File(name, format))", () => {
    const file = new File("config/settings", FileFormat.Json);
    assert.ok(file instanceof File);
  });

  it("supports File.withName(baseName)", () => {
    const file = File.withName("config/settings");
    assert.ok(file instanceof File);
  });

  it("supports format and required chainable builder methods on File", () => {
    const jsonStr = JSON.stringify({ key: "value" });
    const file = File.fromStr(jsonStr, FileFormat.Json);

    const chained = file.format(FileFormat.Json).required(true);
    assert.strictEqual(chained, file);

    const config = new ConfigBuilder().addSource(file).build();
    assert.strictEqual(config.getString("key"), "value");
  });

  it("supports optional non-existent file when required is set to false", () => {
    const optionalFile = new File("non_existent_file_path", FileFormat.Json);
    optionalFile.required(false);

    const config = new ConfigBuilder()
      .setDefault("fallback", "default_val")
      .addSource(optionalFile)
      .build();

    assert.strictEqual(config.getString("fallback"), "default_val");
  });
});
