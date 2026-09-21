import { type $output, registry, type ZodObject } from "zod";

/** Metadata base for all registries.*/
type MetadataBase = {
  urn: string;
  title?: string;
  description?: string;
  moduleUrl?: string;
  hash?: string;
  deprecated?: boolean;
  examples?: $output[];
};

/**
 * A grouping, or an ordered list of preferred groupings.
 *
 * An array expresses fallback order: the loader tries each grouping's config
 * file in turn and uses the first one that exists, e.g. `["database", "app"]`
 * loads `database.config.*` when present, otherwise `app.config.*`.
 */
type Grouping = string | readonly string[];

/**
 * Configuration registry.
 * Configurations are key-value pairs within a {@link ZodObject}.
 */
const configReg = registry<
  { key: string; grouping?: Grouping } & MetadataBase,
  ZodObject
>();

/**
 * Ordered, de-duplicated groupings registered for a config schema.
 *
 * A single string is normalised to a one-element array so callers always deal
 * with an ordered preference list.
 */
function groupingsOf(schema: ZodObject): readonly string[] | undefined {
  const grouping = configReg.get(schema)?.grouping;
  if (grouping === undefined) {
    return undefined;
  }
  return typeof grouping === "string" ? [grouping] : [...new Set(grouping)];
}

export { configReg, type Grouping, groupingsOf };
