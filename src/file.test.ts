import { expect, test } from "vite-plus/test";
import { File } from "../index.js";
import type { FileFormat } from "../index.js";

test("File instance creation and configuration", () => {
  const file1 = File.withName("config/settings");
  expect(file1).toBeDefined();

  const file2 = File.fromStr('{"a": 1}', 1 as FileFormat);
  expect(file2).toBeDefined();

  const file3 = new File("config/settings", 1 as FileFormat);
  file3.required(false).format(1 as FileFormat);
  expect(file3).toBeDefined();
});
