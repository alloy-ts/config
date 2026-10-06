import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigBuilder } from "../dist/index.js";

describe("NAPI bindings", () => {
  it("ConfigBuilder and Config", () => {
    const builder = new ConfigBuilder();
    builder.setDefault("key", "value");
    builder.setDefault("num", 42);

    const config = builder.build();
    assert.strictEqual(config.getString("key"), "value");
    assert.strictEqual(config.getInt("num"), 42);
  });
});
