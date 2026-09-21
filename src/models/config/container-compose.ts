import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../define-config.ts";

/* -------------------------------------------------------------------------- */
/*                                Reusable Defs                               */
/* -------------------------------------------------------------------------- */

const ListOfStringsSchema = Schema.array(Schema.string());

const StringOrListSchema = Schema.union([
  Schema.string(),
  ListOfStringsSchema,
]);

const ListOrDictSchema = Schema.union([
  Schema.record(
    Schema.string(),
    Schema.union([
      Schema.string(),
      Schema.number(),
      Schema.boolean(),
      Schema.null(),
    ]),
  ),
  ListOfStringsSchema,
]);

const ExtraHostsSchema = Schema.union([
  Schema.record(
    Schema.string(),
    Schema.union([Schema.string(), Schema.array(Schema.string())]),
  ),
  ListOfStringsSchema,
]);

const CommandSchema = Schema.union([
  Schema.null(),
  Schema.string(),
  Schema.array(Schema.string()),
]).optional();

const ServiceHookSchema = Schema.object({
  command: CommandSchema,
  user: Schema.string().optional(),
  privileged: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  working_dir: Schema.string().optional(),
  environment: ListOrDictSchema.optional(),
});

const EnvFileSchema = Schema.union([
  Schema.string(),
  Schema.array(
    Schema.union([
      Schema.string(),
      Schema.object({
        path: Schema.string(),
        format: Schema.string().optional(),
        required: Schema.union([Schema.boolean(), Schema.string()]).optional()
          .default(true),
      }),
    ]),
  ),
]);

const LabelFileSchema = Schema.union([
  Schema.string(),
  Schema.array(Schema.string()),
]);

const BlkioLimitSchema = Schema.object({
  path: Schema.string().optional(),
  rate: Schema.union([Schema.number(), Schema.string()]).optional(),
});

const BlkioWeightSchema = Schema.object({
  path: Schema.string().optional(),
  weight: Schema.union([Schema.number(), Schema.string()]).optional(),
});

const ServiceConfigOrSecretSchema = Schema.array(
  Schema.union([
    Schema.string(),
    Schema.object({
      source: Schema.string().optional(),
      target: Schema.string().optional(),
      uid: Schema.string().optional(),
      gid: Schema.string().optional(),
      mode: Schema.union([Schema.number(), Schema.string()]).optional(),
    }),
  ]),
);

const UlimitsSchema = Schema.record(
  Schema.string(),
  Schema.union([
    Schema.union([Schema.number(), Schema.string()]),
    Schema.object({
      hard: Schema.union([Schema.number(), Schema.string()]),
      soft: Schema.union([Schema.number(), Schema.string()]),
    }),
  ]),
);

const HealthcheckSchema = Schema.object({
  disable: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  interval: Schema.string().optional(),
  retries: Schema.union([Schema.number(), Schema.string()]).optional(),
  test: Schema.union([Schema.string(), Schema.array(Schema.string())])
    .optional(),
  timeout: Schema.string().optional(),
  start_period: Schema.string().optional(),
  start_interval: Schema.string().optional(),
});

const GenericResourcesSchema = Schema.array(
  Schema.object({
    discrete_resource_spec: Schema.object({
      kind: Schema.string().optional(),
      value: Schema.union([Schema.number(), Schema.string()]).optional(),
    }).optional(),
  }),
);

const DevicesSchema = Schema.array(
  Schema.object({
    capabilities: ListOfStringsSchema,
    count: Schema.union([Schema.string(), Schema.number()]).optional(),
    device_ids: ListOfStringsSchema.optional(),
    driver: Schema.string().optional(),
    options: ListOrDictSchema.optional(),
  }),
);

const GpusSchema = Schema.union([
  Schema.enum(["all"]),
  Schema.array(
    Schema.object({
      capabilities: ListOfStringsSchema.optional(),
      count: Schema.union([Schema.string(), Schema.number()]).optional(),
      device_ids: ListOfStringsSchema.optional(),
      driver: Schema.string().optional(),
      options: ListOrDictSchema.optional(),
    }),
  ),
]);

const DeploymentSchema = Schema.union([
  Schema.null(),
  Schema.object({
    mode: Schema.string().optional(),
    endpoint_mode: Schema.string().optional(),
    replicas: Schema.union([Schema.number(), Schema.string()]).optional(),
    labels: ListOrDictSchema.optional(),
    rollback_config: Schema.object({
      parallelism: Schema.union([Schema.number(), Schema.string()]).optional(),
      delay: Schema.string().optional(),
      failure_action: Schema.string().optional(),
      monitor: Schema.string().optional(),
      max_failure_ratio: Schema.union([Schema.number(), Schema.string()])
        .optional(),
      order: Schema.enum(["start-first", "stop-first"]).optional(),
    }).optional(),
    update_config: Schema.object({
      parallelism: Schema.union([Schema.number(), Schema.string()]).optional(),
      delay: Schema.string().optional(),
      failure_action: Schema.string().optional(),
      monitor: Schema.string().optional(),
      max_failure_ratio: Schema.union([Schema.number(), Schema.string()])
        .optional(),
      order: Schema.enum(["start-first", "stop-first"]).optional(),
    }).optional(),
    resources: Schema.object({
      limits: Schema.object({
        cpus: Schema.union([Schema.number(), Schema.string()]).optional(),
        memory: Schema.string().optional(),
        pids: Schema.union([Schema.number(), Schema.string()]).optional(),
      }).optional(),
      reservations: Schema.object({
        cpus: Schema.union([Schema.number(), Schema.string()]).optional(),
        memory: Schema.string().optional(),
        generic_resources: GenericResourcesSchema.optional(),
        devices: DevicesSchema.optional(),
      }).optional(),
    }).optional(),
    restart_policy: Schema.object({
      condition: Schema.string().optional(),
      delay: Schema.string().optional(),
      max_attempts: Schema.union([Schema.number(), Schema.string()]).optional(),
      window: Schema.string().optional(),
    }).optional(),
    placement: Schema.object({
      constraints: Schema.array(Schema.string()).optional(),
      preferences: Schema.array(
        Schema.object({
          spread: Schema.string().optional(),
        }),
      ).optional(),
      max_replicas_per_node: Schema.union([Schema.number(), Schema.string()])
        .optional(),
    }).optional(),
  }),
]);

const DevelopmentWatchActionSchema = Schema.enum([
  "rebuild",
  "sync",
  "restart",
  "sync+restart",
  "sync+exec",
]);

const DevelopmentSchema = Schema.union([
  Schema.null(),
  Schema.object({
    watch: Schema.array(
      Schema.object({
        ignore: StringOrListSchema.optional(),
        include: StringOrListSchema.optional(),
        path: Schema.string(),
        action: DevelopmentWatchActionSchema,
        target: Schema.string().optional(),
        exec: ServiceHookSchema.optional(),
        initial_sync: Schema.boolean().optional(),
      }),
    ).optional(),
  }),
]);

/* -------------------------------------------------------------------------- */
/*                                Container Spec                              */
/* -------------------------------------------------------------------------- */

const ContainerSpecShape = {
  annotations: ListOrDictSchema.optional(),
  blkio_config: Schema.object({
    device_read_bps: Schema.array(BlkioLimitSchema).optional(),
    device_read_iops: Schema.array(BlkioLimitSchema).optional(),
    device_write_bps: Schema.array(BlkioLimitSchema).optional(),
    device_write_iops: Schema.array(BlkioLimitSchema).optional(),
    weight: Schema.union([Schema.number(), Schema.string()]).optional(),
    weight_device: Schema.array(BlkioWeightSchema).optional(),
  }).optional(),
  cap_add: ListOfStringsSchema.optional(),
  cap_drop: ListOfStringsSchema.optional(),
  cgroup: Schema.enum(["host", "private"]).optional(),
  cgroup_parent: Schema.string().optional(),
  command: CommandSchema,
  configs: ServiceConfigOrSecretSchema.optional(),
  cpu_count: Schema.union([Schema.string(), Schema.number()]).optional(),
  cpu_percent: Schema.union([Schema.string(), Schema.number()]).optional(),
  cpu_shares: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpu_quota: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpu_period: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpu_rt_period: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpu_rt_runtime: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpus: Schema.union([Schema.number(), Schema.string()]).optional(),
  cpuset: Schema.string().optional(),
  credential_spec: Schema.object({
    config: Schema.string().optional(),
    file: Schema.string().optional(),
    registry: Schema.string().optional(),
  }).optional(),
  device_cgroup_rules: ListOfStringsSchema.optional(),
  devices: Schema.array(
    Schema.union([
      Schema.string(),
      Schema.object({
        source: Schema.string(),
        target: Schema.string().optional(),
        permissions: Schema.string().optional(),
      }),
    ]),
  ).optional(),
  dns: StringOrListSchema.optional(),
  dns_opt: ListOfStringsSchema.optional(),
  dns_search: StringOrListSchema.optional(),
  domainname: Schema.string().optional(),
  entrypoint: CommandSchema,
  env_file: EnvFileSchema.optional(),
  label_file: LabelFileSchema.optional(),
  environment: ListOrDictSchema.optional(),
  extra_hosts: ExtraHostsSchema.optional(),
  gpus: GpusSchema.optional(),
  group_add: Schema.array(Schema.union([Schema.string(), Schema.number()]))
    .optional(),
  hostname: Schema.string().optional(),
  image: Schema.string().optional(),
  init: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  ipc: Schema.string().optional(),
  isolation: Schema.string().optional(),
  labels: ListOrDictSchema.optional(),
  logging: Schema.object({
    driver: Schema.string().optional(),
    options: Schema.record(
      Schema.string(),
      Schema.union([Schema.string(), Schema.number(), Schema.null()]),
    ).optional(),
  }).optional(),
  mac_address: Schema.string().optional(),
  mem_limit: Schema.union([Schema.number(), Schema.string()]).optional(),
  mem_reservation: Schema.union([Schema.string(), Schema.number()]).optional(),
  mem_swappiness: Schema.union([Schema.number(), Schema.string()]).optional(),
  memswap_limit: Schema.union([Schema.number(), Schema.string()]).optional(),
  network_mode: Schema.string().optional(),
  models: Schema.union([
    ListOfStringsSchema,
    Schema.record(
      Schema.string(),
      Schema.union([
        Schema.null(),
        Schema.object({
          endpoint_var: Schema.string().optional(),
          model_var: Schema.string().optional(),
        }),
      ]),
    ),
  ]).optional(),
  networks: Schema.union([
    ListOfStringsSchema,
    Schema.record(
      Schema.string(),
      Schema.union([
        Schema.null(),
        Schema.object({
          aliases: ListOfStringsSchema.optional(),
          interface_name: Schema.string().optional(),
          ipv4_address: Schema.string().optional(),
          ipv6_address: Schema.string().optional(),
          link_local_ips: ListOfStringsSchema.optional(),
          mac_address: Schema.string().optional(),
          driver_opts: Schema.record(
            Schema.string(),
            Schema.union([Schema.string(), Schema.number()]),
          ).optional(),
          priority: Schema.number().optional(),
          gw_priority: Schema.number().optional(),
        }),
      ]),
    ),
  ]).optional(),
  oom_kill_disable: Schema.union([Schema.boolean(), Schema.string()])
    .optional(),
  oom_score_adj: Schema.union([Schema.string(), Schema.number()]).optional(),
  pid: Schema.union([Schema.string(), Schema.null()]).optional(),
  pids_limit: Schema.union([Schema.number(), Schema.string()]).optional(),
  platform: Schema.string().optional(),
  privileged: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  pull_policy: Schema.string().optional(),
  pull_refresh_after: Schema.string().optional(),
  read_only: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  runtime: Schema.string().optional(),
  security_opt: ListOfStringsSchema.optional(),
  shm_size: Schema.union([Schema.number(), Schema.string()]).optional(),
  secrets: ServiceConfigOrSecretSchema.optional(),
  sysctls: ListOrDictSchema.optional(),
  stop_grace_period: Schema.string().optional(),
  stop_signal: Schema.string().optional(),
  storage_opt: Schema.record(Schema.string(), Schema.unknown()).optional(),
  tmpfs: StringOrListSchema.optional(),
  ulimits: UlimitsSchema.optional(),
  use_api_socket: Schema.boolean().optional(),
  user: Schema.string().optional(),
  uts: Schema.string().optional(),
  userns_mode: Schema.string().optional(),
  volumes: Schema.array(
    Schema.union([
      Schema.string(),
      Schema.object({
        type: Schema.enum([
          "bind",
          "volume",
          "tmpfs",
          "cluster",
          "npipe",
          "image",
        ]),
        source: Schema.string().optional(),
        target: Schema.string().optional(),
        read_only: Schema.union([Schema.boolean(), Schema.string()]).optional(),
        consistency: Schema.string().optional(),
        bind: Schema.object({
          propagation: Schema.string().optional(),
          create_host_path: Schema.union([Schema.boolean(), Schema.string()])
            .optional(),
          recursive: Schema.enum([
            "enabled",
            "disabled",
            "writable",
            "readonly",
          ]).optional(),
          selinux: Schema.enum(["z", "Z"]).optional(),
        }).optional(),
        volume: Schema.object({
          labels: ListOrDictSchema.optional(),
          nocopy: Schema.union([Schema.boolean(), Schema.string()]).optional(),
          subpath: Schema.string().optional(),
        }).optional(),
        tmpfs: Schema.object({
          size: Schema.union([Schema.number(), Schema.string()]).optional(),
          mode: Schema.union([Schema.number(), Schema.string()]).optional(),
        }).optional(),
        image: Schema.object({
          subpath: Schema.string().optional(),
        }).optional(),
      }),
    ]),
  ).optional(),
  volumes_from: ListOfStringsSchema.optional(),
  working_dir: Schema.string().optional(),
};

/* -------------------------------------------------------------------------- */
/*                                Workload Spec                               */
/* -------------------------------------------------------------------------- */

const WorkloadSpecShape = {
  build: Schema.union([
    Schema.string(),
    Schema.object({
      context: Schema.string().optional(),
      dockerfile: Schema.string().optional(),
      dockerfile_inline: Schema.string().optional(),
      entitlements: Schema.array(Schema.string()).optional(),
      args: ListOrDictSchema.optional(),
      ssh: ListOrDictSchema.optional(),
      labels: ListOrDictSchema.optional(),
      cache_from: Schema.array(Schema.string()).optional(),
      cache_to: Schema.array(Schema.string()).optional(),
      no_cache: Schema.union([Schema.boolean(), Schema.string()]).optional(),
      no_cache_filter: StringOrListSchema.optional(),
      additional_contexts: ListOrDictSchema.optional(),
      network: Schema.string().optional(),
      provenance: Schema.union([Schema.string(), Schema.boolean()]).optional(),
      sbom: Schema.union([Schema.string(), Schema.boolean()]).optional(),
      pull: Schema.union([Schema.boolean(), Schema.string()]).optional(),
      target: Schema.string().optional(),
      shm_size: Schema.union([Schema.number(), Schema.string()]).optional(),
      extra_hosts: ExtraHostsSchema.optional(),
      isolation: Schema.string().optional(),
      privileged: Schema.union([Schema.boolean(), Schema.string()]).optional(),
      secrets: ServiceConfigOrSecretSchema.optional(),
      tags: Schema.array(Schema.string()).optional(),
      ulimits: UlimitsSchema.optional(),
      platforms: Schema.array(Schema.string()).optional(),
    }),
  ]).optional(),
  depends_on: Schema.union([
    ListOfStringsSchema,
    Schema.record(
      Schema.string(),
      Schema.object({
        restart: Schema.union([Schema.boolean(), Schema.string()]).optional(),
        required: Schema.boolean().optional().default(true),
        condition: Schema.enum([
          "service_started",
          "service_healthy",
          "service_completed_successfully",
        ]),
      }),
    ),
  ]).optional(),
  healthcheck: HealthcheckSchema.optional(),
  ports: Schema.array(
    Schema.union([
      Schema.number(),
      Schema.string(),
      Schema.object({
        name: Schema.string().optional(),
        mode: Schema.string().optional(),
        host_ip: Schema.string().optional(),
        target: Schema.union([Schema.number(), Schema.string()]).optional(),
        published: Schema.union([Schema.string(), Schema.number()]).optional(),
        protocol: Schema.string().optional(),
        app_protocol: Schema.string().optional(),
      }),
    ]),
  ).optional(),
  expose: Schema.array(Schema.union([Schema.string(), Schema.number()]))
    .optional(),
  stdin_open: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  tty: Schema.union([Schema.boolean(), Schema.string()]).optional(),
};

/* -------------------------------------------------------------------------- */
/*                                Service & Job                               */
/* -------------------------------------------------------------------------- */

const PreStartHookSchema = Schema.object({
  ...ContainerSpecShape,
  per_replica: Schema.union([Schema.boolean(), Schema.string()]).optional(),
});

export const ServiceSchema = Schema.object({
  ...ContainerSpecShape,
  ...WorkloadSpecShape,
  deploy: DeploymentSchema.optional(),
  develop: DevelopmentSchema.optional(),
  profiles: ListOfStringsSchema.optional(),
  restart: Schema.string().optional(),
  scale: Schema.union([Schema.number(), Schema.string()]).optional(),
  attach: Schema.union([Schema.boolean(), Schema.string()]).optional(),
  container_name: Schema.string().optional(),
  provider: Schema.object({
    type: Schema.string(),
    options: Schema.record(
      Schema.string(),
      Schema.union([
        Schema.union([Schema.string(), Schema.number(), Schema.boolean()]),
        Schema.array(
          Schema.union([Schema.string(), Schema.number(), Schema.boolean()]),
        ),
      ]),
    ).optional(),
  }).optional(),
  extends: Schema.union([
    Schema.string(),
    Schema.object({
      service: Schema.string(),
      file: Schema.string().optional(),
    }),
  ]).optional(),
  links: ListOfStringsSchema.optional(),
  external_links: ListOfStringsSchema.optional(),
  pre_start: Schema.array(PreStartHookSchema).optional(),
  post_start: Schema.array(ServiceHookSchema).optional(),
  pre_stop: Schema.array(ServiceHookSchema).optional(),
});

const ScheduleTriggerSchema = Schema.object({
  cron: Schema.string(),
  timezone: Schema.string().optional(),
  concurrency: Schema.enum(["forbid", "queue"]).optional(),
  missed_fires: Schema.enum(["one", "skip"]).optional(),
});

export const JobSchema = Schema.object({
  ...ContainerSpecShape,
  ...WorkloadSpecShape,
  profiles: ListOfStringsSchema.optional(),
  triggers: Schema.object({
    manual: Schema.union([Schema.boolean(), Schema.string()]).optional(),
    schedule: Schema.array(
      Schema.union([Schema.string(), ScheduleTriggerSchema]),
    ).optional(),
  }),
});

/* -------------------------------------------------------------------------- */
/*                       Networks, Volumes, Secrets, Configs                  */
/* -------------------------------------------------------------------------- */

export const NetworkSchema = Schema.union([
  Schema.null(),
  Schema.object({
    name: Schema.string().optional(),
    driver: Schema.string().optional(),
    driver_opts: Schema.record(
      Schema.string(),
      Schema.union([Schema.string(), Schema.number()]),
    ).optional(),
    ipam: Schema.object({
      driver: Schema.string().optional(),
      config: Schema.array(
        Schema.object({
          subnet: Schema.string().optional(),
          ip_range: Schema.string().optional(),
          gateway: Schema.string().optional(),
          aux_addresses: Schema.record(Schema.string(), Schema.string())
            .optional(),
        }),
      ).optional(),
      options: Schema.record(Schema.string(), Schema.string()).optional(),
    }).optional(),
    external: Schema.union([
      Schema.boolean(),
      Schema.string(),
      Schema.object({
        name: Schema.string().optional(),
      }),
    ]).optional(),
    internal: Schema.union([Schema.boolean(), Schema.string()]).optional(),
    enable_ipv4: Schema.union([Schema.boolean(), Schema.string()]).optional(),
    enable_ipv6: Schema.union([Schema.boolean(), Schema.string()]).optional(),
    attachable: Schema.union([Schema.boolean(), Schema.string()]).optional(),
    labels: ListOrDictSchema.optional(),
  }),
]);

export const VolumeSchema = Schema.union([
  Schema.null(),
  Schema.object({
    name: Schema.string().optional(),
    driver: Schema.string().optional(),
    driver_opts: Schema.record(
      Schema.string(),
      Schema.union([Schema.string(), Schema.number()]),
    ).optional(),
    external: Schema.union([
      Schema.boolean(),
      Schema.string(),
      Schema.object({
        name: Schema.string().optional(),
      }),
    ]).optional(),
    labels: ListOrDictSchema.optional(),
  }),
]);

export const SecretSchema = Schema.object({
  name: Schema.string().optional(),
  environment: Schema.string().optional(),
  file: Schema.string().optional(),
  external: Schema.union([
    Schema.boolean(),
    Schema.string(),
    Schema.object({
      name: Schema.string().optional(),
    }),
  ]).optional(),
  labels: ListOrDictSchema.optional(),
  driver: Schema.string().optional(),
  driver_opts: Schema.record(
    Schema.string(),
    Schema.union([Schema.string(), Schema.number()]),
  ).optional(),
  template_driver: Schema.string().optional(),
});

export const ConfigItemSchema = Schema.object({
  name: Schema.string().optional(),
  content: Schema.string().optional(),
  environment: Schema.string().optional(),
  file: Schema.string().optional(),
  external: Schema.union([
    Schema.boolean(),
    Schema.string(),
    Schema.object({
      name: Schema.string().optional(),
    }),
  ]).optional(),
  labels: ListOrDictSchema.optional(),
  template_driver: Schema.string().optional(),
});

export const ModelSchema = Schema.object({
  name: Schema.string().optional(),
  model: Schema.string(),
  context_size: Schema.number().optional(),
  runtime_flags: Schema.array(Schema.string()).optional(),
});

export const IncludeSchema = Schema.union([
  Schema.string(),
  Schema.object({
    path: StringOrListSchema.optional(),
    env_file: StringOrListSchema.optional(),
    project_directory: Schema.string().optional(),
  }),
]);

/* -------------------------------------------------------------------------- */
/*                                Up Options                                  */
/* -------------------------------------------------------------------------- */

export const UpOptionsSchema = Schema.object({
  AbortOnContainerExit: Schema.boolean().optional(),
  abortOnContainerExit: Schema.boolean().optional(),
  Detach: Schema.boolean().optional().default(true),
  detach: Schema.boolean().optional().default(true),
  NoBuild: Schema.boolean().optional(),
  noBuild: Schema.boolean().optional(),
  NoColor: Schema.boolean().optional(),
  noColor: Schema.boolean().optional(),
  NoLogPrefix: Schema.boolean().optional(),
  noLogPrefix: Schema.boolean().optional(),
  ForceBuild: Schema.boolean().optional(),
  forceBuild: Schema.boolean().optional(),
  IPFS: Schema.boolean().optional(),
  ipfs: Schema.boolean().optional(),
  QuietPull: Schema.boolean().optional(),
  quietPull: Schema.boolean().optional(),
  RemoveOrphans: Schema.boolean().optional().default(true),
  removeOrphans: Schema.boolean().optional().default(true),
  ForceRecreate: Schema.boolean().optional(),
  forceRecreate: Schema.boolean().optional(),
  NoRecreate: Schema.boolean().optional(),
  noRecreate: Schema.boolean().optional(),
  Scale: Schema.record(Schema.string(), Schema.number()).optional(),
  scale: Schema.record(Schema.string(), Schema.number()).optional(),
  Pull: Schema.string().optional(),
  pull: Schema.string().optional(),
});

export type UpOptions = Schema.infer<typeof UpOptionsSchema>;

/* -------------------------------------------------------------------------- */
/*                            Main Compose Schema                             */
/* -------------------------------------------------------------------------- */

export const ContainerComposeConfig = Schema.object({
  version: Schema.string().optional(),
  Name: Schema.string().optional(),
  name: Schema.string().optional(),
  WorkingDir: Schema.string().optional(),
  working_dir: Schema.string().optional(),
  workingDir: Schema.string().optional(),
  Environment: ListOrDictSchema.optional(),
  environment: ListOrDictSchema.optional(),
  include: Schema.array(IncludeSchema).optional(),
  Services: Schema.record(Schema.string(), ServiceSchema).optional(),
  services: Schema.record(Schema.string(), ServiceSchema).optional(),
  models: Schema.record(Schema.string(), ModelSchema).optional(),
  Networks: Schema.record(Schema.string(), NetworkSchema).optional(),
  networks: Schema.record(Schema.string(), NetworkSchema).optional(),
  Volumes: Schema.record(Schema.string(), VolumeSchema).optional(),
  volumes: Schema.record(Schema.string(), VolumeSchema).optional(),
  Secrets: Schema.record(Schema.string(), SecretSchema).optional(),
  secrets: Schema.record(Schema.string(), SecretSchema).optional(),
  Configs: Schema.record(Schema.string(), ConfigItemSchema).optional(),
  configs: Schema.record(Schema.string(), ConfigItemSchema).optional(),
  jobs: Schema.record(Schema.string(), JobSchema).optional(),
}).register(configReg, {
  urn: "model:container-compose",
  key: "container-compose",
  title: "Container Compose Specification",
  description:
    "Compose file specification defining multi-container applications.",
  grouping: ["container-compose", "compose"],
  moduleUrl: import.meta.url,
});

export type ContainerCompose = Schema.infer<typeof ContainerComposeConfig>;

/**
 * Typed `defineContainerCompose` helper for authoring compose configurations.
 */
export const defineContainerCompose = createDefineConfig(
  ContainerComposeConfig.partial(),
);

/** Fine-grained authoring helper for container services. */
export const defineContainerService = createDefineConfig(
  ServiceSchema.partial(),
);

/** Fine-grained authoring helper for container networks. */
export const defineContainerNetwork = createDefineConfig(NetworkSchema);

/** Fine-grained authoring helper for container volumes. */
export const defineContainerVolume = createDefineConfig(VolumeSchema);

/** Fine-grained authoring helper for container configs. */
export const defineContainerConfig = createDefineConfig(
  ConfigItemSchema.partial(),
);

/** Fine-grained authoring helper for container secrets. */
export const defineContainerSecret = createDefineConfig(SecretSchema.partial());
