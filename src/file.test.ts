import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

test("File.fromStr creating file source from JSON content", () => {
  const file = File.fromStr('{"key": "value"}', FileFormat.Json);
  const config = Config.builder().addSource(file).build();
  expect(config.getString("key")).toBe("value");
});

test("File constructor new File(name, format)", () => {
  const file = new File("non_existent_config.json", FileFormat.Json);
  expect(file).toBeDefined();
});

test("File.withName", () => {
  const file = File.withName("test_settings");
  expect(file).toBeDefined();
});
