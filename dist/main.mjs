import console from "node:console";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import * as Schema from "zod";
import { registry } from "zod";
//#region src/models/registries.ts
/**
* Configuration registry.
* Configurations are key-value pairs within a {@link ZodObject}.
*/
const configReg = registry();
/**
* Ordered, de-duplicated groupings registered for a config schema.
*
* A single string is normalised to a one-element array so callers always deal
* with an ordered preference list.
*/
function groupingsOf(schema) {
	const grouping = configReg.get(schema)?.grouping;
	if (grouping === void 0) return;
	return typeof grouping === "string" ? [grouping] : [...new Set(grouping)];
}
//#endregion
//#region src/models/config/std.ts
const DEFAULT_MERGE_WITH_GLOBAL = ["~/.config", "~"];
const DEFAULT_CODEGEN = [
	{
		in: "package.config.ts",
		out: "package.json"
	},
	{
		in: "ts.config.ts",
		out: "tsconfig.json"
	},
	{
		in: "deno.config.ts",
		out: "deno.json"
	}
];
const CodegenMappingSchema = Schema.object({
	in: Schema.string(),
	out: Schema.string()
});
const ConfigSectionSchema = Schema.object({
	mergeWithGlobal: Schema.array(Schema.string()).optional().default(DEFAULT_MERGE_WITH_GLOBAL),
	codegen: Schema.array(CodegenMappingSchema).optional().default(DEFAULT_CODEGEN)
});
const ConfigConfig = Schema.object({ config: ConfigSectionSchema.optional().default({
	mergeWithGlobal: DEFAULT_MERGE_WITH_GLOBAL,
	codegen: DEFAULT_CODEGEN
}) }).register(configReg, {
	urn: "model:config.config",
	key: "config",
	title: "Standard Config Configuration",
	description: "Standard configuration settings for global configuration merging and code generation.",
	grouping: ["alloy", "std"],
	moduleUrl: import.meta.url,
	examples: [{ config: {
		mergeWithGlobal: DEFAULT_MERGE_WITH_GLOBAL,
		codegen: DEFAULT_CODEGEN
	} }]
});
//#endregion
//#region src/models/config/package.ts
const PersonSchema = Schema.union([Schema.string(), Schema.object({
	name: Schema.string(),
	url: Schema.string().url().optional(),
	email: Schema.string().email().optional()
})]);
const DependencySchema = Schema.record(Schema.string(), Schema.string());
const DevDependencySchema = Schema.record(Schema.string(), Schema.string());
const OptionalDependencySchema = Schema.record(Schema.string(), Schema.string());
const PeerDependencySchema = Schema.record(Schema.string(), Schema.string());
const PeerDependencyMetaSchema = Schema.record(Schema.string(), Schema.object({ optional: Schema.boolean().optional() }).passthrough());
const LicenseEnum = Schema.enum([
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
	"UNLICENSED"
]);
const LicenseSchema = Schema.union([Schema.string(), LicenseEnum]);
const PackageExportsEntryPath = Schema.string().regex(/^\.\//).nullable();
const PackageExportsEntryObject = Schema.lazy(() => Schema.object({
	require: PackageExportsEntryOrFallback.optional(),
	import: PackageExportsEntryOrFallback.optional(),
	"module-sync": PackageExportsEntryOrFallback.optional(),
	node: PackageExportsEntryOrFallback.optional(),
	default: PackageExportsEntryOrFallback.optional(),
	types: PackageExportsEntryOrFallback.optional()
}).passthrough());
const PackageExportsEntry = Schema.lazy(() => Schema.union([PackageExportsEntryPath, PackageExportsEntryObject]));
const PackageExportsFallback = Schema.lazy(() => Schema.array(PackageExportsEntry));
const PackageExportsEntryOrFallback = Schema.lazy(() => Schema.union([PackageExportsEntry, PackageExportsFallback]));
const PackageImportsEntryPath = Schema.string().nullable();
const PackageImportsEntryObject = Schema.lazy(() => Schema.object({
	require: PackageImportsEntryOrFallback.optional(),
	import: PackageImportsEntryOrFallback.optional(),
	node: PackageImportsEntryOrFallback.optional(),
	default: PackageImportsEntryOrFallback.optional(),
	types: PackageImportsEntryOrFallback.optional()
}).passthrough());
const PackageImportsEntry = Schema.lazy(() => Schema.union([PackageImportsEntryPath, PackageImportsEntryObject]));
const PackageImportsFallback = Schema.lazy(() => Schema.array(PackageImportsEntry));
const PackageImportsEntryOrFallback = Schema.lazy(() => Schema.union([PackageImportsEntry, PackageImportsFallback]));
const FundingUrl = Schema.string().url();
const FundingWay = Schema.object({
	url: FundingUrl,
	type: Schema.string().optional()
});
const FundingSchema = Schema.union([
	FundingUrl,
	FundingWay,
	Schema.array(Schema.union([FundingUrl, FundingWay])).min(1)
]);
const DevEngineDependency = Schema.object({
	name: Schema.string(),
	version: Schema.string().optional(),
	onFail: Schema.enum([
		"ignore",
		"warn",
		"error",
		"download"
	]).optional()
});
const RuntimeEngineDependency = Schema.object({
	name: Schema.string(),
	version: Schema.string().optional(),
	onFail: Schema.enum([
		"ignore",
		"warn",
		"error",
		"download"
	]).optional()
});
const PackageConfig = Schema.object({
	name: Schema.string().min(1).max(214).optional(),
	version: Schema.string().optional(),
	description: Schema.string().optional(),
	keywords: Schema.array(Schema.string()).optional(),
	homepage: Schema.string().optional(),
	bugs: Schema.union([Schema.string(), Schema.object({
		url: Schema.string().url().optional(),
		email: Schema.string().email().optional()
	})]).optional(),
	license: LicenseSchema.optional(),
	licenses: Schema.array(Schema.object({
		type: LicenseSchema.optional(),
		url: Schema.string().url().optional()
	})).optional(),
	author: PersonSchema.optional(),
	contributors: Schema.array(PersonSchema).optional(),
	maintainers: Schema.array(PersonSchema).optional(),
	files: Schema.array(Schema.string()).optional(),
	main: Schema.string().optional(),
	exports: Schema.union([
		PackageExportsEntryPath,
		Schema.record(Schema.string(), PackageExportsEntryOrFallback),
		PackageExportsEntryObject,
		PackageExportsFallback
	]).optional(),
	imports: Schema.record(Schema.string(), PackageImportsEntryOrFallback).optional(),
	bin: Schema.union([Schema.string(), Schema.record(Schema.string(), Schema.string())]).optional(),
	type: Schema.enum(["commonjs", "module"]).optional().default("commonjs"),
	types: Schema.string().optional(),
	typings: Schema.string().optional(),
	typesVersions: Schema.record(Schema.string(), Schema.record(Schema.string(), Schema.array(Schema.string()))).optional(),
	man: Schema.union([Schema.string(), Schema.array(Schema.string())]).optional(),
	directories: Schema.object({
		bin: Schema.string().optional(),
		doc: Schema.string().optional(),
		example: Schema.string().optional(),
		lib: Schema.string().optional(),
		man: Schema.string().optional(),
		test: Schema.string().optional()
	}).optional(),
	repository: Schema.union([Schema.string(), Schema.object({
		type: Schema.string().optional(),
		url: Schema.string().optional(),
		directory: Schema.string().optional()
	})]).optional(),
	funding: FundingSchema.optional(),
	scripts: Schema.record(Schema.string(), Schema.string()).optional(),
	config: Schema.record(Schema.string(), Schema.unknown()).optional(),
	dependencies: DependencySchema.optional(),
	devDependencies: DevDependencySchema.optional(),
	optionalDependencies: OptionalDependencySchema.optional(),
	peerDependencies: PeerDependencySchema.optional(),
	peerDependenciesMeta: PeerDependencyMetaSchema.optional(),
	bundleDependencies: Schema.union([Schema.array(Schema.string()), Schema.boolean()]).optional(),
	bundledDependencies: Schema.union([Schema.array(Schema.string()), Schema.boolean()]).optional(),
	resolutions: Schema.record(Schema.string(), Schema.unknown()).optional(),
	overrides: Schema.record(Schema.string(), Schema.unknown()).optional(),
	packageManager: Schema.string().optional(),
	engines: Schema.object({
		node: Schema.string().optional(),
		runtime: Schema.union([RuntimeEngineDependency, Schema.array(RuntimeEngineDependency)]).optional()
	}).catchall(Schema.string()).optional(),
	volta: Schema.object({ extends: Schema.string().optional() }).catchall(Schema.string()).optional(),
	engineStrict: Schema.boolean().optional(),
	os: Schema.array(Schema.string()).optional(),
	cpu: Schema.array(Schema.string()).optional(),
	devEngines: Schema.object({
		os: Schema.union([DevEngineDependency, Schema.array(DevEngineDependency)]).optional(),
		cpu: Schema.union([DevEngineDependency, Schema.array(DevEngineDependency)]).optional(),
		libc: Schema.union([DevEngineDependency, Schema.array(DevEngineDependency)]).optional(),
		runtime: Schema.union([DevEngineDependency, Schema.array(DevEngineDependency)]).optional(),
		packageManager: Schema.union([DevEngineDependency, Schema.array(DevEngineDependency)]).optional()
	}).optional(),
	preferGlobal: Schema.boolean().optional(),
	private: Schema.union([Schema.boolean(), Schema.enum(["false", "true"])]).optional(),
	publishConfig: Schema.object({
		access: Schema.enum(["public", "restricted"]).optional(),
		tag: Schema.string().optional(),
		registry: Schema.string().url().optional(),
		provenance: Schema.boolean().optional(),
		directory: Schema.string().optional(),
		linkDirectory: Schema.boolean().optional(),
		executableFiles: Schema.array(Schema.string()).optional()
	}).passthrough().optional(),
	dist: Schema.object({
		shasum: Schema.string().optional(),
		tarball: Schema.string().optional()
	}).optional(),
	readme: Schema.string().optional(),
	module: Schema.string().optional(),
	esnext: Schema.union([Schema.string(), Schema.object({
		main: Schema.string().optional(),
		browser: Schema.string().optional()
	}).catchall(Schema.string())]).optional(),
	workspaces: Schema.union([Schema.array(Schema.string()), Schema.object({
		packages: Schema.array(Schema.string()).optional(),
		nohoist: Schema.array(Schema.string()).optional()
	})]).optional(),
	allowScripts: Schema.record(Schema.string(), Schema.boolean()).optional(),
	sideEffects: Schema.union([Schema.boolean(), Schema.array(Schema.string())]).optional()
}).register(configReg, {
	urn: "model:config.package",
	key: "package",
	title: "Package Configuration",
	description: "NPM package.json manifest fields.",
	grouping: "package",
	moduleUrl: import.meta.url
});
/** Strongly-typed `definePackageConfig` for authoring a `package.config.ts` file. */
const definePackageConfig = createDefineConfig(PackageConfig);
//#endregion
//#region src/models/config/tsconfig.ts
const CompilerOptionsSchema = Schema.record(Schema.string(), Schema.unknown());
const BuildOptionsSchema = Schema.object({
	dry: Schema.boolean().nullable().optional(),
	force: Schema.boolean().nullable().optional(),
	verbose: Schema.boolean().nullable().optional(),
	incremental: Schema.boolean().nullable().optional(),
	assumeChangesOnlyAffectDirectDependencies: Schema.boolean().nullable().optional(),
	traceResolution: Schema.boolean().nullable().optional()
});
const WatchOptionsSchema = Schema.object({
	force: Schema.string().nullable().optional(),
	watchFile: Schema.string().nullable().optional(),
	watchDirectory: Schema.string().nullable().optional(),
	fallbackPolling: Schema.string().nullable().optional(),
	synchronousWatchDirectory: Schema.boolean().nullable().optional(),
	excludeFiles: Schema.array(Schema.string()).nullable().optional(),
	excludeDirectories: Schema.array(Schema.string()).nullable().optional()
});
const TypeAcquisitionSchema = Schema.object({
	enable: Schema.boolean().nullable().optional(),
	include: Schema.array(Schema.string()).nullable().optional(),
	exclude: Schema.array(Schema.string()).nullable().optional()
});
const ReferenceSchema = Schema.object({ path: Schema.string() });
const TsconfigConfig = Schema.object({
	compilerOptions: CompilerOptionsSchema.optional(),
	compileOnSave: Schema.boolean().nullable().optional(),
	typeAcquisition: TypeAcquisitionSchema.nullable().optional(),
	extends: Schema.union([Schema.string(), Schema.array(Schema.string())]).optional(),
	watchOptions: WatchOptionsSchema.nullable().optional(),
	buildOptions: BuildOptionsSchema.optional(),
	"ts-node": Schema.record(Schema.string(), Schema.unknown()).nullable().optional(),
	files: Schema.array(Schema.string()).nullable().optional(),
	exclude: Schema.array(Schema.string()).nullable().optional(),
	include: Schema.array(Schema.string()).nullable().optional(),
	references: Schema.array(ReferenceSchema).optional()
}).register(configReg, {
	urn: "model:config.tsconfig",
	key: "tsconfig",
	title: "TypeScript Compiler Configuration",
	description: "JSON schema for the TypeScript compiler's configuration file.",
	grouping: ["ts", "tsconfig"],
	moduleUrl: import.meta.url
});
/** Strongly-typed `defineTypeScriptConfig` for authoring tsconfig files. */
const defineTypeScriptConfig = createDefineConfig(TsconfigConfig);
//#endregion
//#region src/models/config/deno.ts
const PermissionConfigValueSchema = Schema.union([Schema.boolean(), Schema.array(Schema.string())]);
const AllowDenyIgnorePermissionConfigSchema = Schema.object({
	allow: PermissionConfigValueSchema.optional(),
	deny: PermissionConfigValueSchema.optional(),
	ignore: PermissionConfigValueSchema.optional()
});
const AllowDenyIgnorePermissionConfigValueSchema = Schema.union([PermissionConfigValueSchema, AllowDenyIgnorePermissionConfigSchema]);
const AllowDenyPermissionConfigSchema = Schema.object({
	allow: PermissionConfigValueSchema.optional(),
	deny: PermissionConfigValueSchema.optional()
});
const AllowDenyPermissionConfigValueSchema = Schema.union([PermissionConfigValueSchema, AllowDenyPermissionConfigSchema]);
const AllowScriptsListSchema = Schema.array(Schema.string().regex(/^(?:npm:).+/));
const PermissionSetSchema = Schema.object({
	all: Schema.boolean().optional(),
	read: AllowDenyIgnorePermissionConfigValueSchema.optional(),
	write: AllowDenyPermissionConfigValueSchema.optional(),
	import: AllowDenyPermissionConfigValueSchema.optional(),
	env: AllowDenyIgnorePermissionConfigValueSchema.optional(),
	net: AllowDenyPermissionConfigValueSchema.optional(),
	run: AllowDenyPermissionConfigValueSchema.optional(),
	ffi: AllowDenyPermissionConfigValueSchema.optional(),
	sys: AllowDenyPermissionConfigValueSchema.optional()
});
const PermissionNameOrSetSchema = Schema.union([Schema.string(), PermissionSetSchema]);
const MinimumDependencyAgeDateSchema = Schema.union([Schema.string(), Schema.number()]);
const DenoConfig = Schema.object({
	allowScripts: Schema.union([
		Schema.boolean(),
		AllowScriptsListSchema,
		Schema.object({
			allow: Schema.union([Schema.boolean(), AllowScriptsListSchema]).optional(),
			deny: AllowScriptsListSchema.optional()
		})
	]).optional(),
	compile: Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional(),
		permissions: PermissionNameOrSetSchema.optional()
	}).optional(),
	desktop: Schema.object({
		app: Schema.object({
			name: Schema.string().optional(),
			identifier: Schema.string().optional(),
			icons: Schema.object({
				macos: Schema.string().optional(),
				windows: Schema.string().optional(),
				linux: Schema.string().optional()
			}).optional(),
			deepLinks: Schema.array(Schema.string()).optional()
		}).optional(),
		backend: Schema.enum(["webview", "cef"]).optional(),
		output: Schema.object({
			macos: Schema.string().optional(),
			windows: Schema.string().optional(),
			linux: Schema.string().optional()
		}).optional(),
		release: Schema.object({ baseUrl: Schema.string().optional() }).optional()
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
			"precompile"
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
		paths: Schema.record(Schema.string(), Schema.array(Schema.string().nullable()).nullable()).nullable().optional(),
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
		verbatimModuleSyntax: Schema.boolean().optional()
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
			spa: Schema.boolean().optional()
		}).optional(),
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional()
	}).optional(),
	importMap: Schema.string().optional(),
	catalog: Schema.record(Schema.string(), Schema.string()).optional(),
	catalogs: Schema.record(Schema.string(), Schema.record(Schema.string(), Schema.string())).optional(),
	imports: Schema.record(Schema.string(), Schema.string()).optional(),
	scopes: Schema.record(Schema.string(), Schema.record(Schema.string(), Schema.string())).optional(),
	exclude: Schema.array(Schema.string()).optional(),
	lint: Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional(),
		plugins: Schema.array(Schema.string()).optional(),
		rules: Schema.object({
			tags: Schema.array(Schema.string()).optional(),
			exclude: Schema.array(Schema.string()).optional(),
			include: Schema.array(Schema.string()).optional()
		}).optional(),
		report: Schema.enum([
			"pretty",
			"json",
			"compact"
		]).optional()
	}).optional(),
	fmt: Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional(),
		useTabs: Schema.boolean().optional(),
		lineWidth: Schema.number().optional(),
		indentWidth: Schema.number().optional(),
		singleQuote: Schema.boolean().optional(),
		proseWrap: Schema.enum([
			"always",
			"never",
			"preserve"
		]).optional(),
		semiColons: Schema.boolean().optional(),
		quoteProps: Schema.enum([
			"asNeeded",
			"consistent",
			"preserve"
		]).optional(),
		newLineKind: Schema.enum([
			"auto",
			"crlf",
			"lf",
			"system"
		]).optional(),
		useBraces: Schema.enum([
			"maintain",
			"whenNotSingleLine",
			"always",
			"preferNone"
		]).optional(),
		bracePosition: Schema.enum([
			"maintain",
			"sameLine",
			"nextLine",
			"sameLineUnlessHanging"
		]).optional(),
		singleBodyPosition: Schema.enum([
			"maintain",
			"sameLine",
			"nextLine"
		]).optional(),
		nextControlFlowPosition: Schema.enum([
			"maintain",
			"sameLine",
			"nextLine"
		]).optional(),
		trailingCommas: Schema.enum([
			"never",
			"always",
			"onlyMultiLine"
		]).optional(),
		"json.trailingCommas": Schema.enum([
			"never",
			"always",
			"maintain",
			"jsonc"
		]).optional(),
		operatorPosition: Schema.enum([
			"maintain",
			"sameLine",
			"nextLine"
		]).optional(),
		"jsx.bracketPosition": Schema.enum([
			"maintain",
			"sameLine",
			"nextLine"
		]).optional(),
		"jsx.forceNewLinesSurroundingContent": Schema.boolean().optional(),
		"jsx.multiLineParens": Schema.enum([
			"never",
			"prefer",
			"always"
		]).optional(),
		"typeLiteral.separatorKind": Schema.enum(["comma", "semiColon"]).optional(),
		spaceAround: Schema.boolean().optional(),
		spaceSurroundingProperties: Schema.boolean().optional(),
		vueComponentCase: Schema.enum([
			"ignore",
			"pascal-case",
			"kebab-case"
		]).optional(),
		angularNextControlFlowSameLine: Schema.boolean().optional(),
		sortNamedImports: Schema.enum([
			"maintain",
			"caseSensitive",
			"caseInsensitive"
		]).optional(),
		sortNamedExports: Schema.enum([
			"maintain",
			"caseSensitive",
			"caseInsensitive"
		]).optional(),
		useEditorConfig: Schema.boolean().optional(),
		options: Schema.object({
			useTabs: Schema.boolean().optional(),
			lineWidth: Schema.number().optional(),
			indentWidth: Schema.number().optional(),
			singleQuote: Schema.boolean().optional(),
			proseWrap: Schema.enum([
				"always",
				"never",
				"preserve"
			]).optional(),
			semiColons: Schema.boolean().optional()
		}).optional()
	}).optional(),
	minimumDependencyAge: Schema.union([MinimumDependencyAgeDateSchema, Schema.object({
		age: MinimumDependencyAgeDateSchema.optional(),
		exclude: Schema.array(Schema.string().regex(/^(?:npm:|jsr:).+/)).optional()
	})]).optional(),
	nodeModulesDir: Schema.union([Schema.enum([
		"auto",
		"manual",
		"none"
	]), Schema.boolean()]).optional(),
	vendor: Schema.boolean().optional(),
	jsrDepsInNodeModules: Schema.boolean().optional(),
	preferPackageJson: Schema.boolean().optional(),
	tasks: Schema.record(Schema.string(), Schema.union([Schema.string(), Schema.object({
		description: Schema.string().optional(),
		command: Schema.string().optional(),
		dependencies: Schema.array(Schema.string()).optional(),
		files: Schema.array(Schema.string()).optional(),
		output: Schema.array(Schema.string()).optional(),
		env: Schema.array(Schema.string()).optional()
	})])).optional(),
	test: Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional(),
		permissions: PermissionNameOrSetSchema.optional(),
		sanitizeOps: Schema.boolean().optional(),
		sanitizeResources: Schema.boolean().optional()
	}).optional(),
	publish: Schema.union([Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional()
	}), Schema.literal(false)]).optional(),
	bench: Schema.object({
		include: Schema.array(Schema.string()).optional(),
		exclude: Schema.array(Schema.string()).optional(),
		permissions: PermissionNameOrSetSchema.optional()
	}).optional(),
	coverage: Schema.object({ thresholds: Schema.object({
		lines: Schema.number().min(0).max(100).optional(),
		branches: Schema.number().min(0).max(100).optional(),
		functions: Schema.number().min(0).max(100).optional()
	}).optional() }).optional(),
	license: Schema.string().optional(),
	lock: Schema.union([
		Schema.string(),
		Schema.boolean(),
		Schema.object({
			path: Schema.string().optional(),
			frozen: Schema.boolean().optional()
		})
	]).optional(),
	unstable: Schema.array(Schema.string()).optional(),
	name: Schema.string().optional(),
	version: Schema.string().optional(),
	exports: Schema.union([Schema.string(), Schema.record(Schema.string(), Schema.string())]).optional(),
	permissions: Schema.record(Schema.string(), PermissionSetSchema).optional(),
	patch: Schema.array(Schema.string()).optional(),
	links: Schema.array(Schema.string()).optional(),
	workspace: Schema.union([Schema.array(Schema.string()), Schema.object({ members: Schema.array(Schema.string()).optional() })]).optional()
}).register(configReg, {
	urn: "model:config.deno",
	key: "deno",
	title: "Deno Configuration",
	description: "A JSON representation of a Deno configuration file.",
	grouping: "deno",
	moduleUrl: import.meta.url
});
/** Strongly-typed `defineDenoConfig` for authoring a `deno.config.ts` file. */
const defineDenoConfig = createDefineConfig(DenoConfig);
//#endregion
//#region src/config.ts
/**
* Build a schema-bound `defineConfig` helper.
*
* The returned `defineConfig` validates object/array literals eagerly
* against `schema`, and passes function factories through untouched (they
* are validated lazily when invoked).
*/
function createDefineConfig(schema) {
	function defineConfig(options) {
		if (typeof options === "function") return options;
		if (Array.isArray(options)) return schema.array().parse(options);
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
function createDefineConfigs(schemas) {
	const shapes = /* @__PURE__ */ new Map();
	for (const schema of schemas) {
		const groupings = groupingsOf(schema) ?? [];
		const fields = Object.entries(schema.shape);
		groupings.forEach((grouping, index) => {
			const shape = shapes.get(grouping) ?? {};
			for (const [key, field] of fields) shape[key] = index === 0 ? field : field.optional();
			shapes.set(grouping, shape);
		});
	}
	return new Map([...shapes].map(([grouping, shape]) => [grouping, createDefineConfig(Schema.object(shape))]));
}
/**
* Resolve a schema's registered grouping preference list, failing fast when it
* is missing — the grouping is what names the config file to load.
*/
function requireGroupings(schema) {
	const groupings = groupingsOf(schema);
	if (groupings === void 0 || groupings.length === 0) throw new Error("Config schema is not registered with a `grouping`; register it so the loader can locate `<grouping>.config.{ts,js,json}` or `<grouping>.{ts,js,json}`.");
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
function configPreferences(schemas) {
	return [...Map.groupBy(schemas, (schema) => JSON.stringify(requireGroupings(schema))).keys()].map((key) => JSON.parse(key));
}
/**
* Candidate filename suffixes and supported extensions, tried in order.
* Candidates support both `.config` (e.g. `package.config.ts`) and without
* `.config` (e.g. `package.ts`).
*/
const SUFFIXES = [".config", ""];
const EXTENSIONS = [
	".ts",
	".js",
	".json"
];
/**
* Helper to expand ~ to home directory.
*/
function expandHomeDir(pathStr) {
	if (pathStr === "~") return homedir();
	if (pathStr.startsWith("~/") || pathStr.startsWith("~\\")) return resolve(homedir(), pathStr.slice(2));
	return resolve(process.cwd(), pathStr);
}
/**
* `ERR_MODULE_NOT_FOUND` is raised when the candidate file does not exist.
* Only that case should trigger a fallback; genuine config/validation errors
* must propagate.
*/
const isModuleNotFound = (error) => typeof error === "object" && error !== null && "code" in error && (error.code === "ERR_MODULE_NOT_FOUND" || error.code === "ENOENT");
/**
* Resolve and load the config file for one grouping-preference list from baseDir.
*
* Each list is a fallback chain: its groupings are tried in order and the first
* one with an existing `<grouping>.config.*` or `<grouping>.*` file wins.
* Returns `undefined` when no file exists for the list.
*/
async function loadGroupingFile(preferenceList, baseDir = process.cwd()) {
	for (const grouping of preferenceList) for (const suffix of SUFFIXES) for (const ext of EXTENSIONS) {
		const file = `${grouping}${suffix}${ext}`;
		const filePath = resolve(baseDir, file);
		const specifier = pathToFileURL(filePath).href;
		try {
			const options = ext === ".json" ? { with: { type: "json" } } : void 0;
			const mod = await import(specifier, options);
			if (mod.default === void 0) throw new Error(`Config "${file}" must have a default export.`);
			return {
				grouping,
				file,
				config: mod.default
			};
		} catch (error) {
			if (ext === ".json" && existsSync(filePath)) try {
				const stripped = readFileSync(filePath, "utf8").replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1").replace(/,\s*([\]}])/g, "$1");
				return {
					grouping,
					file,
					config: JSON.parse(stripped)
				};
			} catch {
				throw error;
			}
			if (!isModuleNotFound(error)) throw error;
		}
	}
}
/**
* Load every grouping-preference list, returning the resolved file for each.
*
* Tries global candidate directories specified in `mergeWithGlobal` (defaulting to
* `["~/.config", "~"]`) before loading local config, merging global configs with local
* config overrides.
*/
async function loadConfigFiles(preferences) {
	const cache = /* @__PURE__ */ new Map();
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	const localMap = /* @__PURE__ */ new Map();
	for (const preferenceList of preferences) {
		const key = [...preferenceList].join(",");
		if (!localMap.has(key)) {
			const localLoaded = await loadGroupingFile(preferenceList, process.cwd());
			localMap.set(key, localLoaded);
		}
	}
	let mergeWithGlobalList = DEFAULT_MERGE_WITH_GLOBAL;
	for (const loaded of localMap.values()) if (loaded?.config) {
		const cfgObj = loaded.config.config;
		if (cfgObj && Array.isArray(cfgObj.mergeWithGlobal)) {
			mergeWithGlobalList = cfgObj.mergeWithGlobal;
			break;
		}
	}
	const cwdResolved = resolve(process.cwd());
	const globalDirsOrdered = [...mergeWithGlobalList.map((dir) => expandHomeDir(dir)).filter((dir) => resolve(dir) !== cwdResolved)].reverse();
	for (const preferenceList of preferences) {
		const key = [...preferenceList].join(",");
		if (cache.has(key)) {
			const loaded = cache.get(key);
			if (loaded !== void 0 && !seen.has(loaded.file)) {
				seen.add(loaded.file);
				out.push(loaded);
			}
			continue;
		}
		const localLoaded = localMap.get(key);
		const globalConfigs = [];
		for (const gDir of globalDirsOrdered) {
			const gLoaded = await loadGroupingFile(preferenceList, gDir);
			if (gLoaded) globalConfigs.push(gLoaded);
		}
		let mergedConfig;
		let chosenGrouping;
		let chosenFile;
		for (const gLoaded of globalConfigs) {
			mergedConfig = {
				...mergedConfig,
				...gLoaded.config
			};
			chosenGrouping = gLoaded.grouping;
			chosenFile = gLoaded.file;
		}
		if (localLoaded) {
			mergedConfig = {
				...mergedConfig,
				...localLoaded.config
			};
			chosenGrouping = localLoaded.grouping;
			chosenFile = localLoaded.file;
		}
		let result;
		if (mergedConfig !== void 0 && chosenGrouping !== void 0 && chosenFile !== void 0) result = {
			grouping: chosenGrouping,
			file: chosenFile,
			config: mergedConfig
		};
		cache.set(key, result);
		if (result !== void 0 && !seen.has(result.file)) {
			seen.add(result.file);
			out.push(result);
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
async function loadAppConfig(preferences = configGroupPreferences) {
	const files = await loadConfigFiles(preferences);
	if (files.length === 0) {
		const looked = [...preferences].flatMap((list) => list.flatMap((grouping) => SUFFIXES.flatMap((suffix) => EXTENSIONS.map((ext) => `${grouping}${suffix}${ext}`)))).join(", ");
		throw new Error(`Unable to load application config. Looked for: ${looked}`);
	}
	const merged = {};
	for (const { grouping, config } of files) {
		defaultConfig.set(grouping, "", config);
		defaultConfig.groupValues[grouping] = {
			...defaultConfig.groupValues[grouping],
			...config
		};
		Object.assign(merged, config);
	}
	Object.assign(defaultConfig.values, merged);
	return merged;
}
/**
* Every registered configuration schema.
*
* Single source of truth for both the combined schema and the set of groupings
* used to locate config files, so adding a config module only requires adding
* it here.
*/
const configSchemas = [
	ConfigConfig,
	PackageConfig,
	TsconfigConfig,
	DenoConfig
];
/**
* Config schemas split into one entry per grouping-preference list via
* {@link Map.groupBy}, keyed by the JSON-encoded list (arrays can't be reliable
* Map keys). One entry is one resolution chain: the loader walks the groupings
* in order and uses the first config file that exists.
*/
const configGroups = Map.groupBy(configSchemas, (schema) => JSON.stringify(requireGroupings(schema)));
if (configGroups.size === 0) throw new Error("No config grouping registered; register config schemas with a `grouping` so the loader can locate `<grouping>.config.{ts,js,json}` or `<grouping>.{ts,js,json}`.");
/**
* Distinct ordered grouping preferences, e.g. `[["app"], ["database", "app"]]`.
*/
const configGroupPreferences = configPreferences(configSchemas);
/**
* Per-grouping `defineConfig` helpers, generated from the registered groupings
* (nothing hardcoded). Keyed by grouping, e.g. `defineConfigs.get("app")`.
*/
const defineConfigs = createDefineConfigs(configSchemas);
/**
* Get the runtime `defineConfig` helper bound to a grouping's composed schema.
*
* Throws when no config schema declares the grouping. Prefer {@link defineConfig}
* for authoring, since the per-grouping helper's shape is only known at runtime.
*/
function defineConfigFor(grouping) {
	const defineConfig = defineConfigs.get(grouping);
	if (defineConfig === void 0) throw new Error(`No config schema registered for grouping "${grouping}".`);
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
const ConfigObject = Schema.object({
	...ConfigConfig.shape,
	...PackageConfig.shape,
	...TsconfigConfig.shape,
	...DenoConfig.shape
});
/**
* Readonly view of the combined configuration schema. This is the strict schema
* the merged config is validated against, so required keys must be supplied by
* *some* grouping's config file.
*/
const Configs = ConfigObject.readonly();
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
const defineConfig = createDefineConfig(ConfigObject.partial());
/**
* Default implementation of the {@link Config} interface.
*/
var ConfigManager = class {
	values = {};
	groupValues = {};
	constructor(initialValues, groupFiles) {
		if (initialValues) this.values = { ...initialValues };
		if (groupFiles) for (const { grouping, config } of groupFiles) this.groupValues[grouping] = {
			...this.groupValues[grouping],
			...config
		};
	}
	get(groupOrKey, keyInGroup) {
		if (keyInGroup !== void 0) {
			const groupObj = this.groupValues[groupOrKey];
			if (groupObj && keyInGroup in groupObj) return groupObj[keyInGroup];
			return this.values[keyInGroup];
		}
		return this.values[groupOrKey];
	}
	set(group, key, value) {
		if (!this.groupValues[group]) this.groupValues[group] = {};
		if (key !== "") {
			this.groupValues[group][key] = value;
			this.values[key] = value;
		}
	}
	async load(preferences = configGroupPreferences) {
		return await loadAppConfig(preferences);
	}
};
/** Global default configuration instance. */
const defaultConfig = new ConfigManager();
function getConfig(groupOrKey, keyInGroup) {
	return defaultConfig.get(groupOrKey, keyInGroup);
}
/**
* Set a configuration value for a given group and config key.
*
* @param group The configuration group (e.g. "app", "database", "package").
* @param key The configuration key.
* @param value The value to set.
*/
function setConfig(group, key, value) {
	defaultConfig.set(group, key, value);
}
//#endregion
//#region src/models/config/index.ts
let _configs;
let _configsLoaded = false;
async function getConfigs() {
	if (!_configsLoaded) {
		_configs = Configs.parse(await loadAppConfig(configGroupPreferences));
		_configsLoaded = true;
	}
	return _configs;
}
//#endregion
//#region src/main.ts
const main = async () => {
	return (await getConfigs())["appName"];
};
if (process.argv[1] !== void 0 && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const configs = await getConfigs();
	console.log("Hello,", configs["appName"] + "!");
	console.log("Your app key is:", configs["appKey"]);
	console.log("Database:", configs["databaseUrl"]);
}
//#endregion
export { ConfigManager, ConfigObject, Configs, DEFAULT_CODEGEN, DEFAULT_MERGE_WITH_GLOBAL, configGroupPreferences, configGroups, configPreferences, configReg, configSchemas, createDefineConfig, createDefineConfigs, defaultConfig, defineConfig, defineConfigFor, defineConfigs, defineDenoConfig, definePackageConfig, defineTypeScriptConfig, expandHomeDir, getConfig, getConfigs, groupingsOf, loadAppConfig, loadConfigFiles, main, requireGroupings, setConfig };
