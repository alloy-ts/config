import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../define-config.ts";

/* -------------------------------------------------------------------------- */
/*                               Definitions                                  */
/* -------------------------------------------------------------------------- */

export const PersonSchema = Schema.union([
  Schema.string(),
  Schema.object({
    name: Schema.string(),
    url: Schema.string().url().optional(),
    email: Schema.string().email().optional(),
  }),
]);

export const DependencySchema = Schema.record(Schema.string(), Schema.string());
export const DevDependencySchema = Schema.record(
  Schema.string(),
  Schema.string(),
);
export const OptionalDependencySchema = Schema.record(
  Schema.string(),
  Schema.string(),
);
export const PeerDependencySchema = Schema.record(
  Schema.string(),
  Schema.string(),
);

export const PeerDependencyMetaSchema = Schema.record(
  Schema.string(),
  Schema.object({
    optional: Schema.boolean().optional(),
  }).passthrough(),
);

export const LicenseEnum = Schema.enum([
  "AGPL-3.0-only",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BSL-1.0",
  "CC0-1.0",
  "CDDL-1.0",
  "CDDL-1.1",
  "EPL-1.0",
  "EPL-2.0",
  "GPL-2.0-only",
  "GPL-3.0-only",
  "ISC",
  "LGPL-2.0-only",
  "LGPL-2.1-only",
  "LGPL-2.1-or-later",
  "LGPL-3.0-only",
  "LGPL-3.0-or-later",
  "MIT",
  "MPL-2.0",
  "MS-PL",
  "UNLICENSED",
]);

export const LicenseSchema = Schema.union([Schema.string(), LicenseEnum]);

export const PackageExportsEntryPath = Schema.string()
  .regex(/^\.\//)
  .nullable();

export const PackageExportsEntryObject: Schema.ZodType<unknown> = Schema.lazy(
  () =>
    Schema.object({
      require: PackageExportsEntryOrFallback.optional(),
      import: PackageExportsEntryOrFallback.optional(),
      "module-sync": PackageExportsEntryOrFallback.optional(),
      node: PackageExportsEntryOrFallback.optional(),
      default: PackageExportsEntryOrFallback.optional(),
      types: PackageExportsEntryOrFallback.optional(),
    }).passthrough(),
);

export const PackageExportsEntry: Schema.ZodType<unknown> = Schema.lazy(() =>
  Schema.union([PackageExportsEntryPath, PackageExportsEntryObject])
);

export const PackageExportsFallback: Schema.ZodType<unknown> = Schema.lazy(() =>
  Schema.array(PackageExportsEntry)
);

export const PackageExportsEntryOrFallback: Schema.ZodType<unknown> = Schema
  .lazy(() => Schema.union([PackageExportsEntry, PackageExportsFallback]));

export const PackageImportsEntryPath = Schema.string().nullable();

export const PackageImportsEntryObject: Schema.ZodType<unknown> = Schema.lazy(
  () =>
    Schema.object({
      require: PackageImportsEntryOrFallback.optional(),
      import: PackageImportsEntryOrFallback.optional(),
      node: PackageImportsEntryOrFallback.optional(),
      default: PackageImportsEntryOrFallback.optional(),
      types: PackageImportsEntryOrFallback.optional(),
    }).passthrough(),
);

export const PackageImportsEntry: Schema.ZodType<unknown> = Schema.lazy(() =>
  Schema.union([PackageImportsEntryPath, PackageImportsEntryObject])
);

export const PackageImportsFallback: Schema.ZodType<unknown> = Schema.lazy(() =>
  Schema.array(PackageImportsEntry)
);

export const PackageImportsEntryOrFallback: Schema.ZodType<unknown> = Schema
  .lazy(() => Schema.union([PackageImportsEntry, PackageImportsFallback]));

export const FundingUrl = Schema.string().url();
export const FundingWay = Schema.object({
  url: FundingUrl,
  type: Schema.string().optional(),
});

export const FundingSchema = Schema.union([
  FundingUrl,
  FundingWay,
  Schema.array(Schema.union([FundingUrl, FundingWay])).min(1),
]);

export const DevEngineDependency = Schema.object({
  name: Schema.string(),
  version: Schema.string().optional(),
  onFail: Schema.enum(["ignore", "warn", "error", "download"]).optional(),
});

export const RuntimeEngineDependency = Schema.object({
  name: Schema.string(),
  version: Schema.string().optional(),
  onFail: Schema.enum(["ignore", "warn", "error", "download"]).optional(),
});

/* -------------------------------------------------------------------------- */
/*                             Package Config Schema                          */
/* -------------------------------------------------------------------------- */

export const PackageConfig = Schema.object({
  name: Schema.string().min(1).max(214).optional(),
  version: Schema.string().optional(),
  description: Schema.string().optional(),
  keywords: Schema.array(Schema.string()).optional(),
  homepage: Schema.string().optional(),
  bugs: Schema.union([
    Schema.string(),
    Schema.object({
      url: Schema.string().url().optional(),
      email: Schema.string().email().optional(),
    }),
  ]).optional(),
  license: LicenseSchema.optional(),
  licenses: Schema.array(
    Schema.object({
      type: LicenseSchema.optional(),
      url: Schema.string().url().optional(),
    }),
  ).optional(),
  author: PersonSchema.optional(),
  contributors: Schema.array(PersonSchema).optional(),
  maintainers: Schema.array(PersonSchema).optional(),
  files: Schema.array(Schema.string()).optional(),
  main: Schema.string().optional(),
  exports: Schema.union([
    PackageExportsEntryPath,
    Schema.record(Schema.string(), PackageExportsEntryOrFallback),
    PackageExportsEntryObject,
    PackageExportsFallback,
  ]).optional(),
  imports: Schema.record(Schema.string(), PackageImportsEntryOrFallback)
    .optional(),
  bin: Schema.union([
    Schema.string(),
    Schema.record(Schema.string(), Schema.string()),
  ]).optional(),
  type: Schema.enum(["commonjs", "module"]).optional().default("commonjs"),
  types: Schema.string().optional(),
  typings: Schema.string().optional(),
  typesVersions: Schema.record(
    Schema.string(),
    Schema.record(Schema.string(), Schema.array(Schema.string())),
  ).optional(),
  man: Schema.union([Schema.string(), Schema.array(Schema.string())])
    .optional(),
  directories: Schema.object({
    bin: Schema.string().optional(),
    doc: Schema.string().optional(),
    example: Schema.string().optional(),
    lib: Schema.string().optional(),
    man: Schema.string().optional(),
    test: Schema.string().optional(),
  }).optional(),
  repository: Schema.union([
    Schema.string(),
    Schema.object({
      type: Schema.string().optional(),
      url: Schema.string().optional(),
      directory: Schema.string().optional(),
    }),
  ]).optional(),
  funding: FundingSchema.optional(),
  scripts: Schema.record(Schema.string(), Schema.string()).optional(),
  config: Schema.record(Schema.string(), Schema.unknown()).optional(),
  dependencies: DependencySchema.optional(),
  devDependencies: DevDependencySchema.optional(),
  optionalDependencies: OptionalDependencySchema.optional(),
  peerDependencies: PeerDependencySchema.optional(),
  peerDependenciesMeta: PeerDependencyMetaSchema.optional(),
  bundleDependencies: Schema.union([
    Schema.array(Schema.string()),
    Schema.boolean(),
  ]).optional(),
  bundledDependencies: Schema.union([
    Schema.array(Schema.string()),
    Schema.boolean(),
  ]).optional(),
  resolutions: Schema.record(Schema.string(), Schema.unknown()).optional(),
  overrides: Schema.record(Schema.string(), Schema.unknown()).optional(),
  packageManager: Schema.string().optional(),
  engines: Schema.object({
    node: Schema.string().optional(),
    runtime: Schema.union([
      RuntimeEngineDependency,
      Schema.array(RuntimeEngineDependency),
    ]).optional(),
  })
    .catchall(Schema.string())
    .optional(),
  volta: Schema.object({
    extends: Schema.string().optional(),
  })
    .catchall(Schema.string())
    .optional(),
  engineStrict: Schema.boolean().optional(),
  os: Schema.array(Schema.string()).optional(),
  cpu: Schema.array(Schema.string()).optional(),
  devEngines: Schema.object({
    os: Schema.union([
      DevEngineDependency,
      Schema.array(DevEngineDependency),
    ]).optional(),
    cpu: Schema.union([
      DevEngineDependency,
      Schema.array(DevEngineDependency),
    ]).optional(),
    libc: Schema.union([
      DevEngineDependency,
      Schema.array(DevEngineDependency),
    ]).optional(),
    runtime: Schema.union([
      DevEngineDependency,
      Schema.array(DevEngineDependency),
    ]).optional(),
    packageManager: Schema.union([
      DevEngineDependency,
      Schema.array(DevEngineDependency),
    ]).optional(),
  }).optional(),
  preferGlobal: Schema.boolean().optional(),
  private: Schema.union([
    Schema.boolean(),
    Schema.enum(["false", "true"]),
  ]).optional(),
  publishConfig: Schema.object({
    access: Schema.enum(["public", "restricted"]).optional(),
    tag: Schema.string().optional(),
    registry: Schema.string().url().optional(),
    provenance: Schema.boolean().optional(),
    directory: Schema.string().optional(),
    linkDirectory: Schema.boolean().optional(),
    executableFiles: Schema.array(Schema.string()).optional(),
  })
    .passthrough()
    .optional(),
  dist: Schema.object({
    shasum: Schema.string().optional(),
    tarball: Schema.string().optional(),
  }).optional(),
  readme: Schema.string().optional(),
  module: Schema.string().optional(),
  esnext: Schema.union([
    Schema.string(),
    Schema.object({
      main: Schema.string().optional(),
      browser: Schema.string().optional(),
    }).catchall(Schema.string()),
  ]).optional(),
  workspaces: Schema.union([
    Schema.array(Schema.string()),
    Schema.object({
      packages: Schema.array(Schema.string()).optional(),
      nohoist: Schema.array(Schema.string()).optional(),
    }),
  ]).optional(),
  allowScripts: Schema.record(Schema.string(), Schema.boolean()).optional(),
  sideEffects: Schema.union([
    Schema.boolean(),
    Schema.array(Schema.string()),
  ]).optional(),
}).register(configReg, {
  urn: "model:config.package",
  key: "package",
  title: "Package Configuration",
  description: "NPM package.json manifest fields.",
  grouping: "package",
  moduleUrl: import.meta.url,
});

export type Package = Schema.infer<typeof PackageConfig>;

/** Strongly-typed `definePackageConfig` for authoring a `package.config.ts` file. */
export const definePackageConfig = createDefineConfig(PackageConfig);
