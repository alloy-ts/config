import * as Schema from "zod";
import whichPkg from "which";
import { configReg } from "../registries.ts";
import { userInfo } from "node:os";

/* -------------------------------------------------------------------------- */
/*                                Defaults                                    */
/* -------------------------------------------------------------------------- */
  const {username,uid, gid, shell, homedir} = userInfo();

export const DEFAULT_SYSTEM_CONFIG_DIRS = ["/etc/defaults/", "/usr/local/etc/"];
export const DEFAULT_GLOBAL_CONFIG_DIRS = [`${homedir}/.config/` , `${homedir}/`];
console.log(DEFAULT_SYSTEM_CONFIG_DIRS, DEFAULT_GLOBAL_CONFIG_DIRS);
export const DEFAULT_CODEGEN = [
  { in: "package.config.ts", out: "package.json" },
  { in: "ts.config.ts", out: "tsconfig.json" },
  { in: "deno.config.ts", out: "deno.json" },
  { in: "container.config.ts", out: "container.config.json" },
  { in: "compose.config.ts", out: "compose.yml" },
];

/**
 * Resolve an executable to its absolute path in the system PATH, or fallback to the command name.
 */
export function which(cmd: string): string {
  try {
    return whichPkg.sync(cmd, { nothrow: true }) ?? cmd;
  } catch {
    return cmd;
  }
}

export const DEFAULT_CONTAINER_EXEC_PATHS = [
  which("container"),
  which("colima"),
  which("podman"),
  which("docker"),
];
export const DEFAULT_CONTAINER_EXEC_WHICH = DEFAULT_CONTAINER_EXEC_PATHS;

export const DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS = [
  which("container-compose"),
  which("podman-compose"),
  which("docker-compose"),
];
export const DEFAULT_CONTAINER_COMPOSE_WHICH =
  DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS;

export const DEFAULT_CONTAINER_AUTO_IMAGE_PULL = true;
export const DEFAULT_CONTAINER_COMPOSE_IMAGE_PULL = "prepull";

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

const CodegenMappingSchema = Schema.object({
  in: Schema.union([Schema.string(), Schema.array(Schema.string())]),
  out: Schema.string(),
  format: Schema.enum(["ts", "js", "json", "yaml"]).optional(),
});

export type CodegenMapping = Schema.infer<typeof CodegenMappingSchema>;

export const ConfigSectionSchema = Schema.object({
  systemDirs: Schema.array(Schema.string())
    .optional()
    .default(DEFAULT_SYSTEM_CONFIG_DIRS),
  globalDirs: Schema.array(Schema.string())
    .optional()
    .default(DEFAULT_GLOBAL_CONFIG_DIRS),
  codegen: Schema.array(CodegenMappingSchema)
    .optional()
    .default(DEFAULT_CODEGEN),
});

export type ConfigSection = Schema.infer<typeof ConfigSectionSchema>;

export const ImagePullSchema = Schema.union([
  Schema.enum(["prepull", "always", "missing", "never"]),
  Schema.boolean(),
  Schema.string(),
]);

export type ImagePull = Schema.infer<typeof ImagePullSchema>;

export const ContainerComposeSectionSchema = Schema.object({
  execPaths: Schema.array(Schema.string())
    .optional()
    .default(DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS),
  imagePull: ImagePullSchema
    .optional()
    .default(DEFAULT_CONTAINER_COMPOSE_IMAGE_PULL),
  autoImagePull: Schema.boolean().optional(),
});

export const ContainerSectionSchema = Schema.object({
  execPaths: Schema.array(Schema.string())
    .optional()
    .default(DEFAULT_CONTAINER_EXEC_PATHS),
  execWhich: Schema.array(Schema.string()).optional(),
  compose: ContainerComposeSectionSchema.optional().default({
    execPaths: DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS,
    imagePull: DEFAULT_CONTAINER_COMPOSE_IMAGE_PULL,
  }),
  composeWhich: Schema.array(Schema.string()).optional(),
  autoImagePull: Schema.boolean()
    .optional()
    .default(DEFAULT_CONTAINER_AUTO_IMAGE_PULL),
});

export type ContainerSection = Schema.infer<typeof ContainerSectionSchema>;

/* -------------------------------------------------------------------------- */
/*                                Config Schema                               */
/* -------------------------------------------------------------------------- */

export const ConfigConfig = Schema.object({

  config: ConfigSectionSchema.optional().default({
    systemDirs: DEFAULT_SYSTEM_CONFIG_DIRS,
    globalDirs: DEFAULT_GLOBAL_CONFIG_DIRS,
    codegen: DEFAULT_CODEGEN,
  }),
  container: ContainerSectionSchema.optional().default({
    execWhich: DEFAULT_CONTAINER_EXEC_WHICH,
    composeWhich: DEFAULT_CONTAINER_COMPOSE_WHICH,
    autoImagePull: DEFAULT_CONTAINER_AUTO_IMAGE_PULL,
  }),
}).register(configReg, {
  urn: "model:config.std",
  key: "std",
  title: "Standard module Configuration",
  description:
    "Standard module settings for global configuration merging and code generation.",
  grouping: ["alloy", "std"],
  moduleUrl: import.meta.url,
  examples: [{
      container:{ config: {
        globalDirs: DEFAULT_GLOBAL_CONFIG_DIRS,
        codegen: DEFAULT_CODEGEN,
      },
    },}
  ],
});

export type Config = Schema.infer<typeof ConfigConfig>;
