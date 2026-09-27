import { type ZodType } from "zod";
import {
  buildGroupSchemaFromFields,
  configFieldRegistry,
  configGroupRegistry,
  type MetadataConfigField,
} from "./registries.ts";

export * from "zod";

function createConfigProxy<T extends ZodType<any>, M>(
  schema: T | undefined,
  registry: any,
  initialMeta?: M,
): any {
  let currentSchema: any = schema;

  if (initialMeta) {
    if (!currentSchema && (initialMeta as any).id) {
      currentSchema = buildGroupSchemaFromFields((initialMeta as any).id);
    }
    if (currentSchema) {
      registry.add(currentSchema, initialMeta);
    }
  }

  const dummyTarget = function () {};

  const handler: ProxyHandler<any> = {
    get(_target, prop, _receiver) {
      if (prop === "meta") {
        return (meta: M) => {
          if (!currentSchema && (meta as any).id) {
            currentSchema = buildGroupSchemaFromFields((meta as any).id);
          }
          if (currentSchema) {
            registry.add(currentSchema, meta);
            registry.add(proxy, meta);
          }
          return proxy;
        };
      }

      if (!currentSchema && prop === "parse") {
        return function (_input: any) {
          throw new Error("Config schema is not initialized or registered with metadata.");
        };
      }

      if (!currentSchema) {
        return undefined;
      }

      const val = Reflect.get(currentSchema, prop, currentSchema);
      if (typeof val === "function") {
        return function (this: any, ...args: any[]) {
          const res = val.apply(currentSchema, args);
          if (res && typeof res === "object" && typeof res.parse === "function") {
            currentSchema = res;
            return proxy;
          }
          return res;
        };
      }
      return val;
    },
  };

  const proxy = new Proxy(dummyTarget, handler);
  if (initialMeta && currentSchema) {
    registry.add(proxy, initialMeta);
  }
  return proxy as any;
}

function createConfigWrapper<M>(registry: any) {
  function configFn<T extends ZodType<any>>(schema: T, meta?: M): T & { meta: (m: M) => T } {
    return createConfigProxy(schema, registry, meta);
  }

  return new Proxy(configFn, {
    apply(_target, _thisArg, argArray: [any, any?]) {
      const [schema, meta] = argArray;
      return createConfigProxy(schema, registry, meta);
    },
  });
}

/**
 * Proxy for registering a single configuration field schema into `configFieldRegistry`.
 */
export const config = createConfigWrapper<MetadataConfigField>(configFieldRegistry);

/**
 * Proxy for registering a configuration group schema into `configGroupRegistry`.
 * Does not require passing individual field schemas in Schema.object({...}).
 */
export const configGroup = new Proxy(
  function (arg1?: any, arg2?: any) {
    if (arg1 && typeof arg1 === "object" && (arg1.id || arg1.urn)) {
      return createConfigProxy(undefined, configGroupRegistry, arg1);
    }
    return createConfigProxy(arg1, configGroupRegistry, arg2);
  },
  {
    apply(_target, _thisArg, argArray: [any?, any?]) {
      const [arg1, arg2] = argArray;
      if (arg1 && typeof arg1 === "object" && (arg1.id || arg1.urn)) {
        return createConfigProxy(undefined, configGroupRegistry, arg1);
      }
      return createConfigProxy(arg1, configGroupRegistry, arg2);
    },
  },
) as any;
