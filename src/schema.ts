import { type ZodType } from "zod";
import {
  configFieldRegistry,
  configGroupRegistry,
  type MetadataConfigField,
  type MetadataConfigGroup,
} from "./registries.ts";

export * from "zod";

function createConfigProxy<T extends ZodType<any>, M>(
  schema: T,
  registry: any,
  initialMeta?: M,
): T & { meta: (m: M) => T } {
  let currentSchema = schema;

  if (initialMeta && currentSchema) {
    registry.add(currentSchema, initialMeta);
  }

  const dummyTarget = function () {};

  const handler: ProxyHandler<any> = {
    get(_target, prop, _receiver) {
      if (prop === "meta") {
        return (meta: M) => {
          registry.add(currentSchema, meta);
          registry.add(proxy, meta);
          return proxy;
        };
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
  if (initialMeta) {
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
 */
export const configGroup = createConfigWrapper<MetadataConfigGroup>(configGroupRegistry);
