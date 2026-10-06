const assert = require("node:assert");
const { test } = require("node:test");
const { Config, ConfigBuilder, File, Environment, Value, FileFormat } = require("./index.js");

test("CommonJS require and ConfigBuilder API", () => {
  const fileSource = File.fromStr('{"a": "hello"}', FileFormat.Json);
  const config = Config.builder().addSource(fileSource).build();
  assert.strictEqual(config.getString("a"), "hello");
});

test("CommonJS Value API", () => {
  const val = Value.new(42, "test");
  assert.strictEqual(val.intoInt(), 42);
});
