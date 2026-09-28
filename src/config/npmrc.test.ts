import { expect, test } from "vite-plus/test";
import { configFieldRegistry, configGroupRegistry } from "../registries.ts";
import {
  _authSchema,
  accessSchema,
  defaultNpmrcConfig,
  npmrcConfigs,
  npmrcSchema,
  npmrcValue,
} from "./npmrc.ts";
import { Config } from "../config.ts";

test("npmrcSchema parses default NPMRC configuration successfully", () => {
  expect(npmrcConfigs).toBeDefined();
  expect(npmrcValue).toBeDefined();
  expect(npmrcConfigs.access).toBe("public");
  expect(npmrcConfigs.registry).toBe("https://registry.npmjs.org/");
  expect(npmrcConfigs.audit).toBe(true);
});

test("npmrcSchema is registered on configGroupRegistry with resolveMap", () => {
  const meta = configGroupRegistry.get(npmrcSchema);
  expect(meta).toBeDefined();
  expect(meta?.urn).toBe("urn:config:npmrc");
  expect(meta?.id).toBe("npmrc");
  expect(meta?.resolveMap).toEqual({
    local: ".npmrc",
    user: "~/.npmrc",
  });
});

test("fields are registered on configFieldRegistry", () => {
  const authMeta = configFieldRegistry.get(_authSchema);
  expect(authMeta).toBeDefined();
  expect(authMeta?.urn).toBe("urn:config:npmrc._auth");
  expect(authMeta?.key).toBe("_auth");
  expect(authMeta?.groupId).toBe("npmrc");

  const accessMeta = configFieldRegistry.get(accessSchema);
  expect(accessMeta).toBeDefined();
  expect(accessMeta?.urn).toBe("urn:config:npmrc.access");
  expect(accessMeta?.key).toBe("access");
  expect(accessMeta?.groupId).toBe("npmrc");
});

test("npmrc config group can be retrieved and modified using Config class", () => {
  const npmrcConfig = new Config("npmrc");
  expect(npmrcConfig.get("registry")).toBe("https://registry.npmjs.org/");

  npmrcConfig.set("registry", "https://my-custom-registry.com/");
  expect(npmrcConfig.get("registry")).toBe("https://my-custom-registry.com/");

  Config.set("urn:config:npmrc.access", "restricted", "user");
  expect(Config.get("npmrc.access", "user")).toBe("restricted");
});

test("npmrcSchema validates partial overrides", () => {
  const customConfig = {
    ...defaultNpmrcConfig,
    access: "restricted",
    registry: "https://registry.enterprise.org/",
    saveDev: true,
  };

  const parsed = npmrcSchema.parse(customConfig);
  expect(parsed.access).toBe("restricted");
  expect(parsed.registry).toBe("https://registry.enterprise.org/");
});
