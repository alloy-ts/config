import assert from "node:assert";
import { Config, FileFormat } from "../src/main.ts";

// Examples demonstrating Config.File usage:

// Example 1: Creating file source using new Config.File(...) with enum format
const file1 = new Config.File("config/settings", Config.File.Format.Json);
assert.ok(file1);

// Example 2: Creating file source using static constructor and enum format
const fileSource = Config.File.from_str(
  JSON.stringify({ default: "default_from_file", appName: "exampleApp" }),
  Config.File.Format.Json,
);

// Example 3: Building configuration with default, file source, and override
const config = Config.builder()
  .setDefault("default", "1")
  .addSource(fileSource)
  .setOverride("override", "1")
  .build();

console.log("Config built successfully!");
console.log("default:", config.getString("default"));
console.log("appName:", config.getString("appName"));
console.log("override:", config.getString("override"));

assert.strictEqual(config.getString("default"), "default_from_file");
assert.strictEqual(config.getString("appName"), "exampleApp");
assert.strictEqual(config.getString("override"), "1");

// Example 4: Snake_case aliases as used in Rust naming conventions
const fileCamel = Config.File.fromStr(
  JSON.stringify({ key: "val" }),
  FileFormat.Json,
);
const configCamel = Config.builder().addSource(fileCamel).build();
assert.strictEqual(configCamel.getString("key"), "val");
