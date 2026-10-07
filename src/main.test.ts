import { expect, test } from "vite-plus/test";
import { Config } from "./main.ts";

test("main exports Config", () => {
  expect(Config).toBeDefined();
  expect(typeof Config.builder).toBe("function");
});
