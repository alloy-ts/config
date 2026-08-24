import { type $output, registry, type ZodObject } from "zod";

/** Metadata base for all registries.*/
type MetadataBase = {
  title?: string;
  description?: string;
  moduleUrl?: string;
  hash?: string;
  deprecated?: boolean;
  examples?: $output[];
};

/**
 * Configuration registry.
 * Configurations are key-value pairs within a {@link ZodObject}.
 */
const configReg = registry<
  { key: string; grouping?: string } & MetadataBase,
  ZodObject
>();

export { configReg };
