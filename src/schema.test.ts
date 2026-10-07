import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigSchema } from "../dist/index.js";

describe("ConfigSchema module tests", () => {
  it("ConfigSchema constructor and methods", () => {
    const schema = new ConfigSchema("app");
    schema.coerceSerdeEnums(true);
    schema.insert("db", "app.db");

    assert.strictEqual(schema.locate("app"), "app");
    assert.strictEqual(schema.locate("db"), "app.db");

    const prefixes = schema.prefixes();
    assert.ok(prefixes.includes("app"));
    assert.ok(prefixes.includes("db"));
  });
});
