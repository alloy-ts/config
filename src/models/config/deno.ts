import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../config.ts";

/* -------------------------------------------------------------------------- */
/*                               Definitions                                  */
/* -------------------------------------------------------------------------- */

export const PermissionConfigValueSchema = Schema.union([
  Schema.boolean(),
  Schema.array(Schema.string()),
]);

export const AllowDenyIgnorePermissionConfigSchema = Schema.object({
  allow: PermissionConfigValueSchema.optional(),
  deny: PermissionConfigValueSchema.optional(),
  ignore: PermissionConfigValueSchema.optional(),
});

export const AllowDenyIgnorePermissionConfigValueSchema = Schema.union([
  PermissionConfigValueSchema,
  AllowDenyIgnorePermissionConfigSchema,
]);

export const AllowDenyPermissionConfigSchema = Schema.object({
  allow: PermissionConfigValueSchema.optional(),
  deny: PermissionConfigValueSchema.optional(),
});

export const AllowDenyPermissionConfigValueSchema = Schema.union([
  PermissionConfigValueSchema,
  AllowDenyPermissionConfigSchema,
]);

export const AllowScriptsListSchema = Schema.array(
  Schema.string().regex(/^(?:npm:).+/),
);

export const PermissionSetSchema = Schema.object({
  all: Schema.boolean().optional(),
  read: AllowDenyIgnorePermissionConfigValueSchema.optional(),
  write: AllowDenyPermissionConfigValueSchema.optional(),
  import: AllowDenyPermissionConfigValueSchema.optional(),
  env: AllowDenyIgnorePermissionConfigValueSchema.optional(),
  net: AllowDenyPermissionConfigValueSchema.optional(),
  run: AllowDenyPermissionConfigValueSchema.optional(),
  ffi: AllowDenyPermissionConfigValueSchema.optional(),
  sys: AllowDenyPermissionConfigValueSchema.optional(),
});

export const PermissionNameOrSetSchema = Schema.union([
  Schema.string(),
  PermissionSetSchema,
]);

export const MinimumDependencyAgeDateSchema = Schema.union([
  Schema.string(),
  Schema.number(),
]);

/* -------------------------------------------------------------------------- */
/*                               Deno Schema                                  */
/* -------------------------------------------------------------------------- */

export const DenoConfig = Schema.object({
  allowScripts: Schema.union([
    Schema.boolean(),
    AllowScriptsListSchema,
    Schema.object({
      allow: Schema.union([
        Schema.boolean(),
        AllowScriptsListSchema,
      ]).optional(),
      deny: AllowScriptsListSchema.optional(),
    }),
  ]).optional(),
  compile: Schema.object({
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
    permissions: PermissionNameOrSetSchema.optional(),
  }).optional(),
  desktop: Schema.object({
    app: Schema.object({
      name: Schema.string().optional(),
      identifier: Schema.string().optional(),
      icons: Schema.object({
        macos: Schema.string().optional(),
        windows: Schema.string().optional(),
        linux: Schema.string().optional(),
      }).optional(),
      deepLinks: Schema.array(Schema.string()).optional(),
    }).optional(),
    backend: Schema.enum(["webview", "cef"]).optional(),
    output: Schema.object({
      macos: Schema.string().optional(),
      windows: Schema.string().optional(),
      linux: Schema.string().optional(),
    }).optional(),
    release: Schema.object({
      baseUrl: Schema.string().optional(),
    }).optional(),
  }).optional(),
  compilerOptions: Schema.object({
    allowJs: Schema.boolean().optional(),
    allowUnreachableCode: Schema.boolean().optional(),
    allowUnusedLabels: Schema.boolean().optional(),
    checkJs: Schema.boolean().optional(),
    emitDecoratorMetadata: Schema.boolean().optional(),
    erasableSyntaxOnly: Schema.boolean().nullable().optional(),
    exactOptionalPropertyTypes: Schema.boolean().optional(),
    experimentalDecorators: Schema.boolean().optional(),
    isolatedDeclarations: Schema.boolean().optional(),
    jsx: Schema.enum([
      "preserve",
      "react",
      "react-jsx",
      "react-jsxdev",
      "react-native",
      "precompile",
    ]).optional(),
    jsxFactory: Schema.string().optional(),
    jsxFragmentFactory: Schema.string().optional(),
    jsxImportSource: Schema.string().optional(),
    jsxImportSourceTypes: Schema.string().optional(),
    jsxPrecompileSkipElements: Schema.array(Schema.string()).optional(),
    lib: Schema.array(Schema.string()).optional(),
    module: Schema.string().nullable().optional(),
    moduleResolution: Schema.string().nullable().optional(),
    noErrorTruncation: Schema.boolean().optional(),
    noFallthroughCasesInSwitch: Schema.boolean().optional(),
    noImplicitAny: Schema.boolean().optional(),
    noImplicitOverride: Schema.boolean().optional(),
    noImplicitReturns: Schema.boolean().optional(),
    noImplicitThis: Schema.boolean().optional(),
    noPropertyAccessFromIndexSignature: Schema.boolean().optional(),
    noUncheckedIndexedAccess: Schema.boolean().optional(),
    noUnusedLocals: Schema.boolean().optional(),
    noUnusedParameters: Schema.boolean().optional(),
    baseUrl: Schema.string().nullable().optional(),
    paths: Schema.record(
      Schema.string(),
      Schema.array(Schema.string().nullable()).nullable(),
    ).nullable().optional(),
    rootDirs: Schema.array(Schema.string()).optional(),
    skipLibCheck: Schema.boolean().optional(),
    strict: Schema.boolean().optional(),
    strictBindCallApply: Schema.boolean().optional(),
    strictBuiltinIteratorReturn: Schema.boolean().optional(),
    strictFunctionTypes: Schema.boolean().optional(),
    strictNullChecks: Schema.boolean().optional(),
    strictPropertyInitialization: Schema.boolean().optional(),
    types: Schema.array(Schema.string()).optional(),
    useUnknownInCatchVariables: Schema.boolean().optional(),
    verbatimModuleSyntax: Schema.boolean().optional(),
  }).optional(),
  deploy: Schema.object({
    org: Schema.string().optional(),
    app: Schema.string().optional(),
    framework: Schema.string().optional(),
    install: Schema.string().optional(),
    build: Schema.string().optional(),
    predeploy: Schema.string().optional(),
    runtime: Schema.object({
      mode: Schema.enum(["dynamic", "static"]).optional(),
      entrypoint: Schema.string().optional(),
      args: Schema.array(Schema.string()).optional(),
      cwd: Schema.string().optional(),
      spa: Schema.boolean().optional(),
    }).optional(),
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
  }).optional(),
  importMap: Schema.string().optional(),
  catalog: Schema.record(Schema.string(), Schema.string()).optional(),
  catalogs: Schema.record(
    Schema.string(),
    Schema.record(Schema.string(), Schema.string()),
  ).optional(),
  imports: Schema.record(Schema.string(), Schema.string()).optional(),
  scopes: Schema.record(
    Schema.string(),
    Schema.record(Schema.string(), Schema.string()),
  ).optional(),
  exclude: Schema.array(Schema.string()).optional(),
  lint: Schema.object({
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
    plugins: Schema.array(Schema.string()).optional(),
    rules: Schema.object({
      tags: Schema.array(Schema.string()).optional(),
      exclude: Schema.array(Schema.string()).optional(),
      include: Schema.array(Schema.string()).optional(),
    }).optional(),
    report: Schema.enum(["pretty", "json", "compact"]).optional(),
  }).optional(),
  fmt: Schema.object({
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
    useTabs: Schema.boolean().optional(),
    lineWidth: Schema.number().optional(),
    indentWidth: Schema.number().optional(),
    singleQuote: Schema.boolean().optional(),
    proseWrap: Schema.enum(["always", "never", "preserve"]).optional(),
    semiColons: Schema.boolean().optional(),
    quoteProps: Schema.enum(["asNeeded", "consistent", "preserve"]).optional(),
    newLineKind: Schema.enum(["auto", "crlf", "lf", "system"]).optional(),
    useBraces: Schema.enum([
      "maintain",
      "whenNotSingleLine",
      "always",
      "preferNone",
    ]).optional(),
    bracePosition: Schema.enum([
      "maintain",
      "sameLine",
      "nextLine",
      "sameLineUnlessHanging",
    ]).optional(),
    singleBodyPosition: Schema.enum(["maintain", "sameLine", "nextLine"]).optional(),
    nextControlFlowPosition: Schema.enum([
      "maintain",
      "sameLine",
      "nextLine",
    ]).optional(),
    trailingCommas: Schema.enum(["never", "always", "onlyMultiLine"]).optional(),
    "json.trailingCommas": Schema.enum([
      "never",
      "always",
      "maintain",
      "jsonc",
    ]).optional(),
    operatorPosition: Schema.enum(["maintain", "sameLine", "nextLine"]).optional(),
    "jsx.bracketPosition": Schema.enum([
      "maintain",
      "sameLine",
      "nextLine",
    ]).optional(),
    "jsx.forceNewLinesSurroundingContent": Schema.boolean().optional(),
    "jsx.multiLineParens": Schema.enum(["never", "prefer", "always"]).optional(),
    "typeLiteral.separatorKind": Schema.enum(["comma", "semiColon"]).optional(),
    spaceAround: Schema.boolean().optional(),
    spaceSurroundingProperties: Schema.boolean().optional(),
    vueComponentCase: Schema.enum([
      "ignore",
      "pascal-case",
      "kebab-case",
    ]).optional(),
    angularNextControlFlowSameLine: Schema.boolean().optional(),
    sortNamedImports: Schema.enum([
      "maintain",
      "caseSensitive",
      "caseInsensitive",
    ]).optional(),
    sortNamedExports: Schema.enum([
      "maintain",
      "caseSensitive",
      "caseInsensitive",
    ]).optional(),
    useEditorConfig: Schema.boolean().optional(),
    options: Schema.object({
      useTabs: Schema.boolean().optional(),
      lineWidth: Schema.number().optional(),
      indentWidth: Schema.number().optional(),
      singleQuote: Schema.boolean().optional(),
      proseWrap: Schema.enum(["always", "never", "preserve"]).optional(),
      semiColons: Schema.boolean().optional(),
    }).optional(),
  }).optional(),
  minimumDependencyAge: Schema.union([
    MinimumDependencyAgeDateSchema,
    Schema.object({
      age: MinimumDependencyAgeDateSchema.optional(),
      exclude: Schema.array(
        Schema.string().regex(/^(?:npm:|jsr:).+/),
      ).optional(),
    }),
  ]).optional(),
  nodeModulesDir: Schema.union([
    Schema.enum(["auto", "manual", "none"]),
    Schema.boolean(),
  ]).optional(),
  vendor: Schema.boolean().optional(),
  jsrDepsInNodeModules: Schema.boolean().optional(),
  preferPackageJson: Schema.boolean().optional(),
  tasks: Schema.record(
    Schema.string(),
    Schema.union([
      Schema.string(),
      Schema.object({
        description: Schema.string().optional(),
        command: Schema.string().optional(),
        dependencies: Schema.array(Schema.string()).optional(),
        files: Schema.array(Schema.string()).optional(),
        output: Schema.array(Schema.string()).optional(),
        env: Schema.array(Schema.string()).optional(),
      }),
    ]),
  ).optional(),
  test: Schema.object({
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
    permissions: PermissionNameOrSetSchema.optional(),
    sanitizeOps: Schema.boolean().optional(),
    sanitizeResources: Schema.boolean().optional(),
  }).optional(),
  publish: Schema.union([
    Schema.object({
      include: Schema.array(Schema.string()).optional(),
      exclude: Schema.array(Schema.string()).optional(),
    }),
    Schema.literal(false),
  ]).optional(),
  bench: Schema.object({
    include: Schema.array(Schema.string()).optional(),
    exclude: Schema.array(Schema.string()).optional(),
    permissions: PermissionNameOrSetSchema.optional(),
  }).optional(),
  coverage: Schema.object({
    thresholds: Schema.object({
      lines: Schema.number().min(0).max(100).optional(),
      branches: Schema.number().min(0).max(100).optional(),
      functions: Schema.number().min(0).max(100).optional(),
    }).optional(),
  }).optional(),
  license: Schema.string().optional(),
  lock: Schema.union([
    Schema.string(),
    Schema.boolean(),
    Schema.object({
      path: Schema.string().optional(),
      frozen: Schema.boolean().optional(),
    }),
  ]).optional(),
  unstable: Schema.array(Schema.string()).optional(),
  name: Schema.string().optional(),
  version: Schema.string().optional(),
  exports: Schema.union([
    Schema.string(),
    Schema.record(Schema.string(), Schema.string()),
  ]).optional(),
  permissions: Schema.record(Schema.string(), PermissionSetSchema).optional(),
  patch: Schema.array(Schema.string()).optional(),
  links: Schema.array(Schema.string()).optional(),
  workspace: Schema.union([
    Schema.array(Schema.string()),
    Schema.object({
      members: Schema.array(Schema.string()).optional(),
    }),
  ]).optional(),
}).register(configReg, {
  urn: "model:config.deno",
  key: "deno",
  title: "Deno Configuration",
  description: "A JSON representation of a Deno configuration file.",
  grouping: "deno",
  moduleUrl: import.meta.url,
});

export type Deno = Schema.infer<typeof DenoConfig>;

/** Strongly-typed `defineDenoConfig` for authoring a `deno.config.ts` file. */
export const defineDenoConfig = createDefineConfig(DenoConfig);
