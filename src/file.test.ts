import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

describe("File class and NAPI bindings (src/file.rs)", () => {
  it("supports creating File via constructor and File.new", () => {
    const f1 = new File("config/settings", FileFormat.Json);
    assert.ok(f1);

    const f2 = File.new("config/settings", FileFormat.Json);
    assert.ok(f2);

    const f3 = new Config.File("config/settings", Config.File.Format.Json);
    assert.ok(f3);
  });

  it("supports File.fromStr and File.from_str with string or enum format", () => {
    const content = JSON.stringify({ key: "value", port: 8080 });

    const f1 = File.fromStr(content, FileFormat.Json);
    const cfg1 = Config.builder().addSource(f1).build();
    assert.strictEqual(cfg1.getString("key"), "value");
    assert.strictEqual(cfg1.getInt("port"), 8080);

    const f2 = File.from_str(content, "json" as any);
    const cfg2 = Config.builder().addSource(f2).build();
    assert.strictEqual(cfg2.getString("key"), "value");
  });

  it("supports File.withName and File.with_name", () => {
    const f1 = File.withName("config/non_existent_settings");
    f1.required(false);
    assert.ok(f1);

    const f2 = File.with_name("config/non_existent_settings");
    f2.required(false);
    assert.ok(f2);
  });

  it("supports chaining format and required on File instances", () => {
    const f = File.fromStr('{"a": 1}', FileFormat.Json);
    f.format(FileFormat.Json).required(true);

    const cfg = Config.builder().addSource(f).build();
    assert.strictEqual(cfg.getInt("a"), 1);
  });
});
