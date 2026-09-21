import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import {
  ConfigManager,
  defaultConfig,
  getConfig,
  setConfig,
  defineConfig,
  createDefineConfig,
  loadConfigFiles,
  configPreferences,
  requireGroupings,
} from "../src/config.ts";
import * as Schema from "zod";
import { configReg } from "../src/models/registries.ts";

describe("Config interface & set/get methods", () => {
  it("should set and get config values by key and by group + key", () => {
    setConfig("package", "name", "my-package");
    setConfig("package", "version", "1.0.0");

    assert.equal(getConfig("name"), "my-package");
    assert.equal(getConfig("version"), "1.0.0");
    assert.equal(getConfig("package", "name"), "my-package");
    assert.equal(getConfig("package", "version"), "1.0.0");
    assert.equal(getConfig("nonexistent"), undefined);
    assert.equal(getConfig("package", "nonexistent"), undefined);
  });

  it("should support independent ConfigManager instances", () => {
    const mgr = new ConfigManager({ initialKey: "initialVal" });
    assert.equal(mgr.get("initialKey"), "initialVal");

    mgr.set("database", "url", "sqlite://test.db");
    assert.equal(mgr.get("url"), "sqlite://test.db");
    assert.equal(mgr.get("database", "url"), "sqlite://test.db");
  });
});

describe("Candidate file resolution (with or without .config)", () => {
  it("should load candidate file with .config suffix (e.g. dummy.config.json)", async () => {
    const filePath = resolve(process.cwd(), "dummy1.config.json");
    writeFileSync(filePath, JSON.stringify({ foo: "bar1" }));
    try {
      const files = await loadConfigFiles([["dummy1"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy1");
      assert.equal(files[0].file, "dummy1.config.json");
      assert.deepEqual(files[0].config, { foo: "bar1" });
    } finally {
      unlinkSync(filePath);
    }
  });

  it("should load candidate file without .config suffix (e.g. dummy2.json)", async () => {
    const filePath = resolve(process.cwd(), "dummy2.json");
    writeFileSync(filePath, JSON.stringify({ foo: "bar2" }));
    try {
      const files = await loadConfigFiles([["dummy2"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy2");
      assert.equal(files[0].file, "dummy2.json");
      assert.deepEqual(files[0].config, { foo: "bar2" });
    } finally {
      unlinkSync(filePath);
    }
  });
});

describe("Authoring & Discovery", () => {
  it("should create defineConfig helpers and validate correct shapes", () => {
    const TestSchema = Schema.object({
      port: Schema.number(),
    });
    const defConfig = createDefineConfig(TestSchema);

    const result = defConfig({ port: 8080 });
    assert.deepEqual(result, { port: 8080 });

    assert.throws(() => {
      // @ts-expect-error invalid type
      defConfig({ port: "invalid" });
    });
  });

  it("should require registered grouping", () => {
    const UnregisteredSchema = Schema.object({ foo: Schema.string() });
    assert.throws(() => {
      requireGroupings(UnregisteredSchema);
    }, /Config schema is not registered with a `grouping`/);

    const RegisteredSchema = Schema.object({ bar: Schema.string() }).register(
      configReg,
      {
        urn: "test:registered",
        key: "bar",
        grouping: "testGroup",
      },
    );

    assert.deepEqual(requireGroupings(RegisteredSchema), ["testGroup"]);
  });

  it("should generate preferences for registered schemas", () => {
    const S1 = Schema.object({ k1: Schema.string() }).register(configReg, {
      urn: "test:s1",
      key: "k1",
      grouping: "pkg",
    });
    const S2 = Schema.object({ k2: Schema.number() }).register(configReg, {
      urn: "test:s2",
      key: "k2",
      grouping: ["db", "pkg"],
    });

    const prefs = configPreferences([S1, S2]);
    assert.deepEqual(prefs, [["pkg"], ["db", "pkg"]]);
  });
});
