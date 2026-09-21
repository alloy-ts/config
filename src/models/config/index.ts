import {
  configGroupPreferences,
  configGroups,
  ConfigObject,
  Configs,
  defineConfig,
  defineConfigFor,
  defineConfigs,
  loadAppConfig,
} from "../../config.ts";

export * from "./std.ts";
export * from "./project.ts";
export * from "./org.ts";
export * from "./package.ts";
export * from "./tsconfig.ts";
export * from "./deno.ts";
export * from "./container-compose.ts";
export * from "./kube.ts";
export * from "./container.ts";

type AppConfig = Awaited<ReturnType<typeof loadAppConfig>>;
let _configs: AppConfig | undefined;
let _configsLoaded = false;
export async function getConfigs(): Promise<AppConfig> {
  if (!_configsLoaded) {
    _configs = Configs.parse(await loadAppConfig(configGroupPreferences));
    _configsLoaded = true;
  }
  return _configs;
}

export {
  configGroupPreferences,
  configGroups,
  ConfigObject,
  Configs,
  defineConfig,
  defineConfigFor,
  defineConfigs,
};
