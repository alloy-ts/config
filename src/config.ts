import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import * as Schema from "zod";
import { groupingsOf } from "./models/registries.ts";
import { AppKeyConfig } from "./models/config/app-key.ts";
import { AppNameConfig } from "./models/config/app-name.ts";
import { DatabaseUrlConfig } from "./models/config/database-url.ts";

/* -------------------------------------------------------------------------- */
/*                                Types & Helpers                             */
/* -------------------------------------------------------------------------- */

/**
 * Inferred configuration value (Zod output) for a given object schema.
 */
export type UserConfig<T extends Schema.ZodObject> = Schema.infer<T>;

/**
 * A factory that produces a configuration value, e.g. for env-driven configs.
 */
export type UserConfigFn<T extends Schema.ZodObject> = (
  env: NodeJS.ProcessEnv,
) => UserConfig<T>;

/**
 * Union of everything a {@link defineConfig} call can accept.
 */
export type UserConfigExport<T extends Schema.ZodObject> =
  | UserConfig<T>
  | UserConfig<T>[]
  | UserConfigFn<T>;

/**
 * A schema-bound `defineConfig` helper, as produced by
 * {@link createDefineConfig} / {@link createDefineConfigs}.
 */
export type DefineConfig = ReturnType<typeof createDefineConfig>;

/* -------------------------------------------------------------------------- */
/*                            Authoring & Discovery                           */
/* -------------------------------------------------------------------------- */

/**
 * Build a schema-bound `defineConfig` helper.
 *
 * The returned `defineConfig` validates object/array literals eagerly
 * against `schema`, and passes function factories through untouched (they
 * are validated lazily when invoked).
 */
export function createDefineConfig<T extends Schema.ZodObject>(schema: T) {
  function defineConfig(options: UserConfig<T>): UserConfig<T>;
  function defineConfig(options: UserConfig<T>[]): UserConfig<T>[];
  function defineConfig(options: UserConfigFn<T>): UserConfigFn<T>;
  function defineConfig(options: UserConfigExport<T>): UserConfigExport<T>;
  function defineConfig(options: UserConfigExport<T>): UserConfigExport<T> {
    if (typeof options === "function") {
      return options;
    }
    if (Array.isArray(options)) {
      return schema.array().parse(options);
    }
    return schema.parse(options);
  }

  return defineConfig;
}

/**
 * Build one `defineConfig` helper per grouping from any set of config schemas.
 *
 * Groupings are read from the registry via {@link groupingsOf}, so callers
 * never hardcode grouping names. A schema registered under several groupings
 * (an ordered fallback list, e.g. `["database", "app"]`) contributes its fields
 * to each grouping — required under its primary (first) grouping, optional
 * under the rest, because those are only fallback file locations.
 */
export function createDefineConfigs(
  schemas: readonly Schema.ZodObject[],
): Map<string, DefineConfig> {
  const shapes = new Map<string, Record<string, Schema.ZodType>>();

  for (const schema of schemas) {
    const groupings = groupingsOf(schema) ?? [];
    const fields = Object.entries(schema.shape);

    groupings.forEach((grouping, index) => {
      const shape = shapes.get(grouping) ?? {};
      for (const [key, field] of fields) {
        shape[key] = index === 0 ? field : field.optional();
      }
      shapes.set(grouping, shape);
    });
  }

  return new Map(
    [...shapes].map(([grouping, shape]) => [
      grouping,
      createDefineConfig(Schema.object(shape)),
    ]),
  );
}

/**
 * Resolve a schema's registered grouping preference list, failing fast when it
 * is missing — the grouping is what names the config file to load.
 */
export function requireGroupings(
  schema: Schema.ZodObject,
): readonly string[] {
  const groupings = groupingsOf(schema);
  if (groupings === undefined || groupings.length === 0) {
    throw new Error(
      "Config schema is not registered with a `grouping`; register it so the " +
        "loader can locate `<grouping>.config.{ts,js,json}` or `<grouping>.{ts,js,json}`.",
    );
  }
  return groupings;
}

/**
 * Distinct ordered grouping-preference lists for any set of config schemas.
 *
 * Schemas are split per preference list with `Map.groupBy` (keyed by the
 * JSON-encoded list, since arrays can't be reliable Map keys) and decoded back
 * into arrays, e.g. `[["app"], ["database", "app"]]`.
 *
 * Feed the result to {@link loadAppConfig}, which walks each list in order and
 * uses the first grouping whose config file exists.
 */
export function configPreferences(
  schemas: readonly Schema.ZodObject[],
): string[][] {
  const groups = Map.groupBy(
    schemas,
    (schema) => JSON.stringify(requireGroupings(schema)),
  );
  return [...groups.keys()].map((key) => JSON.parse(key) as string[]);
}

/* -------------------------------------------------------------------------- */
/*                               File Resolution                              */
/* -------------------------------------------------------------------------- */

/**
 * Candidate filename suffixes and supported extensions, tried in order.
 * Candidates support both `.config` (e.g. `package.config.ts`) and without
 * `.config` (e.g. `package.ts`).
 */
const SUFFIXES = [".config", ""] as const;
const EXTENSIONS = [".ts", ".js", ".json"] as const;

/**
 * `ERR_MODULE_NOT_FOUND` is raised when the candidate file does not exist.
 * Only that case should trigger a fallback; genuine config/validation errors
 * must propagate.
 */
const isModuleNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: unknown }).code === "ERR_MODULE_NOT_FOUND";

/** A single resolved config file: which grouping it satisfied and its content. */
export interface LoadedConfigFile {
  /** The grouping that this file satisfied (the first existing one in a list). */
  grouping: string;
  /** The resolved file name, e.g. `app.config.ts` or `app.ts`. */
  file: string;
  /** The file's default-exported config object. */
  config: Record<string, unknown>;
}

/**
 * Resolve and load the config file for one grouping-preference list.
 *
 * Each list is a fallback chain: its groupings are tried in order and the first
 * one with an existing `<grouping>.config.*` or `<grouping>.*` file wins.
 * Returns `undefined` when no file exists for the list. Files are resolved relative to
 * the current working directory (the usual config convention) so loading keeps working
 * from bundled output.
 */
async function loadGroupingFile(
  preferenceList: readonly string[],
): Promise<LoadedConfigFile | undefined> {
  for (const grouping of preferenceList) {
    for (const suffix of SUFFIXES) {
      for (const ext of EXTENSIONS) {
        const file = `${grouping}${suffix}${ext}`;

        // Use a runtime-computed specifier so tooling/bundlers don't attempt to
        // resolve (and fail on) the optional fallbacks at build time.
        const specifier = pathToFileURL(resolve(process.cwd(), file)).href;

        try {
          const options = ext === ".json" ? { with: { type: "json" } } : undefined;
          const mod = (await import(specifier, options)) as { default?: unknown };
          if (mod.default === undefined) {
            throw new Error(`Config "${file}" must have a default export.`);
          }
          return { grouping, file, config: mod.default as Record<string, unknown> };
        } catch (error) {
          if (!isModuleNotFound(error)) {
            throw error;
          }
        }
      }
    }
  }

  return undefined;
}

/**
 * Load every grouping-preference list, returning the resolved file for each.
 *
 * A grouping file is imported at most once even when several lists fall back to
 * it, and a single file that satisfies multiple lists is reported only once.
 */
export async function loadConfigFiles(
  preferences: Iterable<readonly string[]>,
): Promise<LoadedConfigFile[]> {
  const cache = new Map<string, LoadedConfigFile | undefined>();
  const seen = new Set<string>();
  const out: LoadedConfigFile[] = [];

  for (const preferenceList of preferences) {
    const key = [...preferenceList].join(",");
    const loaded = cache.get(key);
    if (cache.has(key)) {
      if (loaded !== undefined && !seen.has(loaded.file)) {
        seen.add(loaded.file);
        out.push(loaded);
      }
      continue;
    }

    const resolved = await loadGroupingFile(preferenceList);
    cache.set(key, resolved);
    if (resolved !== undefined && !seen.has(resolved.file)) {
      seen.add(resolved.file);
      out.push(resolved);
    }
  }

  return out;
}

/**
 * Load and merge the application config for every grouping-preference list.
 *
 * Distinct lists therefore read from their own files (or fall back to a shared
 * one), and all resolved files are merged into a single object. Also populates
 * {@link defaultConfig}.
 */
export async function loadAppConfig(
  preferences: Iterable<readonly string[]>,
): Promise<Record<string, unknown>> {
  const files = await loadConfigFiles(preferences);

  if (files.length === 0) {
    const looked = [...preferences]
      .flatMap((list) =>
        list.flatMap((grouping) =>
          SUFFIXES.flatMap((suffix) =>
            EXTENSIONS.map((ext) => `${grouping}${suffix}${ext}`),
          ),
        ),
      )
      .join(", ");
    throw new Error(`Unable to load application config. Looked for: ${looked}`);
  }

  const merged: Record<string, unknown> = {};
  for (const { grouping, config } of files) {
    defaultConfig.set(grouping, "", config);
    // Populate groupValues
    defaultConfig.groupValues[grouping] = {
      ...defaultConfig.groupValues[grouping],
      ...config,
    };
    Object.assign(merged, config);
  }
  Object.assign(defaultConfig.values, merged);
  return merged;
}

/* -------------------------------------------------------------------------- */
/*                                Schema Registry                             */
/* -------------------------------------------------------------------------- */

/**
 * Every registered configuration schema.
 *
 * Single source of truth for both the combined schema and the set of groupings
 * used to locate config files, so adding a config module only requires adding
 * it here.
 */
export const configSchemas = [AppNameConfig, AppKeyConfig, DatabaseUrlConfig];

/**
 * Config schemas split into one entry per grouping-preference list via
 * {@link Map.groupBy}, keyed by the JSON-encoded list (arrays can't be reliable
 * Map keys). One entry is one resolution chain: the loader walks the groupings
 * in order and uses the first config file that exists.
 */
export const configGroups = Map.groupBy(
  configSchemas,
  (schema) => JSON.stringify(requireGroupings(schema)),
);

if (configGroups.size === 0) {
  throw new Error(
    "No config grouping registered; register config schemas with a `grouping` " +
      "so the loader can locate `<grouping>.config.{ts,js,json}` or `<grouping>.{ts,js,json}`.",
  );
}

/**
 * Distinct ordered grouping preferences, e.g. `[["app"], ["database", "app"]]`.
 */
export const configGroupPreferences = configPreferences(configSchemas);

/**
 * Per-grouping `defineConfig` helpers, generated from the registered groupings
 * (nothing hardcoded). Keyed by grouping, e.g. `defineConfigs.get("app")`.
 */
export const defineConfigs = createDefineConfigs(configSchemas);

/**
 * Get the runtime `defineConfig` helper bound to a grouping's composed schema.
 *
 * Throws when no config schema declares the grouping. Prefer {@link defineConfig}
 * for authoring, since the per-grouping helper's shape is only known at runtime.
 */
export function defineConfigFor(grouping: string): DefineConfig {
  const defineConfig = defineConfigs.get(grouping);
  if (defineConfig === undefined) {
    throw new Error(
      `No config schema registered for grouping "${grouping}".`,
    );
  }
  return defineConfig;
}

/**
 * Combined configuration schema (a plain {@link Schema.ZodObject}), used both
 * for parsing loaded config and for building the typed `defineConfig` helper.
 *
 * Kept free of any runtime dependency on the user's config file so that
 * `app.config.ts` can safely import `defineConfig` from here without creating
 * an import cycle.
 */
export const ConfigObject = Schema.object({
  ...AppNameConfig.shape,
  ...AppKeyConfig.shape,
  ...DatabaseUrlConfig.shape,
});

/**
 * Readonly view of the combined configuration schema. This is the strict schema
 * the merged config is validated against, so required keys must be supplied by
 * *some* grouping's config file.
 */
export const Configs = ConfigObject.readonly();

/**
 * Strongly-typed `defineConfig` for authoring a config file.
 *
 * Bound to {@link ConfigObject} with every field optional, so a single
 * `<grouping>.config.ts` or `<grouping>.ts` may declare just its own slice while
 * still being fully checked: known keys are validated, unknown keys are rejected,
 * and editors autocomplete them — no codegen needed.
 *
 * Completeness is then enforced once the loader merges every grouping's file
 * and parses the result against {@link Configs}.
 *
 * ```ts
 * import { defineConfig } from "./src/config.ts";
 * export default defineConfig({ appName: "My App" });
 * ```
 */
export const defineConfig = createDefineConfig(ConfigObject.partial());

/* -------------------------------------------------------------------------- */
/*                               Config Interface                             */
/* -------------------------------------------------------------------------- */

/**
 * Configuration interface managing application settings, schema validation,
 * grouping preferences, and runtime configuration access/mutation.
 */
export interface Config {
  /** Flat record of all loaded and merged configuration key-value pairs. */
  values: Record<string, unknown>;

  /** Grouped record mapping group names to their respective key-value configuration pairs. */
  groupValues: Record<string, Record<string, unknown>>;

  /**
   * Get a configuration value by key, or by group and config key.
   *
   * @param key Config key name when single argument, or group name when keyInGroup provided.
   * @param keyInGroup Optional config key name when first argument is group name.
   */
  get<T = unknown>(key: string): T | undefined;
  get<T = unknown>(group: string, key: string): T | undefined;

  /**
   * Set a configuration value for a given group and config key.
   *
   * @param group The configuration group (e.g. "app", "database", "package").
   * @param key The configuration key.
   * @param value The value to set.
   */
  set<T = unknown>(group: string, key: string, value: T): void;

  /**
   * Load configurations from candidates based on grouping preferences.
   *
   * @param preferences Grouping preference lists.
   */
  load(preferences?: Iterable<readonly string[]>): Promise<Record<string, unknown>>;
}

/**
 * Default implementation of the {@link Config} interface.
 */
export class ConfigManager implements Config {
  public values: Record<string, unknown> = {};
  public groupValues: Record<string, Record<string, unknown>> = {};

  constructor(initialValues?: Record<string, unknown>, groupFiles?: LoadedConfigFile[]) {
    if (initialValues) {
      this.values = { ...initialValues };
    }
    if (groupFiles) {
      for (const { grouping, config } of groupFiles) {
        this.groupValues[grouping] = {
          ...this.groupValues[grouping],
          ...config,
        };
      }
    }
  }

  get<T = unknown>(groupOrKey: string, keyInGroup?: string): T | undefined {
    if (keyInGroup !== undefined) {
      const groupObj = this.groupValues[groupOrKey];
      if (groupObj && keyInGroup in groupObj) {
        return groupObj[keyInGroup] as T;
      }
      return this.values[keyInGroup] as T | undefined;
    }
    return this.values[groupOrKey] as T | undefined;
  }

  set<T = unknown>(group: string, key: string, value: T): void {
    if (!this.groupValues[group]) {
      this.groupValues[group] = {};
    }
    if (key !== "") {
      this.groupValues[group][key] = value;
      this.values[key] = value;
    }
  }

  async load(
    preferences: Iterable<readonly string[]> = configGroupPreferences,
  ): Promise<Record<string, unknown>> {
    const loaded = await loadAppConfig(preferences);
    return loaded;
  }
}

/** Global default configuration instance. */
export const defaultConfig: Config = new ConfigManager();

/**
 * Get a configuration value by key, or by group and config key.
 */
export function getConfig<T = unknown>(key: string): T | undefined;
export function getConfig<T = unknown>(group: string, key: string): T | undefined;
export function getConfig<T = unknown>(groupOrKey: string, keyInGroup?: string): T | undefined {
  return defaultConfig.get<T>(groupOrKey, keyInGroup!);
}

/**
 * Set a configuration value for a given group and config key.
 *
 * @param group The configuration group (e.g. "app", "database", "package").
 * @param key The configuration key.
 * @param value The value to set.
 */
export function setConfig<T = unknown>(group: string, key: string, value: T): void {
  defaultConfig.set(group, key, value);
}
