import { describe, expect, it } from "vitest";
import { Config, File, FileFormat } from "./main.ts";

describe("File configuration source", () => {
  it("creates File using new constructor and FileFormat", () => {
    const file = new File("config/settings", FileFormat.Json);
    expect(file).toBeDefined();
  });

  it("creates File using Config.File and Config.File.Format", () => {
    const file = new Config.File("config/settings", Config.File.Format.Json);
    expect(file).toBeDefined();
  });

  it("creates File from string", () => {
    const file = File.from_str('{"hello": "world"}', FileFormat.Json);
    expect(file).toBeDefined();
  });

  it("creates File with base name", () => {
    const file = File.with_name("config/settings");
    expect(file).toBeDefined();
  });

  it("modifies file attributes using format and required", () => {
    const file = File.with_name("config/settings");
    file.format(FileFormat.Json);
    file.required(false);
    expect(file).toBeDefined();
  });

  it("loads config settings from File source", () => {
    const config = Config.builder()
      .addSource(new Config.File("config/settings", Config.File.Format.Json))
      .build();

    expect(config.getString("key")).toBe("value_from_json_file");
  });
});
