import { registry, type ZodType } from "zod";

/** Metadata base for all registries. */
export type MetadataBase = {
  urn: string;
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
export const configFieldRegistry = registry<MetadataConfigField, ZodType<any>>();

export const configFieldReg = configFieldRegistry;

/**
 * Configuration group registry.
 * Configuration groups are collections of configuration fields sharing the same grouping.
 */
export const configGroupRegistry = registry<MetadataConfigGroup, ZodType<any>>();

export const configGroupReg = configGroupRegistry;

const registeredFieldsMap = new Map<string, MetadataConfigField>();
export const registeredGroupsMap = new Map<string, { schema: any; meta: MetadataConfigGroup }>();

const origFieldAdd = configFieldRegistry.add.bind(configFieldRegistry);
configFieldRegistry.add = function (schema: any, meta: any) {
  if (meta && typeof meta === "object" && meta.groupId && meta.key) {
    registeredFieldsMap.set(`${meta.groupId}:${meta.key}`, meta);
  }
  return origFieldAdd(schema, meta);
};

export function isFieldRegistered(groupId: string, fieldKey: string): boolean {
  return registeredFieldsMap.has(`${groupId}:${fieldKey}`);
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
  if (meta && typeof meta === "object" && meta.id) {
    validateGroupFields(schema, meta.id);
    registeredGroupsMap.set(meta.id, { schema, meta });
  }
  return origGroupAdd(schema, meta);
};
