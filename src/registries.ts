import { object } from "zod";
import { registry, resolveCallerModuleUrl, SCHEMA_MODULE_URL } from "./schema.ts";

/**
 * Auto-defaults `moduleUrl` on registration metadata by resolving the caller's
 * module URL from the stack. This backs both `Schema.config(...).meta({...})`
 * and the zod-native `schema.register(registry, {...})` paths, so call sites no
 * longer need to repeat `moduleUrl: import.meta.url`.
 */
function injectModuleUrl(meta: any): any {
  if (!meta || typeof meta !== "object" || meta.moduleUrl) return meta;
  const url = resolveCallerModuleUrl({ skip: [SCHEMA_MODULE_URL, import.meta.url] });
  if (url) meta.moduleUrl = url;
  return meta;
}

/**
 * Formats a config URN according to the standard:
 * `urn:config:{group}.{field}.?{subfield}`
 */
export function formatConfigUrn(groupId: string, fieldKey?: string, subfield?: string): string {
  let urn = `urn:config:${groupId}`;
  if (fieldKey) {
    urn += `.${fieldKey}`;
    if (subfield) {
      urn += `.${subfield}`;
    }
  }
  return urn;
}

/**
 * Parses a config URN in the format `urn:config:{group}.{field}.?{subfield}`
 */
export function parseConfigUrn(
  urn: string,
): { group: string; field?: string; subfield?: string } | undefined {
  if (!urn || typeof urn !== "string") return undefined;
  const match = /^urn:config:([^.]+)(?:\.([^.]+))?(?:\.(.+))?$/i.exec(urn.trim());
  if (!match) return undefined;
  const [, group, field, subfield] = match;
  return {
    group: group!,
    ...(field ? { field } : {}),
    ...(subfield ? { subfield } : {}),
  };
}

/**
 * Auto-defaults or normalizes `urn` on registration metadata following
 * `urn:config:{group}.{field}.?{subfield}`.
 */
export function normalizeUrn(meta: any): any {
  if (!meta || typeof meta !== "object") return meta;

  if (meta.groupId && meta.key) {
    if (!meta.urn) {
      meta.urn = formatConfigUrn(meta.groupId, meta.key);
    } else if (!meta.urn.startsWith("urn:config:")) {
      const cleaned = meta.urn.replace(/^urn:/i, "").replace(/^config[:.]/i, "");
      const parts = cleaned.split(".");
      if (parts.length >= 2) {
        meta.urn = formatConfigUrn(parts[0], parts[1], parts.slice(2).join(".") || undefined);
      } else {
        meta.urn = formatConfigUrn(meta.groupId, meta.key);
      }
    }
  } else if (meta.id) {
    if (!meta.urn) {
      meta.urn = formatConfigUrn(meta.id);
    } else if (!meta.urn.startsWith("urn:config:")) {
      const cleaned = meta.urn.replace(/^urn:/i, "").replace(/^config[:.]/i, "");
      meta.urn = formatConfigUrn(cleaned || meta.id);
    }
  }

  return meta;
}

/** Metadata base for all registries. */
export type MetadataBase = {
  urn?: string;
  title?: string;
  description?: string;
  moduleUrl?: string;
  hash?: string;
  deprecated?: boolean;
  examples?: any[];
};

export type MetadataConfigField = {
  key: string;
  groupId: string;
} & MetadataBase;

export type MetadataConfigGroup = {
  id: string;
  resolveMap?: {
    system?: string | string[];
    user?: string | string[];
    local?: string | string[];
  };
} & MetadataBase;

/**
 * Configuration field registry.
 * Configuration fields are key-value pairs within a {@link ZodType}.
 */
export const configFieldRegistry = registry<MetadataConfigField, any>();

export const configFieldReg = configFieldRegistry;

/**
 * Configuration group registry.
 * Configuration groups are collections of configuration fields sharing the same grouping.
 */
export const configGroupRegistry = registry<MetadataConfigGroup, any>();

export const configGroupReg = configGroupRegistry;

const registeredFieldsMap = new Map<string, MetadataConfigField>();
export const fieldsByGroupIdMap = new Map<
  string,
  Map<string, { schema: any; meta: MetadataConfigField }>
>();
export const registeredGroupsMap = new Map<string, { schema: any; meta: MetadataConfigGroup }>();

const origFieldAdd = configFieldRegistry.add.bind(configFieldRegistry);
configFieldRegistry.add = function (schema: any, meta: any) {
  meta = injectModuleUrl(meta);
  meta = normalizeUrn(meta);
  if (meta && typeof meta === "object" && meta.groupId && meta.key) {
    registeredFieldsMap.set(`${meta.groupId}:${meta.key}`, meta);

    let groupFields = fieldsByGroupIdMap.get(meta.groupId);
    if (!groupFields) {
      groupFields = new Map();
      fieldsByGroupIdMap.set(meta.groupId, groupFields);
    }
    groupFields.set(meta.key, { schema, meta });
  }
  return origFieldAdd(schema, meta);
};

export function isFieldRegistered(groupId: string, fieldKey: string): boolean {
  return registeredFieldsMap.has(`${groupId}:${fieldKey}`);
}

export function getFieldsForGroupId(
  groupId: string,
): Map<string, { schema: any; meta: MetadataConfigField }> {
  return fieldsByGroupIdMap.get(groupId) || new Map();
}

/**
 * Dynamically builds a Zod object schema for a group ID from all registered fields in configFieldRegistry.
 */
export function buildGroupSchemaFromFields(groupId: string): any {
  const fields = getFieldsForGroupId(groupId);
  const shape: Record<string, any> = {};

  for (const [key, fieldEntry] of fields.entries()) {
    shape[key] = fieldEntry.schema.optional();
  }

  return object(shape).passthrough().readonly();
}

export function validateGroupFields(groupSchema: any, groupId: string) {
  let shape = groupSchema?.shape || groupSchema?._def?.shape;
  if (!shape && groupSchema?._def?.innerType) {
    shape = groupSchema._def.innerType.shape || groupSchema._def.innerType._def?.shape;
  }
  if (!shape) return;
  const missingKeys: string[] = [];

  for (const fieldKey of Object.keys(shape)) {
    const key = `${groupId}:${fieldKey}`;
    if (!registeredFieldsMap.has(key)) {
      missingKeys.push(fieldKey);
    }
  }

  if (missingKeys.length > 0) {
    throw new Error(
      `Cannot register config group: field(s) [${missingKeys.join(", ")}] are missing or not registered in configFieldRegistry for groupId "${groupId}".`,
    );
  }
}

const origGroupAdd = configGroupRegistry.add.bind(configGroupRegistry);
configGroupRegistry.add = function (schema: any, meta: any) {
  meta = injectModuleUrl(meta);
  meta = normalizeUrn(meta);
  if (meta && typeof meta === "object" && meta.id) {
    if (schema) {
      validateGroupFields(schema, meta.id);
    }
    registeredGroupsMap.set(meta.id, { schema, meta });
  }
  return origGroupAdd(schema, meta);
};
