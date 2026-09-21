import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../define-config.ts";

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

export const SchemaVersionSchema = Schema.literal("0.1.0");

export const SlugSchema = Schema.string().regex(
  /^[a-z0-9]+(-[a-z0-9]+)*$/,
  "Slug must contain only lowercase alphanumeric characters and hyphens, and cannot start or end with a hyphen.",
);

export const HttpUrlSchema = Schema.string().url().regex(
  /^https?:\/\//i,
  "URL must be HTTP or HTTPS",
);

export const PathRefSchema = Schema.union([
  Schema.string().min(1),
  Schema.object({
    path: Schema.string().min(1),
  }),
]);

const stripAt = (s: string) => (s.startsWith("@") ? s.slice(1) : s);

export const ProjectLeadSchema = Schema.union([
  Schema.string().min(1),
  Schema.array(Schema.string().min(1)).min(1),
]).transform((val) => {
  if (typeof val === "string") {
    return stripAt(val);
  }
  return val.map(stripAt);
});

export const PackageManagerValueSchema = Schema.union([
  Schema.string().min(1),
  Schema.array(Schema.string().min(1)).min(1),
]);

export const PackageManagersSchema = Schema.record(
  Schema.string(),
  PackageManagerValueSchema,
);

export const SlackChannelSchema = Schema.object({
  name: Schema.string().regex(/^#/, "Slack channel name must start with #"),
  workspace: Schema.string().optional(),
  link: HttpUrlSchema.optional(),
  primary: Schema.boolean().optional(),
});

export const SlackChannelsSchema = Schema.array(SlackChannelSchema).refine(
  (channels) => channels.filter((ch) => ch.primary === true).length <= 1,
  { message: "At most one Slack channel may be marked as primary." },
);

export const MaturityPhaseEnum = Schema.enum([
  "sandbox",
  "incubating",
  "graduated",
  "archived",
]);

export const MaturityEntrySchema = Schema.object({
  phase: MaturityPhaseEnum,
  date: Schema.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Date must be a valid ISO 8601 date or datetime string." },
  ),
  issue: HttpUrlSchema,
});

export const MaturityLogSchema = Schema.array(MaturityEntrySchema)
  .min(1)
  .refine(
    (log) => {
      for (let i = 1; i < log.length; i++) {
        const prev = Date.parse(log[i - 1].date);
        const curr = Date.parse(log[i].date);
        if (!isNaN(prev) && !isNaN(curr) && curr < prev) {
          return false;
        }
      }
      return true;
    },
    { message: "Maturity log entries must be in chronological order." },
  );

export const RepositoryEntrySchema = Schema.object({
  url: HttpUrlSchema,
  tags: Schema.array(Schema.string().min(1)).optional(),
  primary: Schema.boolean().optional(),
});

export const RepositoriesSchema = Schema.array(
  Schema.union([HttpUrlSchema, RepositoryEntrySchema]),
)
  .min(1)
  .refine(
    (repos) => {
      const primaries = repos.filter(
        (r) => typeof r === "object" && r !== null && r.primary === true,
      );
      return primaries.length <= 1;
    },
    { message: "At most one repository may be marked as primary." },
  );

export const SocialSchema = Schema.record(Schema.string(), HttpUrlSchema);

export const AuditSchema = Schema.object({
  date: Schema.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Date must be a valid ISO 8601 date or datetime string." },
  ),
  type: Schema.string().min(1),
  url: HttpUrlSchema,
});

export const SecurityContactSchema = Schema.object({
  email: Schema.string().email().optional(),
  advisory_url: Schema.string()
    .regex(/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/.+/)
    .optional(),
}).refine(
  (contact) => Boolean(contact.email || contact.advisory_url),
  {
    message:
      "At least one of email or advisory_url must be provided when security contact section is present.",
  },
);

export const SecurityConfigSchema = Schema.object({
  policy: PathRefSchema.optional(),
  threat_model: PathRefSchema.optional(),
  contact: SecurityContactSchema.optional(),
});

export const MaintainerLifecycleSchema = Schema.object({
  onboarding_doc: PathRefSchema.optional(),
  progression_ladder: PathRefSchema.optional(),
  mentoring_program: Schema.array(HttpUrlSchema).optional(),
  offboarding_policy: PathRefSchema.optional(),
});

export const GovernanceConfigSchema = Schema.object({
  contributing: PathRefSchema.optional(),
  codeowners: PathRefSchema.optional(),
  governance_doc: PathRefSchema.optional(),
  gitvote_config: PathRefSchema.optional(),
  vendor_neutrality_statement: PathRefSchema.optional(),
  decision_making_process: PathRefSchema.optional(),
  roles_and_teams: PathRefSchema.optional(),
  code_of_conduct: PathRefSchema.optional(),
  sub_project_list: PathRefSchema.optional(),
  sub_project_docs: PathRefSchema.optional(),
  contributor_ladder: PathRefSchema.optional(),
  change_process: PathRefSchema.optional(),
  comms_channels: PathRefSchema.optional(),
  community_calendar: PathRefSchema.optional(),
  contributor_guide: PathRefSchema.optional(),
  maintainer_lifecycle: MaintainerLifecycleSchema.optional(),
});

export const IdentityTypeSchema = Schema.object({
  has_dco: Schema.boolean().optional().default(false),
  has_cla: Schema.boolean().optional(),
  cla_only: Schema.boolean().optional(),
  dco_url: PathRefSchema.optional(),
  cla_url: PathRefSchema.optional(),
}).refine(
  (id) => {
    if (id.cla_only && !id.has_cla) {
      return false;
    }
    if (id.has_cla && !id.cla_only && !id.has_dco) {
      return false;
    }
    return true;
  },
  {
    message:
      "Invalid CLA/DCO combination. has_cla requires has_dco to be true unless cla_only is true, and cla_only requires has_cla to be true.",
  },
);

export const LegalConfigSchema = Schema.object({
  license: PathRefSchema.optional(),
  identity_type: IdentityTypeSchema.optional(),
});

export const DocumentationConfigSchema = Schema.object({
  readme: PathRefSchema.optional(),
  support: PathRefSchema.optional(),
  architecture: PathRefSchema.optional(),
  api: PathRefSchema.optional(),
});

export const LandscapeConfigSchema = Schema.object({
  category: Schema.string().min(1),
  subcategory: Schema.string().min(1),
});

/* -------------------------------------------------------------------------- */
/*                            Project Config Schema                           */
/* -------------------------------------------------------------------------- */

export const ProjectConfig = Schema.object({
  schemaVersion: SchemaVersionSchema,
  slug: SlugSchema,
  name: Schema.string().min(1),
  description: Schema.string().min(1),
  type: Schema.enum(["project:meta", "project:code", "project:meta+code"])
    .default("project:code"),
  package_managers: PackageManagersSchema.optional(),
  project_lead: ProjectLeadSchema.optional(),
  slack_channels: SlackChannelsSchema.optional(),
  maturityLog: MaturityLogSchema,
  repositories: RepositoriesSchema,
  website: HttpUrlSchema.optional(),
  adopters: PathRefSchema.optional(),
  artwork: HttpUrlSchema.optional(),
  social: SocialSchema.optional(),
  mailing_lists: Schema.array(Schema.string().min(1)).optional(),
  audits: Schema.array(AuditSchema).optional(),
  security: SecurityConfigSchema.optional(),
  governance: GovernanceConfigSchema.optional(),
  legal: LegalConfigSchema.optional(),
  documentation: DocumentationConfigSchema.optional(),
  landscape: LandscapeConfigSchema.optional(),
}).register(configReg, {
  urn: "model:config.project.meta",
  key: "project",
  title: "Project Meta Configuration",
  description: "project meta specification schema.",
  grouping: ["project", ".project", ".project/", ".project/meta"],
  moduleUrl: import.meta.url,
});

export type Project = Schema.infer<typeof ProjectConfig>;

/** Strongly-typed `defineProjectConfig` for authoring a `project.config.ts` file. */
export const defineProjectConfig = createDefineConfig(ProjectConfig);
