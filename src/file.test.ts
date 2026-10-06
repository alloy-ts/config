import { expect, test } from "vite-plus/test";
import { File } from "./main.ts";
import type { FileFormat } from "./main.ts";

test("File class constructors and methods", () => {
  const jsonFmt: FileFormat = "Json" as FileFormat;
  const tomlFmt: FileFormat = "Toml" as FileFormat;

  const f1 = new File("settings", jsonFmt);
  expect(f1).toBeDefined();

  const f2 = File.withName("config/settings");
  expect(f2).toBeDefined();

  f2.format(tomlFmt);
  f2.required(false);

  const f3 = File.fromStr('{"a": 1}', jsonFmt);
  expect(f3).toBeDefined();
});
