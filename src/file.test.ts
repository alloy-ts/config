import { expect, test } from "vite-plus/test";
import { Config, File, type FileFormat } from "./main.ts";

test("File.from_str creating file source from JSON content", () => {
  const file = File.from_str('{"key": "value"}', 1 as unknown as FileFormat);
  const config = Config.builder().add_source(file).build();
  expect(config.get_string("key")).toBe("value");
});

test("File constructor new File(name, format)", () => {
  const file = new File("non_existent_config.json", 1 as unknown as FileFormat);
  expect(file).toBeDefined();
});

test("File.with_name", () => {
  const file = File.with_name("test_settings");
  expect(file).toBeDefined();
});
