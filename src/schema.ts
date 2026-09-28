import { type ZodType, globalRegistry as defaultGlobalRegistry } from "zod";
import { pathToFileURL } from "node:url";
import {
  buildGroupSchemaFromFields,
  configFieldRegistry,
  configGroupRegistry,
  type MetadataConfigField,
} from "./registries.ts";

export * from "zod";
export { z as s } from "zod";

/**
 * URL of this module. Used as an internal frame to skip when resolving the
 * caller's module URL (see {@link resolveCallerModuleUrl}).
 */
export const SCHEMA_MODULE_URL = import.meta.url;

/**
 * Extracts a source file location from a single V8 stack-trace line.
 *
 * Handles both `at Name (/path:line:col)` and `at /path:line:col` forms,
 * stripping the trailing `:line:col` so the path can be turned into a URL.
 */
function extractStackFile(line: string): string | undefined {
  const trimmed = line.trim();
  const paren = /\(([^)]+)\)$/.exec(trimmed);
  let loc = paren ? paren[1] : trimmed.replace(/^at\s+/, "");
  const m = loc ? /^(.+):\d+:\d+$/.exec(loc) : null;
  if (m) loc = m[1] ?? loc;
  if (!loc) return undefined;
  // Windows drive paths (C:\...) arrive without a scheme.
  return loc.startsWith("file:") ? loc : pathToFileURL(loc).href;
}

/**
 * Resolves the module URL of the code that invoked a config registration,
 * skipping internal frames (this module + anything in node_modules).
 *
 * `import.meta.url` can't be captured from inside `Schema.config` because it
 * always points at schema.ts itself — so we walk the call stack to find the
 * first *project* frame (the caller's module) and turn it into a file URL.
 * This lets `moduleUrl` be set automatically instead of repeating
 * `moduleUrl: import.meta.url` at every call site.
 */
export function resolveCallerModuleUrl(opts?: { skip?: string[] }): string | undefined {
  const skip = new Set(opts?.skip ?? [SCHEMA_MODULE_URL]);
  const stack = new Error().stack;
  if (!stack) return undefined;
  const lines = stack.split("\n");
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const file = extractStackFile(line);
    if (!file) continue;
    if (skip.has(file)) continue;
    if (file.includes("/node_modules/")) continue;
    return file;
  }
  return undefined;
}

/**
 * Returns `meta` with `moduleUrl` defaulted to the caller's module URL when it
 * is not already provided. No-op for nullish / non-object meta.
 */
export function withModuleUrl<M>(meta: M): M {
  if (meta && typeof meta === "object" && !(meta as any).moduleUrl) {
    const url = resolveCallerModuleUrl();
    if (url) return { ...(meta as any), moduleUrl: url } as M;
  }
  return meta;
}

export type MetadataType = object | undefined;

function createRegistryEntry(schema: any, meta: any): [any, any] & { schema: any; meta: any } {
  const tuple = [schema, meta] as any;
  tuple.schema = schema;
  tuple.meta = meta;
  return tuple;
}

const ZodRegistryBase = (defaultGlobalRegistry?.constructor || class {}) as any;

export class $SchemaRegistry<
  Meta extends MetadataType = MetadataType,
  Schema extends ZodType = ZodType,
> extends ZodRegistryBase {
  _meta!: Meta;
  _schema!: Schema;
  _map: WeakMap<any, any> = new WeakMap();
  _idmap: Map<string, any> = new Map();
  private _entries: Array<[any, any] & { schema: any; meta: any }> = [];

  add<S extends Schema>(schema: S, ..._metaArr: undefined extends Meta ? [any?] : [any]): this {
    const meta = _metaArr[0];
    if (schema && (typeof schema === "object" || typeof schema === "function")) {
      this._map.set(schema, meta);
    }

    if (meta && typeof meta === "object") {
      const keyId = meta.id || meta.urn || meta.key;
      if (keyId && typeof keyId === "string") {
        this._idmap.set(keyId, schema);
      }
      if (meta.urn) {
        this._idmap.set(meta.urn, schema);
      }
      if (meta.groupId && meta.key) {
        this._idmap.set(`${meta.groupId}:${meta.key}`, schema);
        this._idmap.set(`${meta.groupId}.${meta.key}`, schema);
        this._idmap.set(`urn:config:${meta.groupId}.${meta.key}`, schema);
      }
    }

    const entry = createRegistryEntry(schema, meta);
    const existingIdx = this._entries.findIndex(([s]) => s === schema);
    if (existingIdx >= 0) {
      this._entries[existingIdx] = entry;
    } else {
      this._entries.push(entry);
    }

    return this;
  }

  clear(): this {
    this._map = new WeakMap();
    this._idmap.clear();
    this._entries = [];
    return this;
  }

  remove(schemaOrKey: Schema | string): this {
    if (typeof schemaOrKey === "string") {
      const schema = this._idmap.get(schemaOrKey);
      this._idmap.delete(schemaOrKey);
      if (schema) {
        this._map.delete(schema);
        this._entries = this._entries.filter(([s]) => s !== schema);
      }
    } else {
      this._map.delete(schemaOrKey);
      for (const [k, v] of this._idmap.entries()) {
        if (v === schemaOrKey) {
          this._idmap.delete(k);
        }
      }
      this._entries = this._entries.filter(([s]) => s !== schemaOrKey);
    }
    return this;
  }

  get<S extends Schema>(schemaOrKey: S | string): any {
    if (typeof schemaOrKey === "string") {
      const schema = this._idmap.get(schemaOrKey);
      if (schema) {
        return this._map.get(schema);
      }
      for (const [, meta] of this._entries) {
        if (
          meta &&
          (meta.id === schemaOrKey ||
            meta.key === schemaOrKey ||
            meta.urn === schemaOrKey ||
            `${meta.groupId}:${meta.key}` === schemaOrKey ||
            `${meta.groupId}.${meta.key}` === schemaOrKey ||
            `urn:config:${meta.groupId}.${meta.key}` === schemaOrKey)
        ) {
          return meta;
        }
      }
      return undefined;
    }
    return this._map.get(schemaOrKey);
  }

  has(schemaOrKey: Schema | string): boolean {
    if (typeof schemaOrKey === "string") {
      if (this._idmap.has(schemaOrKey)) return true;
      for (const [, meta] of this._entries) {
        if (
          meta &&
          (meta.id === schemaOrKey ||
            meta.key === schemaOrKey ||
            meta.urn === schemaOrKey ||
            `${meta.groupId}:${meta.key}` === schemaOrKey ||
            `${meta.groupId}.${meta.key}` === schemaOrKey ||
            `urn:config:${meta.groupId}.${meta.key}` === schemaOrKey)
        ) {
          return true;
        }
      }
      return false;
    }
    return this._map.has(schemaOrKey);
  }

  get size(): number {
    return this._entries.length;
  }

  [Symbol.iterator](): IterableIterator<[any, any]> {
    return this._entries[Symbol.iterator]();
  }

  entries(): IterableIterator<[any, any]> {
    return this._entries[Symbol.iterator]();
  }

  keys(): IterableIterator<any> {
    return this._entries.map(([k]) => k)[Symbol.iterator]();
  }

  values(): IterableIterator<any> {
    return this._entries.map(([, v]) => v)[Symbol.iterator]();
  }
}

export type $ZodRegistry<
  Meta extends MetadataType = MetadataType,
  Schema extends ZodType = ZodType,
> = $SchemaRegistry<Meta, Schema>;

export function registry<
  T extends MetadataType = MetadataType,
  S extends ZodType = ZodType,
>(): $SchemaRegistry<T, S> {
  return new $SchemaRegistry<T, S>();
}

export const globalRegistry = registry<any>();

function getRegistry(registryOrGetter: any): any {
  return typeof registryOrGetter === "function" ? registryOrGetter() : registryOrGetter;
}

function captureCallerModuleUrl(): string | undefined {
  const err = new Error();
  const stack = err.stack;
  if (!stack) return undefined;

  const lines = stack.split("\n");
  for (const line of lines) {
    if (
      line.includes("at ") &&
      !line.includes("createConfigProxy") &&
      !line.includes("captureCallerModuleUrl") &&
      !line.includes("createConfigWrapper") &&
      !line.includes("configGroup") &&
      !line.includes("schema.ts")
    ) {
      const match = line.match(/(file:\/\/\/[^\s):]+|\/[^\s):]+)/);
      if (match && match[1]) {
        let url = match[1];
        if (!url.startsWith("file://") && url.startsWith("/")) {
          url = `file://${url}`;
        }
        return url;
      }
    }
  }
  return undefined;
}

function createConfigProxy<T extends ZodType<any>, M>(
  schema: T | undefined,
  registryTarget: any,
  initialMeta?: M,
): any {
  let currentSchema: any = schema;
  let callerUrl = captureCallerModuleUrl();
  let currentMeta: any = initialMeta
    ? { moduleUrl: callerUrl, ...initialMeta }
    : callerUrl
      ? { moduleUrl: callerUrl }
      : undefined;

  if (currentMeta) {
    if (!currentSchema && currentMeta.id) {
      currentSchema = buildGroupSchemaFromFields(currentMeta.id);
    }
    if (currentSchema) {
      getRegistry(registryTarget).add(currentSchema, currentMeta);
    }
  }

  const dummyTarget = function () {};

  const handler: ProxyHandler<any> = {
    get(_target, prop, _receiver) {
      if (prop === "meta") {
        return (meta: M) => {
          currentMeta = withModuleUrl(currentMeta ? { ...currentMeta, ...meta } : { ...meta });
          if (!currentSchema && currentMeta.id) {
            currentSchema = buildGroupSchemaFromFields(currentMeta.id);
          }
          if (currentSchema) {
            const reg = getRegistry(registryTarget);
            reg.add(currentSchema, currentMeta);
            reg.add(proxy, currentMeta);
          }
          return proxy;
        };
      }

      if (prop === "describe") {
        return (description: string) => {
          if (currentSchema && typeof currentSchema.describe === "function") {
            const res = currentSchema.describe(description);
            if (res && typeof res === "object") {
              currentSchema = res;
            }
          }
          currentMeta = withModuleUrl(
            currentMeta ? { ...currentMeta, description } : { description },
          );
          if (!currentSchema && currentMeta.id) {
            currentSchema = buildGroupSchemaFromFields(currentMeta.id);
          }
          if (currentSchema) {
            const reg = getRegistry(registryTarget);
            reg.add(currentSchema, currentMeta);
            reg.add(proxy, currentMeta);
          }
          return proxy;
        };
      }

      if (!currentSchema && prop === "parse") {
        return function (input: any) {
          if (currentMeta && currentMeta.id) {
            currentSchema = buildGroupSchemaFromFields(currentMeta.id);
          }
          if (currentSchema) {
            return currentSchema.parse(input);
          }
          throw new Error("Config schema is not initialised or registered with metadata.");
        };
      }

      if (!currentSchema) {
        return undefined;
      }

      const val = Reflect.get(currentSchema, prop, currentSchema);
      if (typeof val === "function") {
        return function (this: any, ...args: any[]) {
          const res = val.apply(currentSchema, args);
          if (
            res &&
            typeof res === "object" &&
            (typeof res.parse === "function" || typeof res._def === "object")
          ) {
            currentSchema = res;
            if (currentMeta) {
              const reg = getRegistry(registryTarget);
              reg.add(currentSchema, currentMeta);
              reg.add(proxy, currentMeta);
            }
            return proxy;
          }
          return res;
        };
      }
      return val;
    },
  };

  const proxy = new Proxy(dummyTarget, handler);
  if (currentMeta && currentSchema) {
    getRegistry(registryTarget).add(proxy, currentMeta);
  }
  return proxy as any;
}

function createConfigWrapper<M>(registryTarget: any) {
  function configFn<T extends ZodType<any>>(
    schema: T,
    meta?: M,
  ): T & { meta: (m: M) => T; describe: (d: string) => T } {
    return createConfigProxy(schema, registryTarget, meta);
  }

  return new Proxy(configFn, {
    apply(_target, _thisArg, argArray: [any, any?]) {
      const [schema, meta] = argArray;
      return createConfigProxy(schema, registryTarget, meta);
    },
  });
}

/**
 * Proxy for registering a single configuration field schema into `configFieldRegistry`.
 */
export const config = createConfigWrapper<MetadataConfigField>(() => configFieldRegistry);

/**
 * Proxy for registering a configuration group schema into `configGroupRegistry`.
 * Does not require passing individual field schemas in Schema.object({...}).
 */
export const configGroup = new Proxy(
  function (arg1?: any, arg2?: any) {
    if (arg1 && typeof arg1 === "object" && (arg1.id || arg1.urn) && !arg1._def) {
      return createConfigProxy(undefined, () => configGroupRegistry, arg1);
    }
    return createConfigProxy(arg1, () => configGroupRegistry, arg2);
  },
  {
    apply(_target, _thisArg, argArray: [any?, any?]) {
      const [arg1, arg2] = argArray;
      if (arg1 && typeof arg1 === "object" && (arg1.id || arg1.urn) && !arg1._def) {
        return createConfigProxy(undefined, () => configGroupRegistry, arg1);
      }
      return createConfigProxy(arg1, () => configGroupRegistry, arg2);
    },
  },
) as any;
