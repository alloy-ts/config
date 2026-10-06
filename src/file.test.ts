import { expect, test } from "vite-plus/test";
import { Config, ConfigBuilder, File, FileFormat } from "../index.js";

test("File withName factory and format/required methods", () => {
  const file = File.withName("config/settings").format(FileFormat.Json).required(false);
  expect(file).toBeInstanceOf(File);
});

test("File fromStr factory", () => {
  const jsonStr = JSON.stringify({ app: { name: "alloy-test" } });
  const file = File.fromStr(jsonStr, FileFormat.Json);
  expect(file).toBeInstanceOf(File);

  const config = new ConfigBuilder().addSource(file).build();
  expect(config.getString("app.name")).toBe("alloy-test");
});

test("File constructor", () => {
  const file = new File("config/settings", FileFormat.Toml);
  expect(file).toBeInstanceOf(File);
});
