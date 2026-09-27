import { expect, test } from "vite-plus/test";
import { cli, parseCliArgs } from "./cli.ts";
import { Config } from "./config.ts";

// Import npmPackage schema registration
import "./config/npm-package.ts";

test("parseCliArgs parses commands, flags, and positional arguments", () => {
  const parsed1 = parseCliArgs(["get", "--scope=local", "npmPackage.name"]);
  expect(parsed1.command).toBe("get");
  expect(parsed1.scope).toBe("local");
  expect(parsed1.key).toBe("npmPackage.name");

  const parsed2 = parseCliArgs(["set", "--scope", "user", "npmPackage.name", "my-pkg"]);
  expect(parsed2.command).toBe("set");
  expect(parsed2.scope).toBe("user");
  expect(parsed2.key).toBe("npmPackage.name");
  expect(parsed2.value).toBe("my-pkg");

  const parsed3 = parseCliArgs(["set", "-s", "system", "npmPackage.name", "system-pkg"]);
  expect(parsed3.command).toBe("set");
  expect(parsed3.scope).toBe("system");
});

test("cli 'get' and 'set' commands execute successfully", () => {
  // Set value using CLI
  cli(["set", "--scope=user", "npmPackage.name", "cli-user-pkg"]);
  expect(Config.get("npmPackage.name", "user")).toBe("cli-user-pkg");

  // Get value using CLI
  const val = cli(["get", "--scope=user", "npmPackage.name"]);
  expect(val).toBe("cli-user-pkg");
});

test("cli throws error on missing key or unknown command", () => {
  expect(() => cli(["get"])).toThrow(/Missing required argument/);
  expect(() => cli(["set", "npmPackage.name"])).toThrow(/Missing required arguments/);
  expect(() => cli(["invalidCommand"])).toThrow(/Unknown or missing command/);
});
