import * as Schema from "zod";
import { groupingsOf } from "./models/registries.ts";

/* -------------------------------------------------------------------------- */
/*                                Types & Helpers                             */
/* -------------------------------------------------------------------------- */

export type UserConfig<T extends Schema.ZodObject> = Schema.infer<T>;

export type UserConfigFn<T extends Schema.ZodObject> = (
  env: NodeJS.ProcessEnv,
) => UserConfig<T>;

export type UserConfigExport<T extends Schema.ZodObject> =
  | UserConfig<T>
  | UserConfig<T>[]
  | UserConfigFn<T>;

export type DefineConfig = ReturnType<typeof createDefineConfig>;

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
