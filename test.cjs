const assert = require("node:assert");
const { Config, ConfigBuilder, File, Environment, Value } = require("./index.js");

assert.strictEqual(typeof Config, "function");
assert.strictEqual(typeof ConfigBuilder, "function");
assert.strictEqual(typeof File, "function");
assert.strictEqual(typeof Environment, "function");
assert.strictEqual(typeof Value, "function");

const config = Config.builder().setDefault("test", "cjs_working").build();

assert.strictEqual(config.getString("test"), "cjs_working");
console.log("CommonJS test passed!");
