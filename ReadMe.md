# Alloy-Ts / Config

Bring your own schema; this package handles **typed authoring**,
**grouping-aware loading**, and a single **strict validation pass**. Built on
**Zod v4**.

There are no built-in settings — you define the schemas, register a `grouping`
for each, and create your own `defineConfig` with `createDefineConfig`.

```
your schemas  ──register──▶ configReg  ──▶ configPreferences(schemas)
                                                    │
app.config.ts  ──defineConfig(…)──┐                 │
                                  ▼                 ▼
                            loadAppConfig(…)   (merge by grouping)
                                  │            .ts → .js → .json, cwd
                                  ▼
                        Combined.parse(merged)   strict validation
                                  │
                                  ▼
                            your config object  (typed)
```

---

## Install

```bash
npm install @alloy-ts/config
# or: pnpm add / yarn add / bun add @alloy-ts/config
```

- **ESM only** (`"type": "module"`).
- Requires **Node ≥ 22.6** to load `.ts` config files (uses Node's type
  stripping); enable with `--experimental-strip-types` if your version needs it.
- Zod v4 is a dependency — import it directly to define your schemas.

---

## Quick start

### 1. Define your schemas and create `defineConfig`

```ts
// config.ts
import { configReg, createDefineConfig } from "@alloy-ts/config";
import * as z from "zod";

export const AppConfig = z
  .object({ appName: z.string().min(1) })
  .register(configReg, {
    urn: "myapp:config.appName",
    key: "appName",
    title: "App Name",
    grouping: "app", // → app.config.{ts,js,json}
  });

export const DatabaseConfig = z
  .object({ databaseUrl: z.url() })
  .register(configReg, {
    urn: "myapp:config.databaseUrl",
    key: "databaseUrl",
    title: "Database URL",
    grouping: ["database", "app"], // database.config.*, else app.config.*
  });

/** All of your config schemas — the single source of truth. */
export const schemas = [AppConfig, DatabaseConfig];

/** Shared shape, reused for authoring and validation. */
const shape = { ...AppConfig.shape, ...DatabaseConfig.shape };

/** Combined schema, used for the final strict validation. */
export const Combined = z.object(shape).readonly();

/** Your typed authoring helper — fields optional, so a file declares just its slice. */
export const defineConfig = createDefineConfig(z.object(shape).partial());
```

> `defineConfig` is bound to a **partial** copy of the shape so a single config
> file can declare only its own slice. Completeness is enforced by the final
> `Combined.parse(…)`.
>
> Note: apply `.partial()` to the plain object — `.readonly()` returns a
> `ZodReadonly` which has no `.partial()`.

### 2. Write your config file

```ts
// app.config.ts
import { defineConfig } from "./config.ts";

export default defineConfig({
  appName: "My App",
  databaseUrl: "file:./data/app.db",
});
```

Unknown keys are rejected at compile time:

```ts
export default defineConfig({ appNmae: "typo" });
//                                     ~~~~~~ TS2769 — unknown property
```

### 3. Load and validate

```ts
// main.ts
import { configPreferences, loadAppConfig } from "@alloy-ts/config";
import { Combined, schemas } from "./config.ts";

const configs = Combined.parse(await loadAppConfig(configPreferences(schemas)));

console.log(configs.appName, configs.databaseUrl);
```

---

## Grouping

Every schema declares a `grouping`, which names the file its settings load from:

```
<grouping>.config.ts   →   <grouping>.config.js   →   <grouping>.config.json
```

`grouping` is a string **or an ordered array** used as a fallback chain:

```ts
grouping: "app"; // look only in app.config.*
grouping: ["database", "app"]; // database.config.*, else app.config.*
```

So `databaseUrl` can live in either file — put it in `database.config.ts` to
keep DB settings separate, or leave it in `app.config.ts` and the chain falls
back automatically.

### Splitting across files

```ts
// app.config.ts
export default defineConfig({ appName: "My App" });
```

```ts
// database.config.ts
export default defineConfig({ databaseUrl: "file:./data/app.db" });
```

Both are loaded and merged. A missing `database.config.ts` is fine — the
`["database", "app"]` chain falls back to `app.config.ts`.

### File resolution rules

- Resolved relative to **`process.cwd()`**, so it works from source and from
  bundled output.
- Extension order: `.ts`, then `.js`, then `.json`.
- Each file must have a **default export**.
- A missing file moves on to the next candidate; **any other error (including a
  validation failure) propagates**. If nothing is found, loading throws
  `Unable to load application config. Looked for: …`.

---

## API

Everything below is exported from `@alloy-ts/config`.

### Authoring

#### `createDefineConfig(schema)`

Builds a schema-bound helper with four overloads:

```ts
declare function defineConfig(options: UserConfig): UserConfig;
declare function defineConfig(options: UserConfig[]): UserConfig[];
declare function defineConfig(options: UserConfigFn): UserConfigFn;
declare function defineConfig(options: UserConfigExport): UserConfigExport;
```

Object and array literals are **validated eagerly**; function factories are
passed through and validated **lazily** when invoked.

#### `createDefineConfigs(schemas)`

Builds one helper **per grouping** from your schemas — returns
`Map<string, DefineConfig>`, keyed by grouping. A schema listed under several
groupings contributes its fields to each: **required** under its primary (first)
grouping, **optional** under the rest.

```ts
const defineConfigs = createDefineConfigs(schemas);
defineConfigs.get("database");
```

### Grouping & discovery

#### `configPreferences(schemas)`

Derives the distinct ordered grouping-preference lists from your schemas, ready
to hand to `loadAppConfig`:

```ts
configPreferences(schemas); // e.g. [["app"], ["database", "app"]]
```

Built on `Map.groupBy`, splitting schemas by their preference list (keyed by the
JSON-encoded list, since arrays can't be reliable Map keys).

#### `requireGroupings(schema)`

A schema's ordered grouping list; throws if the schema isn't registered with
one.

#### `groupingsOf(schema)`

Same as above but returns `undefined` instead of throwing.

### Loading

#### `loadAppConfig(preferences)`

```ts
function loadAppConfig(
  preferences: Iterable<readonly string[]>,
): Promise<Record<string, unknown>>;
```

Walks each preference list and uses the **first** grouping whose config file
exists, merging the results. Each file is imported at most once, even when
several lists fall back to it.

```ts
const merged = await loadAppConfig([["server"], ["database", "app"]]);
```

### Registry

#### `configReg`

The Zod registry carrying each schema's metadata. Register your schemas with it
so grouping discovery works:

```ts
z.object({ … }).register(configReg, {
  urn: "myapp:config.appName",
  key: "appName",
  grouping: "app",
});
```

Metadata: `urn`, `key`, `grouping`, plus optional `title`, `description`,
`moduleUrl`, `hash`, `deprecated`, `examples`.

### Types

| Type                  | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `UserConfig<T>`       | `z.infer<T>` — a schema's output                      |
| `UserConfigFn<T>`     | `(env: NodeJS.ProcessEnv) => UserConfig<T>`           |
| `UserConfigExport<T>` | `UserConfig<T> \| UserConfig<T>[] \| UserConfigFn<T>` |
| `DefineConfig`        | Return type of `createDefineConfig`                   |
| `Grouping`            | `string \| readonly string[]`                         |

---

## Build-time validation

The same resolution + validation your app runs at load time can run **during the
build**, so an incomplete config fails `npm run build` instead of the running
app. tsdown exposes a `build:prepare` hook — wire the check into your
`tsdown.config.ts`:

```ts
import { execFileSync } from "node:child_process";
import { defineConfig } from "tsdown";

export default defineConfig({
  // …
  hooks: {
    "build:prepare": () => {
      execFileSync(process.execPath, ["scripts/check-config.mjs"], {
        stdio: "inherit",
      });
    },
  },
});
```

`scripts/check-config.mjs` resolves every grouping file, then validates each one
against the keys **its grouping owns** — so a problem is attributed to the
specific file, not just the merged object. It then runs the combined parse to
catch anything that spans files.

```ts
const files = await loadConfigFiles(configPreferences(schemas));
for (const { grouping, file, config } of files) {
  strictFor(grouping).safeParse(config); // per-file, attributed to `file`
}
Configs.parse(Object.assign({}, ...files.map((f) => f.config))); // merged
```

A missing required key now fails the build, pointing at the file:

```
✘ invalid application config:
  app.config.ts [grouping:app]: appName — Invalid input: expected string, received undefined
  databaseUrl — Invalid input: expected string, received undefined (required by grouping "database")
```

The first line is the per-file check (this file is missing its own `appName`);
the second is the merged check for a key absent from every file (`databaseUrl`,
owned by the `database` grouping, which has no `database.config.*` file here).

You can also run it standalone (`node scripts/check-config.mjs`) or in CI.

---

## Notes & trade-offs

- **Completeness is checked at build time and again at load.**
  `Combined.parse(…)` runs when the config is loaded, and the same check can run
  during `tsdown` via the `build:prepare` hook (see
  [Build-time validation](#build-time-validation)), so an incomplete config
  fails the build with a Zod error naming the field. This is still not _per-file
  static_ typing: grouping membership is only known once the schema modules
  execute, so "this file must supply these keys" would require codegen or a
  hardcoded map.
- **Config files resolve from the current working directory** — run your app
  from the directory containing them.
- **Adding a config entry** is two steps: create the schema module with a
  `grouping`, and add it to your `schemas` array. Preference discovery,
  per-grouping helpers, and file resolution all derive from the registry.
- **Declarations:** the package ships `dist/main.d.mts` (built by tsdown with
  `dts: true`).
