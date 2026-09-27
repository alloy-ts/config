import { expect, test } from "vite-plus/test";
import { Config, createDefineConfig } from "./config.ts";
import { npmPackageSchema } from "./config/npm-package.ts";
import * as Schema from "./schema.ts";

test("Config.createDefine works with groupId string and config group schema", () => {
  const defineConfigFromGroupId = Config.createDefine("config.npmPackage");
  const res1 = defineConfigFromGroupId({ name: "my-app", version: "1.0.0" });
  expect(res1.name).toBe("my-app");
  expect(res1.version).toBe("1.0.0");

  const defineConfigFromSchema = createDefineConfig(npmPackageSchema);
  const res2 = defineConfigFromSchema({ name: "my-lib" });
  expect(res2.name).toBe("my-lib");
});

test("new Config('npmPackage') instance get and set", () => {
  const npmConfig = new Config("npmPackage");
  expect(npmConfig.get("name")).toBe("@lib/module");

  npmConfig.set("name", "new-package-name");
  expect(npmConfig.get("name")).toBe("new-package-name");

  // Get full group config object
  const fullGroup = npmConfig.get();
  expect(fullGroup.name).toBe("new-package-name");
});

test("Global Config.get and Config.set with full URN, with and without config. prefix", () => {
  // Test with 'npmPackage.version'
  expect(Config.get("npmPackage.version")).toBe("0.0.0");

  // Test setting via 'config.npmPackage.version'
  Config.set("config.npmPackage.version", "1.2.3");
  expect(Config.get("config.npmPackage.version")).toBe("1.2.3");
  expect(Config.get("npmPackage:version")).toBe("1.2.3");
  expect(Config.get("urn:config.npmPackage:version")).toBe("1.2.3");

  // Test full group get
  const pkgGroup = Config.get("config.npmPackage");
  expect(pkgGroup.version).toBe("1.2.3");
});

test("Scope resolution and scope stores (local, user, system)", () => {
  // Register a custom test group
  const hostField = Schema.config(Schema.string()).meta({
    urn: "urn:config.appServer:host",
    key: "host",
    groupId: "app-server",
  });

  Schema.configGroup(
    Schema.object({
      host: hostField,
    }),
  ).meta({
    urn: "urn:config.appServer",
    id: "app-server",
  });

  const serverConfig = new Config("appServer");

  // Set values across scopes
  serverConfig.set("host", "system-host", "system");
  serverConfig.set("host", "user-host", "user");

  expect(serverConfig.get("host", "system")).toBe("system-host");
  expect(serverConfig.get("host", "user")).toBe("user-host");
  expect(serverConfig.get("host", "local")).toBeUndefined();

  // Without explicit scope, falls back user -> system (local is undefined)
  expect(serverConfig.get("host")).toBe("user-host");

  // Override in local scope
  serverConfig.set("host", "local-host", "local");
  expect(serverConfig.get("host", "local")).toBe("local-host");
  expect(serverConfig.get("host")).toBe("local-host");
});

test("Throws error when group or field key is not found", () => {
  expect(() => Config.get("nonexistentGroup.key")).toThrow(/could not be resolved|not found/);

  const npmConfig = new Config("npmPackage");
  expect(() => npmConfig.get("nonexistentField")).toThrow(/not found in config group/);
});
