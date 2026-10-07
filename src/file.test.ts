import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

describe("File NAPI bindings (file.rs)", () => {
  it("supports creating File using constructor and Config.File alias", () => {
    const f1 = new Config.File("config/settings", Config.File.Format.Json);
    assert.ok(f1);

    const f2 = new File("config/settings", FileFormat.Json);
    assert.ok(f2);
  });

  it("supports Config.File.from_str and fromStr", () => {
    const f1 = Config.File.from_str('{"a": "1"}', Config.File.Format.Json);
    const cfg1 = Config.builder().addSource(f1).build();
    assert.strictEqual(cfg1.getString("a"), "1");

    const f2 = Config.File.fromStr('{"b": "2"}', FileFormat.Json);
    const cfg2 = Config.builder().addSource(f2).build();
    assert.strictEqual(cfg2.getString("b"), "2");
  });

  it("supports Config.File.with_name and withName", () => {
    const f1 = Config.File.with_name("non_existent_file");
    f1.required(false);
    assert.ok(f1);

    const f2 = Config.File.withName("non_existent_file");
    f2.required(false);
    assert.ok(f2);
  });

  it("supports format and required chainable methods", () => {
    const f = Config.File.from_str('{"x": 100}', Config.File.Format.Json);
    f.format(Config.File.Format.Json).required(true);

    const cfg = Config.builder().addSource(f).build();
    assert.strictEqual(cfg.getInt("x"), 100);
  });
});
