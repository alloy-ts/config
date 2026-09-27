import { type ZodType } from "zod";
import * as Schema from "./schema.ts";
import {
  configGroupRegistry,
  isFieldRegistered,
  registeredGroupsMap,
  type MetadataConfigGroup,
} from "./registries.ts";

export type Scope = "local" | "user" | "system";

/**
 * Stores configuration values per group ID and scope.
 */
const scopeStores = new Map<string, Record<Scope, Record<string, any>>>();

function getOrCreateScopeStore(groupId: string): Record<Scope, Record<string, any>> {
  let store = scopeStores.get(groupId);
  if (!store) {
    store = {
      local: {},
      user: {},
      system: {},
    };
    scopeStores.set(groupId, store);
  }
  return store;
}

/**
 * Seed initial values for a group in a given scope.
 */
export function seedScopeStore(groupId: string, scope: Scope, values: Record<string, any>): void {
  const store = getOrCreateScopeStore(groupId);
  Object.assign(store[scope], values);
}

/**
 * Helper to strip prefixes and non-alphanumeric delimiters for flexible matching.
 */
function normalizeIdentifier(str: string): string {
  return str
    .replace(/^urn:/i, "")
    .replace(/^config\./i, "")
    .replace(/[:._-]/g, "")
    .toLowerCase();
}

/**
 * Resolves a group entry from registered groups by schema or string identifier (id, urn, or normalized name).
 */
export function resolveGroup(schemaOrGroupId: ZodType<any> | string): {
  schema: any;
  meta: MetadataConfigGroup;
} {
  if (typeof schemaOrGroupId !== "string") {
    const meta = configGroupRegistry.get(schemaOrGroupId as any);
    if (meta) {
      return { schema: schemaOrGroupId, meta };
    }
    for (const entry of registeredGroupsMap.values()) {
      if (entry.schema === schemaOrGroupId) {
        return entry;
      }
    }
    throw new Error("Specified config group schema is not registered in configGroupRegistry.");
  }

  const query = schemaOrGroupId.trim();
  const normalizedQuery = normalizeIdentifier(query);

  for (const entry of registeredGroupsMap.values()) {
    const { meta } = entry;
    if (
      meta.id === query ||
      meta.urn === query ||
      normalizeIdentifier(meta.urn) === normalizedQuery ||
      normalizeIdentifier(meta.id) === normalizedQuery
    ) {
      return entry;
    }
  }

  throw new Error(`Config group "${schemaOrGroupId}" not found in registry.`);
}

/**
 * Parses a full key / URN string into its group entry and optional field key.
 */
export function parseConfigKey(fullKey: string): {
  group: { schema: any; meta: MetadataConfigGroup };
  fieldKey?: string;
} {
  try {
    const group = resolveGroup(fullKey);
    return { group };
  } catch {
    // Continue
  }

  const splitIndices: number[] = [];
  for (let i = fullKey.length - 1; i >= 0; i--) {
    if (fullKey[i] === ":" || fullKey[i] === ".") {
      splitIndices.push(i);
    }
  }

  for (const idx of splitIndices) {
    const groupCandidate = fullKey.slice(0, idx);
    const fieldCandidate = fullKey.slice(idx + 1);

    if (!groupCandidate || !fieldCandidate) continue;

    try {
      const group = resolveGroup(groupCandidate);
      return { group, fieldKey: fieldCandidate };
    } catch {
      // Try next
    }
  }

  throw new Error(`Config key or URN "${fullKey}" could not be resolved.`);
}

/**
 * Creates a strongly-typed `defineConfig` function for a config group schema or group ID string.
 */
export function createDefineConfig<T extends ZodType<any> = any>(
  schemaOrGroupId: T | string,
): (config: Schema.input<T>) => Schema.output<T> {
  const { schema } = resolveGroup(schemaOrGroupId as any);

  return function defineConfig(configValue: Schema.input<T>): Schema.output<T> {
    return schema.parse(configValue);
  };
}

/**
 * Group Resolver providing scope-aware `.get()` and `.set()` methods for a specific config group.
 */
export class ConfigGroupResolver {
  public readonly groupMeta: MetadataConfigGroup;
  public readonly groupSchema: any;

  constructor(groupIdentifier: string | ZodType<any>) {
    const { meta, schema } = resolveGroup(groupIdentifier);
    this.groupMeta = meta;
    this.groupSchema = schema;
  }

  private isFieldValid(fieldKey: string): boolean {
    if (isFieldRegistered(this.groupMeta.id, fieldKey)) {
      return true;
    }
    let shape = this.groupSchema?.shape || this.groupSchema?._def?.shape;
    if (!shape && this.groupSchema?._def?.innerType) {
      shape = this.groupSchema._def.innerType.shape || this.groupSchema._def.innerType._def?.shape;
    }
    return !!(shape && fieldKey in shape);
  }

  public get(key?: string, scope?: Scope): any {
    const store = getOrCreateScopeStore(this.groupMeta.id);

    if (key) {
      if (!this.isFieldValid(key)) {
        throw new Error(`Config field "${key}" not found in config group "${this.groupMeta.id}".`);
      }

      if (scope) {
        return store[scope][key];
      }

      if (store.local[key] !== undefined) return store.local[key];
      if (store.user[key] !== undefined) return store.user[key];
      if (store.system[key] !== undefined) return store.system[key];

      return undefined;
    }

    let shape = this.groupSchema?.shape || this.groupSchema?._def?.shape;
    if (!shape && this.groupSchema?._def?.innerType) {
      shape = this.groupSchema._def.innerType.shape || this.groupSchema._def.innerType._def?.shape;
    }

    const keys = shape ? Object.keys(shape) : [];
    const result: Record<string, any> = {};

    for (const k of keys) {
      result[k] = this.get(k, scope);
    }

    return result;
  }

  public set(key: string, value: any, scope: Scope = "local"): void {
    if (!this.isFieldValid(key)) {
      throw new Error(`Config field "${key}" not found in config group "${this.groupMeta.id}".`);
    }

    const store = getOrCreateScopeStore(this.groupMeta.id);
    store[scope][key] = value;
  }
}

/**
 * Global Config class and instance constructor.
 */
export class Config {
  static createDefine = createDefineConfig;

  static get(key: string, scope?: Scope): any {
    const { group, fieldKey } = parseConfigKey(key);
    const resolver = new ConfigGroupResolver(group.meta.id);
    return resolver.get(fieldKey, scope);
  }

  static set(key: string, value: any, scope: Scope = "local"): void {
    const { group, fieldKey } = parseConfigKey(key);
    if (!fieldKey) {
      throw new Error(`Cannot set value on config group "${key}" without specifying a field key.`);
    }
    const resolver = new ConfigGroupResolver(group.meta.id);
    resolver.set(fieldKey, value, scope);
  }

  private resolver: ConfigGroupResolver;

  constructor(groupId: string) {
    this.resolver = new ConfigGroupResolver(groupId);
  }

  get(key?: string, scope?: Scope): any {
    return this.resolver.get(key, scope);
  }

  set(key: string, value: any, scope: Scope = "local"): void {
    this.resolver.set(key, value, scope);
  }
}

export function get(key: string, scope?: Scope): any {
  return Config.get(key, scope);
}

export function set(key: string, value: any, scope: Scope = "local"): void {
  Config.set(key, value, scope);
}
