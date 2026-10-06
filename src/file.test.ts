import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

test("File.fromStr with format", () => {
  const file = File.fromStr('{"key": "val"}', FileFormat.Json);
  const config = Config.builder().addSource(file).build();
  expect(config.getString("key")).toBe("val");
});

test("File.withName and format/required chaining", () => {
  const file = File.withName("config/settings", FileFormat.Json);
  file.required(false);
  file.format(FileFormat.Json);

  const config = Config.builder().addSource(file).build();
  expect(config.getString("setting")).toBe("json_file_value");
});

test("new File constructor with FileFormat", () => {
  const file = new File("config/settings", FileFormat.Json);
  const config = Config.builder().addSource(file).build();
  expect(config.getString("setting")).toBe("json_file_value");
});

test("File.fromFilename", () => {
  const file = File.fromFilename("config/settings");
  file.required(false);
  const config = Config.builder().addSource(file).build();
  expect(config.getString("setting")).toBe("json_file_value");
});
