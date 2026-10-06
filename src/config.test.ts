import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { Config, File } from "../dist/index.js";

describe("src/config.test.ts", () => {
  it("builds configuration and reads typed values", () => {
    const config = Config.builder()
      .setDefault("default", "1")
      .addSource(File.fromStr('{"settings": {"theme": "dark"}, "count": 10, "enabled": true}', "json"))
      .setOverride("override", "1")
      .build();

    assert.strictEqual(config.getString("default"), "1");
    assert.strictEqual(config.getString("override"), "1");
    assert.strictEqual(config.getInt("count"), 10);
    assert.strictEqual(config.getBool("enabled"), true);
    assert.deepStrictEqual(config.getTable("settings"), { theme: "dark" });
  });

  it("supports Config.tryFrom", () => {
    const config = Config.tryFrom({ key: "val" });
    assert.strictEqual(config.getString("key"), "val");
  });
});
