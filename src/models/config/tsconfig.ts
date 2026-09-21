import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../define-config.ts";

/* -------------------------------------------------------------------------- */
/*                            Sub-schemas for TSConfig                       */
/* -------------------------------------------------------------------------- */

export const CompilerOptionsSchema = Schema.record(
  Schema.string(),
  Schema.unknown(),
);

export const BuildOptionsSchema = Schema.object({
  dry: Schema.boolean().nullable().optional(),
  force: Schema.boolean().nullable().optional(),
  verbose: Schema.boolean().nullable().optional(),
  incremental: Schema.boolean().nullable().optional(),
  assumeChangesOnlyAffectDirectDependencies: Schema.boolean().nullable()
    .optional(),
  traceResolution: Schema.boolean().nullable().optional(),
});

export const WatchOptionsSchema = Schema.object({
  force: Schema.string().nullable().optional(),
  watchFile: Schema.string().nullable().optional(),
  watchDirectory: Schema.string().nullable().optional(),
  fallbackPolling: Schema.string().nullable().optional(),
  synchronousWatchDirectory: Schema.boolean().nullable().optional(),
  excludeFiles: Schema.array(Schema.string()).nullable().optional(),
  excludeDirectories: Schema.array(Schema.string()).nullable().optional(),
});

export const TypeAcquisitionSchema = Schema.object({
  enable: Schema.boolean().nullable().optional(),
  include: Schema.array(Schema.string()).nullable().optional(),
  exclude: Schema.array(Schema.string()).nullable().optional(),
});

export const ReferenceSchema = Schema.object({
  path: Schema.string(),
});

/* -------------------------------------------------------------------------- */
/*                            TSConfig Main Schema                            */
/* -------------------------------------------------------------------------- */

export const TsconfigConfig = Schema.object({
  compilerOptions: CompilerOptionsSchema.optional(),
  compileOnSave: Schema.boolean().nullable().optional(),
  typeAcquisition: TypeAcquisitionSchema.nullable().optional(),
  extends: Schema.union([
    Schema.string(),
    Schema.array(Schema.string()),
  ]).optional(),
  watchOptions: WatchOptionsSchema.nullable().optional(),
  buildOptions: BuildOptionsSchema.optional(),
  "ts-node": Schema.record(Schema.string(), Schema.unknown()).nullable()
    .optional(),
  files: Schema.array(Schema.string()).nullable().optional(),
  exclude: Schema.array(Schema.string()).nullable().optional(),
  include: Schema.array(Schema.string()).nullable().optional(),
  references: Schema.array(ReferenceSchema).optional(),
}).register(configReg, {
  urn: "model:config.tsconfig",
  key: "tsconfig",
  title: "TypeScript Compiler Configuration",
  description: "JSON schema for the TypeScript compiler's configuration file.",
  grouping: ["ts", "tsconfig"],
  moduleUrl: import.meta.url,
});

export type Tsconfig = Schema.infer<typeof TsconfigConfig>;

/** Strongly-typed `defineTypeScriptConfig` for authoring tsconfig files. */
export const defineTypeScriptConfig = createDefineConfig(TsconfigConfig);
