import * as Schema from "zod";
import { configReg } from "../registries.ts";

/* -------------------------------------------------------------------------- */
/*                                Defaults                                    */
/* -------------------------------------------------------------------------- */

export const DEFAULT_MERGE_WITH_GLOBAL = ["~/.config", "~"];

export const DEFAULT_CODEGEN = [
  { in: "package.config.ts", out: "package.json" },
  { in: "ts.config.ts", out: "tsconfig.json" },
  { in: "deno.config.ts", out: "deno.json" },
];

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

const CodegenMappingSchema = Schema.object({
  in: Schema.string(),
  out: Schema.string(),
});

export type CodegenMapping = Schema.infer<typeof CodegenMappingSchema>;

export const ConfigSectionSchema = Schema.object({
  mergeWithGlobal: Schema.array(Schema.string())
    .optional()
    .default(DEFAULT_MERGE_WITH_GLOBAL),
  codegen: Schema.array(CodegenMappingSchema)
    .optional()
    .default(DEFAULT_CODEGEN),
});

export type ConfigSection = Schema.infer<typeof ConfigSectionSchema>;

/* -------------------------------------------------------------------------- */
/*                                Config Schema                               */
/* -------------------------------------------------------------------------- */

export const ConfigConfig = Schema.object({
  config: ConfigSectionSchema.optional().default({
    mergeWithGlobal: DEFAULT_MERGE_WITH_GLOBAL,
    codegen: DEFAULT_CODEGEN,
  }),
}).register(configReg, {
  urn: "model:config.config",
  key: "config",
  title: "Standard Config Configuration",
  description: "Standard configuration settings for global configuration merging and code generation.",
  grouping: ["alloy", "std"],
  moduleUrl: import.meta.url,
  examples: [
    {
      config: {
        mergeWithGlobal: DEFAULT_MERGE_WITH_GLOBAL,
        codegen: DEFAULT_CODEGEN,
      },
    },
  ],
});

export type Config = Schema.infer<typeof ConfigConfig>;
