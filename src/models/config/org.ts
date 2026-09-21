import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../define-config.ts";

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

export const OrgSchemaVersionSchema = Schema.literal("0.1.0");

export const OrgSlugSchema = Schema.string().regex(
  /^[a-z0-9]+(-[a-z0-9]+)*$/,
  "Slug must contain only lowercase alphanumeric characters and hyphens, and cannot start or end with a hyphen.",
);

export const OrgProjectPathSchema = Schema.string()
  .min(1)
  .regex(
    /^(?!\.)[^/\\]+$/,
    "Path must be relative, exactly one level deep, no . or .. segments, and not dot-prefixed.",
  );

export const OrgProjectEntrySchema = Schema.object({
  id: OrgSlugSchema,
  path: OrgProjectPathSchema.optional(),
});

export const OrgProjectsSchema = Schema.array(OrgProjectEntrySchema)
  .min(2, "Org projects list must contain at least two entries.")
  .refine(
    (projects) => {
      const ids = projects.map((p) => p.id);
      return new Set(ids).size === ids.length;
    },
    { message: "Project id values within org.yaml must be unique." },
  );

/* -------------------------------------------------------------------------- */
/*                             Org Config Schema                              */
/* -------------------------------------------------------------------------- */

export const OrgConfig = Schema.object({
  schemaVersion: OrgSchemaVersionSchema,
  org: Schema.string().min(1),
  projects: OrgProjectsSchema,
}).register(configReg, {
  urn: "model:config.org",
  key: "org",
  title: "Org Meta Configuration",
  description: "org meta schema for multi-project repositories.",
  grouping: [
    "org",
    ".org",
    ".org/",
    ".org/meta",
    "projects/org",
    ".projects/org",
  ],
  moduleUrl: import.meta.url,
});

export type Org = Schema.infer<typeof OrgConfig>;

/** Strongly-typed `defineOrgConfig` for authoring an `org.config.ts` or `org.yaml` file. */
export const defineOrgConfig = createDefineConfig(OrgConfig);
