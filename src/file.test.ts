import { expect, test } from "vite-plus/test";
import { Config, File, FileFormat } from "./main.ts";

test("File.from_str and File constructors", () => {
  const jsonContent = JSON.stringify({ name: "alloy", version: 1 });
  const file1 = File.from_str(jsonContent, FileFormat.Json);
  expect(file1).toBeDefined();

  const file2 = new File("config/settings", FileFormat.Json);
  expect(file2).toBeDefined();

  const file3 = Config.File.from_str(jsonContent, Config.File.Format.Json);
  expect(file3).toBeDefined();
});
