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

/**
 * The loaded and validated application config.
 *
 * Each preference list in {@link configGroupPreferences} resolves the first
 * existing `<grouping>.config.{ts,js,json}` or `<grouping>.{ts,js,json}` file;
 * all resolved files are merged and then validated against the combined schema.
 */
const configs = Configs.parse(await loadAppConfig(configGroupPreferences));

export {
  configGroupPreferences,
  configGroups,
  ConfigObject,
  Configs,
  configs,
  defineConfig,
  defineConfigFor,
  defineConfigs,
};
