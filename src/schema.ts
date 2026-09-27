import { type ZodType } from "zod";
import {
  configFieldRegistry,
  configGroupRegistry,
  type MetadataConfigField,
  type MetadataConfigGroup,
} from "./registries.ts";

export * from "zod";

/**
 * Proxy for registering a single configuration field schema into `configFieldRegistry`.
 */
export const config = new Proxy(
  function <T extends ZodType<any>>(schema: T, meta?: MetadataConfigField): T {
    if (meta && schema) {
      configFieldRegistry.add(schema, meta);
    }
    return schema;
  },
  {
    apply(_target, _thisArg, argArray: [any, any?]) {
      const [schema, meta] = argArray;
      if (meta && schema) {
        configFieldRegistry.add(schema, meta);
      }
      return schema;
    },
  },
);

/**
 * Proxy for registering a configuration group schema into `configGroupRegistry`.
 */
export const configGroup = new Proxy(
  function <T extends ZodType<any>>(schema: T, meta?: MetadataConfigGroup): T {
    if (meta && schema) {
      configGroupRegistry.add(schema, meta);
    }
    return schema;
  },
  {
    apply(_target, _thisArg, argArray: [any, any?]) {
      const [schema, meta] = argArray;
      if (meta && schema) {
        configGroupRegistry.add(schema, meta);
      }
      return schema;
    },
  },
);
