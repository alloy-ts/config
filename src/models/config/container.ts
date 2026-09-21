import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../config.ts";

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

export const ProcessUserSchema = Schema.union([
  Schema.string(),
  Schema.number(),
  Schema.object({
    uid: Schema.number().optional(),
    gid: Schema.number().optional(),
    user: Schema.string().optional(),
    group: Schema.string().optional(),
  }),
]);

export const ProcessRlimitSchema = Schema.object({
  type: Schema.string().optional(),
  soft: Schema.number().optional(),
  hard: Schema.number().optional(),
});

export const ProcessConfigurationSchema = Schema.object({
  executable: Schema.string(),
  arguments: Schema.array(Schema.string()).optional().default([]),
  environment: Schema.union([
    Schema.array(Schema.string()),
    Schema.record(Schema.string(), Schema.string()),
  ]).optional().default([]),
  workingDirectory: Schema.string().optional().default("/"),
  terminal: Schema.boolean().optional().default(false),
  user: ProcessUserSchema.optional().default({ uid: 0, gid: 0 }),
  supplementalGroups: Schema.array(Schema.number()).optional().default([]),
  rlimits: Schema.array(ProcessRlimitSchema).optional().default([]),
});

export type ProcessConfiguration = Schema.infer<
  typeof ProcessConfigurationSchema
>;

export const DNSConfigurationSchema = Schema.object({
  nameservers: Schema.array(Schema.string()).optional(),
  searches: Schema.array(Schema.string()).optional(),
  options: Schema.array(Schema.string()).optional(),
});

export const ResourcesSchema = Schema.object({
  cpu: Schema.union([Schema.number(), Schema.string()]).optional(),
  memory: Schema.union([Schema.number(), Schema.string()]).optional(),
  storage: Schema.union([Schema.number(), Schema.string()]).optional(),
});

export const ImageDescriptionSchema = Schema.union([
  Schema.string(),
  Schema.object({
    name: Schema.string(),
    tag: Schema.string().optional(),
    digest: Schema.string().optional(),
  }),
]);

export const FilesystemMountSchema = Schema.object({
  source: Schema.string(),
  destination: Schema.string(),
  options: Schema.array(Schema.string()).optional(),
  readonly: Schema.boolean().optional(),
});

export const PlatformSchema = Schema.object({
  os: Schema.string().optional(),
  architecture: Schema.string().optional(),
  variant: Schema.string().optional(),
});

/* -------------------------------------------------------------------------- */
/*                               OCI Runtime Spec                             */
/* -------------------------------------------------------------------------- */

export const OciHookItemSchema = Schema.object({
  path: Schema.string(),
  args: Schema.array(Schema.string()).optional(),
  env: Schema.array(Schema.string()).optional(),
  timeout: Schema.number().optional(),
});

export const OciHooksSchema = Schema.object({
  prestart: Schema.array(OciHookItemSchema).optional(),
  createRuntime: Schema.array(OciHookItemSchema).optional(),
  createContainer: Schema.array(OciHookItemSchema).optional(),
  startContainer: Schema.array(OciHookItemSchema).optional(),
  poststart: Schema.array(OciHookItemSchema).optional(),
  poststop: Schema.array(OciHookItemSchema).optional(),
});

export const OciRootSchema = Schema.object({
  path: Schema.string(),
  readonly: Schema.boolean().optional(),
});

export const OciMountSchema = Schema.object({
  destination: Schema.string(),
  source: Schema.string().optional(),
  type: Schema.string().optional(),
  options: Schema.array(Schema.string()).optional(),
});

export const OciProcessSchema = Schema.object({
  terminal: Schema.boolean().optional(),
  consoleSize: Schema.object({
    height: Schema.number(),
    width: Schema.number(),
  }).optional(),
  cwd: Schema.string(),
  env: Schema.array(Schema.string()).optional(),
  args: Schema.array(Schema.string()).optional(),
  commandLine: Schema.string().optional(),
  user: Schema.object({
    uid: Schema.number().optional(),
    gid: Schema.number().optional(),
    additionalGids: Schema.array(Schema.number()).optional(),
    username: Schema.string().optional(),
  }).optional(),
  rlimits: Schema.array(ProcessRlimitSchema).optional(),
  capabilities: Schema.record(Schema.string(), Schema.array(Schema.string()))
    .optional(),
  noNewPrivileges: Schema.boolean().optional(),
  apparmorProfile: Schema.string().optional(),
  oomScoreAdj: Schema.number().optional(),
  selinuxLabel: Schema.string().optional(),
});

export const LinuxNamespaceSchema = Schema.object({
  type: Schema.enum([
    "pid",
    "network",
    "mount",
    "ipc",
    "uts",
    "user",
    "cgroup",
    "time",
  ]),
  path: Schema.string().optional(),
});

export const LinuxIdMappingSchema = Schema.object({
  containerID: Schema.number(),
  hostID: Schema.number(),
  size: Schema.number(),
});

export const LinuxDeviceSchema = Schema.object({
  type: Schema.string(),
  path: Schema.string(),
  major: Schema.number().optional(),
  minor: Schema.number().optional(),
  fileMode: Schema.number().optional(),
  uid: Schema.number().optional(),
  gid: Schema.number().optional(),
});

export const LinuxResourcesSchema = Schema.object({
  memory: Schema.unknown().optional(),
  cpu: Schema.unknown().optional(),
  blockIO: Schema.unknown().optional(),
  hugepageLimits: Schema.unknown().optional(),
  network: Schema.unknown().optional(),
  pids: Schema.unknown().optional(),
  rdma: Schema.unknown().optional(),
  unified: Schema.unknown().optional(),
});

export const LinuxSeccompSchema = Schema.object({
  defaultAction: Schema.string(),
  defaultErrnoRet: Schema.number().optional(),
  architectures: Schema.array(Schema.string()).optional(),
  flags: Schema.array(Schema.string()).optional(),
  listenerPath: Schema.string().optional(),
  listenerMetadata: Schema.string().optional(),
  syscalls: Schema.array(Schema.unknown()).optional(),
});

export const LinuxConfigSchema = Schema.object({
  namespaces: Schema.array(LinuxNamespaceSchema).optional(),
  uidMappings: Schema.array(LinuxIdMappingSchema).optional(),
  gidMappings: Schema.array(LinuxIdMappingSchema).optional(),
  timeOffsets: Schema.record(Schema.string(), Schema.unknown()).optional(),
  devices: Schema.array(LinuxDeviceSchema).optional(),
  sysctl: Schema.record(Schema.string(), Schema.string()).optional(),
  cgroupsPath: Schema.string().optional(),
  resources: LinuxResourcesSchema.optional(),
  seccomp: LinuxSeccompSchema.optional(),
  rootfsPropagation: Schema.string().optional(),
  maskedPaths: Schema.array(Schema.string()).optional(),
  readonlyPaths: Schema.array(Schema.string()).optional(),
  mountLabel: Schema.string().optional(),
});

export const OciConfig = Schema.object({
  ociVersion: Schema.string().optional().default("1.0.1"),
  root: OciRootSchema.optional(),
  mounts: Schema.array(OciMountSchema).optional(),
  process: OciProcessSchema.optional(),
  hostname: Schema.string().optional(),
  domainname: Schema.string().optional(),
  hooks: OciHooksSchema.optional(),
  annotations: Schema.record(Schema.string(), Schema.string()).optional(),
  linux: LinuxConfigSchema.optional(),
  windows: Schema.unknown().optional(),
  solaris: Schema.unknown().optional(),
});

export type OciSpec = Schema.infer<typeof OciConfig>;

/** Strongly-typed `defineOciConfig` helper for authoring OCI config.json specs. */
export const defineOciConfig = createDefineConfig(OciConfig.partial());

/* -------------------------------------------------------------------------- */
/*                            Container Configuration                         */
/* -------------------------------------------------------------------------- */

export const ContainerConfigurationSchema = Schema.object({
  id: Schema.string().optional(),
  image: ImageDescriptionSchema.optional(),
  initProcess: ProcessConfigurationSchema.optional(),
  dns: DNSConfigurationSchema.optional(),
  hostname: Schema.string().optional(),
  labels: Schema.record(Schema.string(), Schema.string()).optional(),
  mounts: Schema.array(FilesystemMountSchema).optional(),
  networks: Schema.array(Schema.string()).optional(),
  platform: PlatformSchema.optional(),
  resources: ResourcesSchema.optional(),
  rosetta: Schema.boolean().optional(),
  runtimeHandler: Schema.string().optional(),
  sysctls: Schema.record(Schema.string(), Schema.string()).optional(),
});

export const ContainerConfig = ContainerConfigurationSchema.register(
  configReg,
  {
    urn: "model:config.container",
    key: "container",
    title: "Apple Container Configuration",
    description:
      "Configuration for Apple ContainerClient containers and processes.",
    grouping: ["container", ".container", "container/", ".container/"],
    moduleUrl: import.meta.url,
  },
);

export type Container = Schema.infer<typeof ContainerConfig>;

/** Strongly-typed `defineContainerConfiguration` for authoring a `container.config.ts` file. */
export const defineContainerConfiguration = createDefineConfig(
  ContainerConfig.partial(),
);
export const defineAppleContainerConfig = defineContainerConfiguration;
