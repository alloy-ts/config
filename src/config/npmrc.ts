import * as Schema from "../schema.ts";
import { seedScopeStore } from "../config.ts";

const NPMRC_GROUP_ID = "npmrc";
const NPMRC_GROUP_URN = "urn:config:npmrc";

export const _authSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"_auth"}`,
  key: "_auth",
  groupId: NPMRC_GROUP_ID,
  title: "_auth",
  description: "A basic-auth string to use when authenticating against the npm registry.",
});

export const accessSchema = Schema.config(
  Schema.union([Schema.enum(["restricted", "public", "private"]), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"access"}`,
  key: "access",
  groupId: NPMRC_GROUP_ID,
  title: "Access",
  description:
    "If you do not want your scoped package to be publicly viewable set --access=restricted.",
});

export const allSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"all"}`,
  key: "all",
  groupId: NPMRC_GROUP_ID,
  title: "All",
  description: "Show or act on all packages, not just the ones your project directly depends on.",
});

export const allowDirectorySchema = Schema.config(Schema.enum(["all", "none", "root"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-directory"}`,
  key: "allow-directory",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-directory",
  description: "Limits the ability for npm to install dependencies from directories.",
});

export const allowFileSchema = Schema.config(Schema.enum(["all", "none", "root"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-file"}`,
  key: "allow-file",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-file",
  description: "Limits the ability for npm to install dependencies from tarball files.",
});

export const allowGitSchema = Schema.config(Schema.enum(["all", "none", "root"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-git"}`,
  key: "allow-git",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-git",
  description: "Limits the ability for npm to fetch dependencies from git references.",
});

export const allowRemoteSchema = Schema.config(Schema.enum(["all", "none", "root"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-remote"}`,
  key: "allow-remote",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-remote",
  description: "Limits the ability for npm to fetch dependencies from urls.",
});

export const allowSameVersionSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-same-version"}`,
  key: "allow-same-version",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-same-version",
  description:
    "Prevents throwing an error when npm version is used to set the new version to the same value as current.",
});

export const allowScriptsSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-scripts"}`,
  key: "allow-scripts",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-scripts",
  description:
    "Comma-separated list of packages whose install-time lifecycle scripts are allowed to run.",
});

export const allowScriptsPendingSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-scripts-pending"}`,
  key: "allow-scripts-pending",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-scripts-pending",
  description:
    "List packages with install scripts that are not yet covered by the allowScripts policy.",
});

export const allowScriptsPinSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"allow-scripts-pin"}`,
  key: "allow-scripts-pin",
  groupId: NPMRC_GROUP_ID,
  title: "Allow-scripts-pin",
  description: "Write pinned (pkg@version) entries when approving install scripts.",
});

export const auditSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"audit"}`,
  key: "audit",
  groupId: NPMRC_GROUP_ID,
  title: "Audit",
  description: "When true submit audit reports alongside current npm command.",
});

export const auditLevelSchema = Schema.config(
  Schema.union([
    Schema.enum(["info", "low", "moderate", "high", "critical", "none"]),
    Schema.null(),
  ]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"audit-level"}`,
  key: "audit-level",
  groupId: NPMRC_GROUP_ID,
  title: "Audit-level",
  description: "The minimum level of vulnerability for npm audit to exit with a non-zero code.",
});

export const authTypeSchema = Schema.config(Schema.enum(["legacy", "web"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"auth-type"}`,
  key: "auth-type",
  groupId: NPMRC_GROUP_ID,
  title: "Auth-type",
  description: "What authentication strategy to use with login.",
});

export const beforeSchema = Schema.config(
  Schema.union([Schema.string(), Schema.date(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"before"}`,
  key: "before",
  groupId: NPMRC_GROUP_ID,
  title: "Before",
  description:
    "Rebuild the npm tree such that only versions available on or before date are installed.",
});

export const binLinksSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"bin-links"}`,
  key: "bin-links",
  groupId: NPMRC_GROUP_ID,
  title: "Bin-links",
  description: "Tells npm to create symlinks for package executables.",
});

export const npmrcBrowserSchema = Schema.config(
  Schema.union([Schema.string(), Schema.boolean(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"browser"}`,
  key: "browser",
  groupId: NPMRC_GROUP_ID,
  title: "Browser",
  description: "The browser that is called by npm commands to open websites.",
});

export const bypass2faSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"bypass-2fa"}`,
  key: "bypass-2fa",
  groupId: NPMRC_GROUP_ID,
  title: "Bypass-2fa",
  description: "Allow granular access token to bypass 2fa.",
});

export const caSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string()), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"ca"}`,
  key: "ca",
  groupId: NPMRC_GROUP_ID,
  title: "Ca",
  description: "Certificate Authority signing certificate that is trusted for SSL connections.",
});

export const cacheSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"cache"}`,
  key: "cache",
  groupId: NPMRC_GROUP_ID,
  title: "Cache",
  description: "The location of npm cache directory.",
});

export const cafileSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"cafile"}`,
  key: "cafile",
  groupId: NPMRC_GROUP_ID,
  title: "Cafile",
  description: "Path to a file containing CA signing certificates.",
});

export const callSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"call"}`,
  key: "call",
  groupId: NPMRC_GROUP_ID,
  title: "Call",
  description: "Companion option for npm exec, npx specifying a custom command.",
});

export const cidrSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string()), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"cidr"}`,
  key: "cidr",
  groupId: NPMRC_GROUP_ID,
  title: "Cidr",
  description: "List of CIDR addresses to use with npm token create.",
});

export const colorSchema = Schema.config(
  Schema.union([Schema.boolean(), Schema.literal("always")]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"color"}`,
  key: "color",
  groupId: NPMRC_GROUP_ID,
  title: "Color",
  description: "If false, never shows colors. If always then always shows colors.",
});

export const commitHooksSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"commit-hooks"}`,
  key: "commit-hooks",
  groupId: NPMRC_GROUP_ID,
  title: "Commit-hooks",
  description: "Run git commit hooks when using npm version.",
});

export const npmrcCpuSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"cpu"}`,
  key: "cpu",
  groupId: NPMRC_GROUP_ID,
  title: "Cpu",
  description: "Override CPU architecture of native modules to install.",
});

export const dangerouslyAllowAllScriptsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"dangerously-allow-all-scripts"}`,
  key: "dangerously-allow-all-scripts",
  groupId: NPMRC_GROUP_ID,
  title: "Dangerously-allow-all-scripts",
  description: "If true, bypass allowScripts policy entirely.",
});

export const depthSchema = Schema.config(Schema.union([Schema.number(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"depth"}`,
  key: "depth",
  groupId: NPMRC_GROUP_ID,
  title: "Depth",
  description: "The depth to go when recursing packages for npm ls.",
});

export const npmrcDescriptionSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"description"}`,
  key: "description",
  groupId: NPMRC_GROUP_ID,
  title: "Description",
  description: "Show description in npm search.",
});

export const diffSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff"}`,
  key: "diff",
  groupId: NPMRC_GROUP_ID,
  title: "Diff",
  description: "Define arguments to compare in npm diff.",
});

export const diffDstPrefixSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-dst-prefix"}`,
  key: "diff-dst-prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-dst-prefix",
  description: "Destination prefix to be used in npm diff output.",
});

export const diffIgnoreAllSpaceSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-ignore-all-space"}`,
  key: "diff-ignore-all-space",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-ignore-all-space",
  description: "Ignore whitespace when comparing lines in npm diff.",
});

export const diffNameOnlySchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-name-only"}`,
  key: "diff-name-only",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-name-only",
  description: "Prints only filenames when using npm diff.",
});

export const diffNoPrefixSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-no-prefix"}`,
  key: "diff-no-prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-no-prefix",
  description: "Do not show source or destination prefix in npm diff.",
});

export const diffSrcPrefixSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-src-prefix"}`,
  key: "diff-src-prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-src-prefix",
  description: "Source prefix to be used in npm diff output.",
});

export const diffTextSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-text"}`,
  key: "diff-text",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-text",
  description: "Treat all files as text in npm diff.",
});

export const diffUnifiedSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"diff-unified"}`,
  key: "diff-unified",
  groupId: NPMRC_GROUP_ID,
  title: "Diff-unified",
  description: "Number of lines of context to print in npm diff.",
});

export const dryRunSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"dry-run"}`,
  key: "dry-run",
  groupId: NPMRC_GROUP_ID,
  title: "Dry-run",
  description: "Indicates that you don not want npm to make any changes.",
});

export const editorSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"editor"}`,
  key: "editor",
  groupId: NPMRC_GROUP_ID,
  title: "Editor",
  description: "The command to run for npm edit and npm config edit.",
});

export const engineStrictSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"engine-strict"}`,
  key: "engine-strict",
  groupId: NPMRC_GROUP_ID,
  title: "Engine-strict",
  description: "Refuse to install package if engine is incompatible with Node.",
});

export const expectResultCountSchema = Schema.config(
  Schema.union([Schema.number(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"expect-result-count"}`,
  key: "expect-result-count",
  groupId: NPMRC_GROUP_ID,
  title: "Expect-result-count",
  description: "Tells to expect a specific number of results.",
});

export const expectResultsSchema = Schema.config(
  Schema.union([Schema.boolean(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"expect-results"}`,
  key: "expect-results",
  groupId: NPMRC_GROUP_ID,
  title: "Expect-results",
  description: "Tells npm whether or not to expect results.",
});

export const expiresSchema = Schema.config(Schema.union([Schema.number(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"expires"}`,
  key: "expires",
  groupId: NPMRC_GROUP_ID,
  title: "Expires",
  description: "Sets token expiration in days when using npm token create.",
});

export const fetchRetriesSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fetch-retries"}`,
  key: "fetch-retries",
  groupId: NPMRC_GROUP_ID,
  title: "Fetch-retries",
  description: "Retries config when fetching packages.",
});

export const fetchRetryFactorSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fetch-retry-factor"}`,
  key: "fetch-retry-factor",
  groupId: NPMRC_GROUP_ID,
  title: "Fetch-retry-factor",
  description: "Factor config for retry module when fetching packages.",
});

export const fetchRetryMaxtimeoutSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fetch-retry-maxtimeout"}`,
  key: "fetch-retry-maxtimeout",
  groupId: NPMRC_GROUP_ID,
  title: "Fetch-retry-maxtimeout",
  description: "Max timeout config for retry module.",
});

export const fetchRetryMintimeoutSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fetch-retry-mintimeout"}`,
  key: "fetch-retry-mintimeout",
  groupId: NPMRC_GROUP_ID,
  title: "Fetch-retry-mintimeout",
  description: "Min timeout config for retry module.",
});

export const fetchTimeoutSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fetch-timeout"}`,
  key: "fetch-timeout",
  groupId: NPMRC_GROUP_ID,
  title: "Fetch-timeout",
  description: "Max amount of time to wait for HTTP requests.",
});

export const forceSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"force"}`,
  key: "force",
  groupId: NPMRC_GROUP_ID,
  title: "Force",
  description: "Removes protections against unfortunate side effects.",
});

export const foregroundScriptsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"foreground-scripts"}`,
  key: "foreground-scripts",
  groupId: NPMRC_GROUP_ID,
  title: "Foreground-scripts",
  description: "Run build scripts in foreground process.",
});

export const formatPackageLockSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"format-package-lock"}`,
  key: "format-package-lock",
  groupId: NPMRC_GROUP_ID,
  title: "Format-package-lock",
  description: "Format package-lock.json as human readable file.",
});

export const fundSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"fund"}`,
  key: "fund",
  groupId: NPMRC_GROUP_ID,
  title: "Fund",
  description: "Display message acknowledging dependencies looking for funding.",
});

export const gitSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"git"}`,
  key: "git",
  groupId: NPMRC_GROUP_ID,
  title: "Git",
  description: "Command to use for git commands.",
});

export const gitTagVersionSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"git-tag-version"}`,
  key: "git-tag-version",
  groupId: NPMRC_GROUP_ID,
  title: "Git-tag-version",
  description: "Tag commit when using npm version.",
});

export const globalSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"global"}`,
  key: "global",
  groupId: NPMRC_GROUP_ID,
  title: "Global",
  description: "Operates in global mode.",
});

export const globalconfigSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"globalconfig"}`,
  key: "globalconfig",
  groupId: NPMRC_GROUP_ID,
  title: "Globalconfig",
  description: "Config file to read for global config options.",
});

export const headingSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"heading"}`,
  key: "heading",
  groupId: NPMRC_GROUP_ID,
  title: "Heading",
  description: "String starting debugging log output.",
});

export const httpsProxySchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"https-proxy"}`,
  key: "https-proxy",
  groupId: NPMRC_GROUP_ID,
  title: "Https-proxy",
  description: "Proxy to use for outgoing https requests.",
});

export const ifPresentSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"if-present"}`,
  key: "if-present",
  groupId: NPMRC_GROUP_ID,
  title: "If-present",
  description: "Do not exit with error code if script is missing in run.",
});

export const ignoreScriptsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"ignore-scripts"}`,
  key: "ignore-scripts",
  groupId: NPMRC_GROUP_ID,
  title: "Ignore-scripts",
  description: "If true, npm does not run scripts in package.json.",
});

export const includeSchema = Schema.config(
  Schema.union([
    Schema.enum(["prod", "dev", "optional", "peer"]),
    Schema.array(Schema.enum(["prod", "dev", "optional", "peer"])),
  ]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"include"}`,
  key: "include",
  groupId: NPMRC_GROUP_ID,
  title: "Include",
  description: "Types of dependencies to install.",
});

export const includeAttestationsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"include-attestations"}`,
  key: "include-attestations",
  groupId: NPMRC_GROUP_ID,
  title: "Include-attestations",
  description: "Includes sigstore attestation bundles in JSON output.",
});

export const includeStagedSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"include-staged"}`,
  key: "include-staged",
  groupId: NPMRC_GROUP_ID,
  title: "Include-staged",
  description: "Allow installing staged published packages.",
});

export const includeWorkspaceRootSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"include-workspace-root"}`,
  key: "include-workspace-root",
  groupId: NPMRC_GROUP_ID,
  title: "Include-workspace-root",
  description: "Include workspace root when workspaces are enabled.",
});

export const initAuthorEmailSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-author-email"}`,
  key: "init-author-email",
  groupId: NPMRC_GROUP_ID,
  title: "Init-author-email",
  description: "Default author email for npm init.",
});

export const initAuthorNameSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-author-name"}`,
  key: "init-author-name",
  groupId: NPMRC_GROUP_ID,
  title: "Init-author-name",
  description: "Default author name for npm init.",
});

export const initAuthorUrlSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-author-url"}`,
  key: "init-author-url",
  groupId: NPMRC_GROUP_ID,
  title: "Init-author-url",
  description: "Default author homepage for npm init.",
});

export const initLicenseSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-license"}`,
  key: "init-license",
  groupId: NPMRC_GROUP_ID,
  title: "Init-license",
  description: "Default license for npm init.",
});

export const initModuleSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-module"}`,
  key: "init-module",
  groupId: NPMRC_GROUP_ID,
  title: "Init-module",
  description: "Module loaded by npm init.",
});

export const initPrivateSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-private"}`,
  key: "init-private",
  groupId: NPMRC_GROUP_ID,
  title: "Init-private",
  description: "Default private flag for npm init.",
});

export const initTypeSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-type"}`,
  key: "init-type",
  groupId: NPMRC_GROUP_ID,
  title: "Init-type",
  description: "Default package.json type field for npm init.",
});

export const initVersionSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init-version"}`,
  key: "init-version",
  groupId: NPMRC_GROUP_ID,
  title: "Init-version",
  description: "Default package version for npm init.",
});

export const installLinksSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"install-links"}`,
  key: "install-links",
  groupId: NPMRC_GROUP_ID,
  title: "Install-links",
  description: "Pack and install file protocol dependencies as regular deps.",
});

export const installStrategySchema = Schema.config(
  Schema.enum(["hoisted", "nested", "shallow", "linked"]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"install-strategy"}`,
  key: "install-strategy",
  groupId: NPMRC_GROUP_ID,
  title: "Install-strategy",
  description: "Sets strategy for installing packages in node_modules.",
});

export const jsonSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"json"}`,
  key: "json",
  groupId: NPMRC_GROUP_ID,
  title: "Json",
  description: "Output JSON data rather than normal output.",
});

export const legacyPeerDepsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"legacy-peer-deps"}`,
  key: "legacy-peer-deps",
  groupId: NPMRC_GROUP_ID,
  title: "Legacy-peer-deps",
  description: "Completely ignore peerDependencies when building package tree.",
});

export const npmrcLibcSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"libc"}`,
  key: "libc",
  groupId: NPMRC_GROUP_ID,
  title: "Libc",
  description: "Override libc of native modules to install.",
});

export const linkSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"link"}`,
  key: "link",
  groupId: NPMRC_GROUP_ID,
  title: "Link",
  description: "Limit output in npm ls to linked packages.",
});

export const localAddressSchema = Schema.config(
  Schema.union([Schema.string(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"local-address"}`,
  key: "local-address",
  groupId: NPMRC_GROUP_ID,
  title: "Local-address",
  description: "IP address of local interface to use when connecting.",
});

export const locationSchema = Schema.config(Schema.enum(["global", "user", "project"])).meta({
  urn: `${NPMRC_GROUP_URN}.${"location"}`,
  key: "location",
  groupId: NPMRC_GROUP_ID,
  title: "Location",
  description: "Refers to which config file to use.",
});

export const lockfileVersionSchema = Schema.config(
  Schema.union([Schema.number(), Schema.string(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"lockfile-version"}`,
  key: "lockfile-version",
  groupId: NPMRC_GROUP_ID,
  title: "Lockfile-version",
  description: "Set lockfile format version.",
});

export const loglevelSchema = Schema.config(
  Schema.enum(["silent", "error", "warn", "notice", "http", "info", "verbose", "silly"]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"loglevel"}`,
  key: "loglevel",
  groupId: NPMRC_GROUP_ID,
  title: "Loglevel",
  description: "What level of logs to report.",
});

export const logsDirSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"logs-dir"}`,
  key: "logs-dir",
  groupId: NPMRC_GROUP_ID,
  title: "Logs-dir",
  description: "Location of npm log directory.",
});

export const logsMaxSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"logs-max"}`,
  key: "logs-max",
  groupId: NPMRC_GROUP_ID,
  title: "Logs-max",
  description: "Maximum number of log files to store.",
});

export const longSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"long"}`,
  key: "long",
  groupId: NPMRC_GROUP_ID,
  title: "Long",
  description: "Show extended information in ls, search, and help-search.",
});

export const maxsocketsSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"maxsockets"}`,
  key: "maxsockets",
  groupId: NPMRC_GROUP_ID,
  title: "Maxsockets",
  description: "Maximum number of connections per origin.",
});

export const messageSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"message"}`,
  key: "message",
  groupId: NPMRC_GROUP_ID,
  title: "Message",
  description: "Commit message used by npm version.",
});

export const minReleaseAgeSchema = Schema.config(
  Schema.union([Schema.number(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"min-release-age"}`,
  key: "min-release-age",
  groupId: NPMRC_GROUP_ID,
  title: "Min-release-age",
  description: "Only install versions available more than given number of days ago.",
});

export const minReleaseAgeExcludeSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"min-release-age-exclude"}`,
  key: "min-release-age-exclude",
  groupId: NPMRC_GROUP_ID,
  title: "Min-release-age-exclude",
  description: "List of package names or glob patterns exempt from min-release-age filter.",
});

export const npmrcNameSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"name"}`,
  key: "name",
  groupId: NPMRC_GROUP_ID,
  title: "Name",
  description: "Set name/description for token when creating granular token.",
});

export const nodeGypSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"node-gyp"}`,
  key: "node-gyp",
  groupId: NPMRC_GROUP_ID,
  title: "Node-gyp",
  description: "Location of node-gyp binary.",
});

export const nodeOptionsSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta(
  {
    urn: `${NPMRC_GROUP_URN}.${"node-options"}`,
    key: "node-options",
    groupId: NPMRC_GROUP_ID,
    title: "Node-options",
    description: "Options to pass through to Node via NODE_OPTIONS.",
  },
);

export const noproxySchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"noproxy"}`,
  key: "noproxy",
  groupId: NPMRC_GROUP_ID,
  title: "Noproxy",
  description: "Domain extensions that should bypass proxies.",
});

export const offlineSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"offline"}`,
  key: "offline",
  groupId: NPMRC_GROUP_ID,
  title: "Offline",
  description: "Force offline mode.",
});

export const omitSchema = Schema.config(
  Schema.union([
    Schema.enum(["dev", "optional", "peer"]),
    Schema.array(Schema.enum(["dev", "optional", "peer"])),
  ]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"omit"}`,
  key: "omit",
  groupId: NPMRC_GROUP_ID,
  title: "Omit",
  description: "Dependency types to omit from installation tree.",
});

export const omitLockfileRegistryResolvedSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"omit-lockfile-registry-resolved"}`,
  key: "omit-lockfile-registry-resolved",
  groupId: NPMRC_GROUP_ID,
  title: "Omit-lockfile-registry-resolved",
  description: "Create lock files without resolved key for registry deps.",
});

export const orgsSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string()), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"orgs"}`,
  key: "orgs",
  groupId: NPMRC_GROUP_ID,
  title: "Orgs",
  description: "Limit token access to specific organizations.",
});

export const orgsPermissionSchema = Schema.config(
  Schema.union([Schema.enum(["read-only", "read-write", "no-access"]), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"orgs-permission"}`,
  key: "orgs-permission",
  groupId: NPMRC_GROUP_ID,
  title: "Orgs-permission",
  description: "Permission level for organizations when creating token.",
});

export const npmrcOsSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"os"}`,
  key: "os",
  groupId: NPMRC_GROUP_ID,
  title: "Os",
  description: "Override OS of native modules to install.",
});

export const otpSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"otp"}`,
  key: "otp",
  groupId: NPMRC_GROUP_ID,
  title: "Otp",
  description: "One-time password from 2FA authenticator.",
});

export const packDestinationSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"pack-destination"}`,
  key: "pack-destination",
  groupId: NPMRC_GROUP_ID,
  title: "Pack-destination",
  description: "Directory in which npm pack saves tarballs.",
});

export const packageSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"package"}`,
  key: "package",
  groupId: NPMRC_GROUP_ID,
  title: "Package",
  description: "Package or packages to install for npm exec.",
});

export const packageLockSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"package-lock"}`,
  key: "package-lock",
  groupId: NPMRC_GROUP_ID,
  title: "Package-lock",
  description: "Ignore package-lock.json if false.",
});

export const packageLockOnlySchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"package-lock-only"}`,
  key: "package-lock-only",
  groupId: NPMRC_GROUP_ID,
  title: "Package-lock-only",
  description: "Only use package-lock.json ignoring node_modules.",
});

export const packagesSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string()), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"packages"}`,
  key: "packages",
  groupId: NPMRC_GROUP_ID,
  title: "Packages",
  description: "Limit token access to specific packages.",
});

export const packagesAllSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"packages-all"}`,
  key: "packages-all",
  groupId: NPMRC_GROUP_ID,
  title: "Packages-all",
  description: "Grants token access to all packages.",
});

export const packagesAndScopesPermissionSchema = Schema.config(
  Schema.union([
    Schema.enum(["read-only", "read-write", "read-write-stage-only", "no-access"]),
    Schema.null(),
  ]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"packages-and-scopes-permission"}`,
  key: "packages-and-scopes-permission",
  groupId: NPMRC_GROUP_ID,
  title: "Packages-and-scopes-permission",
  description: "Permission level for packages and scopes.",
});

export const parseableSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"parseable"}`,
  key: "parseable",
  groupId: NPMRC_GROUP_ID,
  title: "Parseable",
  description: "Output parseable results.",
});

export const passwordSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"password"}`,
  key: "password",
  groupId: NPMRC_GROUP_ID,
  title: "Password",
  description: "Password for authentication.",
});

export const preferDedupeSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"prefer-dedupe"}`,
  key: "prefer-dedupe",
  groupId: NPMRC_GROUP_ID,
  title: "Prefer-dedupe",
  description: "Prefer to deduplicate packages if possible.",
});

export const preferOfflineSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"prefer-offline"}`,
  key: "prefer-offline",
  groupId: NPMRC_GROUP_ID,
  title: "Prefer-offline",
  description: "Bypass staleness checks for cached data.",
});

export const preferOnlineSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"prefer-online"}`,
  key: "prefer-online",
  groupId: NPMRC_GROUP_ID,
  title: "Prefer-online",
  description: "Force staleness checks for cached data.",
});

export const prefixSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"prefix"}`,
  key: "prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Prefix",
  description: "Location to install global items.",
});

export const preidSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"preid"}`,
  key: "preid",
  groupId: NPMRC_GROUP_ID,
  title: "Preid",
  description: "Prerelease identifier prefix for semver.",
});

export const progressSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"progress"}`,
  key: "progress",
  groupId: NPMRC_GROUP_ID,
  title: "Progress",
  description: "Display progress bar during operations.",
});

export const provenanceSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"provenance"}`,
  key: "provenance",
  groupId: NPMRC_GROUP_ID,
  title: "Provenance",
  description: "Publicly link package to build/publish location in cloud CI.",
});

export const provenanceFileSchema = Schema.config(
  Schema.union([Schema.string(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"provenance-file"}`,
  key: "provenance-file",
  groupId: NPMRC_GROUP_ID,
  title: "Provenance-file",
  description: "Path to provenance bundle.",
});

export const proxySchema = Schema.config(
  Schema.union([Schema.string(), Schema.literal(false), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"proxy"}`,
  key: "proxy",
  groupId: NPMRC_GROUP_ID,
  title: "Proxy",
  description: "Proxy to use for outgoing http requests.",
});

export const readOnlySchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"read-only"}`,
  key: "read-only",
  groupId: NPMRC_GROUP_ID,
  title: "Read-only",
  description: "Mark token as unable to publish.",
});

export const rebuildBundleSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"rebuild-bundle"}`,
  key: "rebuild-bundle",
  groupId: NPMRC_GROUP_ID,
  title: "Rebuild-bundle",
  description: "Rebuild bundled dependencies after install.",
});

export const registrySchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"registry"}`,
  key: "registry",
  groupId: NPMRC_GROUP_ID,
  title: "Registry",
  description: "Base URL of npm registry.",
});

export const replaceRegistryHostSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"replace-registry-host"}`,
  key: "replace-registry-host",
  groupId: NPMRC_GROUP_ID,
  title: "Replace-registry-host",
  description: "Behavior for replacing registry host in lockfile.",
});

export const saveSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save"}`,
  key: "save",
  groupId: NPMRC_GROUP_ID,
  title: "Save",
  description: "Save installed packages to package.json.",
});

export const saveBundleSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-bundle"}`,
  key: "save-bundle",
  groupId: NPMRC_GROUP_ID,
  title: "Save-bundle",
  description: "Put saved packages into bundleDependencies.",
});

export const saveDevSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-dev"}`,
  key: "save-dev",
  groupId: NPMRC_GROUP_ID,
  title: "Save-dev",
  description: "Save installed packages to devDependencies.",
});

export const saveExactSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-exact"}`,
  key: "save-exact",
  groupId: NPMRC_GROUP_ID,
  title: "Save-exact",
  description: "Configure exact version when saving dependencies.",
});

export const saveOptionalSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-optional"}`,
  key: "save-optional",
  groupId: NPMRC_GROUP_ID,
  title: "Save-optional",
  description: "Save installed packages to optionalDependencies.",
});

export const savePeerSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-peer"}`,
  key: "save-peer",
  groupId: NPMRC_GROUP_ID,
  title: "Save-peer",
  description: "Save installed packages to peerDependencies.",
});

export const savePrefixSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-prefix"}`,
  key: "save-prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Save-prefix",
  description: "Version prefix when saving to package.json.",
});

export const saveProdSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"save-prod"}`,
  key: "save-prod",
  groupId: NPMRC_GROUP_ID,
  title: "Save-prod",
  description: "Save installed packages to dependencies specifically.",
});

export const sbomFormatSchema = Schema.config(
  Schema.union([Schema.enum(["cyclonedx", "spdx"]), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"sbom-format"}`,
  key: "sbom-format",
  groupId: NPMRC_GROUP_ID,
  title: "Sbom-format",
  description: "SBOM format to use when generating SBOMs.",
});

export const sbomTypeSchema = Schema.config(
  Schema.enum(["library", "application", "framework"]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"sbom-type"}`,
  key: "sbom-type",
  groupId: NPMRC_GROUP_ID,
  title: "Sbom-type",
  description: "Type of package described by generated SBOM.",
});

export const scopeSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"scope"}`,
  key: "scope",
  groupId: NPMRC_GROUP_ID,
  title: "Scope",
  description: "Associate operation with a scope.",
});

export const scopesSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string()), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"scopes"}`,
  key: "scopes",
  groupId: NPMRC_GROUP_ID,
  title: "Scopes",
  description: "Limit token access to specific scopes.",
});

export const scriptShellSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta(
  {
    urn: `${NPMRC_GROUP_URN}.${"script-shell"}`,
    key: "script-shell",
    groupId: NPMRC_GROUP_ID,
    title: "Script-shell",
    description: "Shell to use for running scripts.",
  },
);

export const searchexcludeSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"searchexclude"}`,
  key: "searchexclude",
  groupId: NPMRC_GROUP_ID,
  title: "Searchexclude",
  description: "Space-separated options limiting search results.",
});

export const searchlimitSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"searchlimit"}`,
  key: "searchlimit",
  groupId: NPMRC_GROUP_ID,
  title: "Searchlimit",
  description: "Number of items to limit search results.",
});

export const searchoptsSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"searchopts"}`,
  key: "searchopts",
  groupId: NPMRC_GROUP_ID,
  title: "Searchopts",
  description: "Space-separated options passed to search.",
});

export const searchstalenessSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"searchstaleness"}`,
  key: "searchstaleness",
  groupId: NPMRC_GROUP_ID,
  title: "Searchstaleness",
  description: "Age of cache in seconds before new request.",
});

export const shellSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"shell"}`,
  key: "shell",
  groupId: NPMRC_GROUP_ID,
  title: "Shell",
  description: "Shell to run for npm explore.",
});

export const signGitCommitSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"sign-git-commit"}`,
  key: "sign-git-commit",
  groupId: NPMRC_GROUP_ID,
  title: "Sign-git-commit",
  description: "Commit new package version using git signature.",
});

export const signGitTagSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"sign-git-tag"}`,
  key: "sign-git-tag",
  groupId: NPMRC_GROUP_ID,
  title: "Sign-git-tag",
  description: "Tag version using git signature.",
});

export const strictAllowScriptsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"strict-allow-scripts"}`,
  key: "strict-allow-scripts",
  groupId: NPMRC_GROUP_ID,
  title: "Strict-allow-scripts",
  description: "Turn install-script policy into a hard error.",
});

export const strictPeerDepsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"strict-peer-deps"}`,
  key: "strict-peer-deps",
  groupId: NPMRC_GROUP_ID,
  title: "Strict-peer-deps",
  description: "Treat conflicting peerDependencies as install failure.",
});

export const strictSslSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"strict-ssl"}`,
  key: "strict-ssl",
  groupId: NPMRC_GROUP_ID,
  title: "Strict-ssl",
  description: "Whether to do SSL key validation.",
});

export const tagSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"tag"}`,
  key: "tag",
  groupId: NPMRC_GROUP_ID,
  title: "Tag",
  description: "Tag to install if version is unspecified.",
});

export const tagVersionPrefixSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"tag-version-prefix"}`,
  key: "tag-version-prefix",
  groupId: NPMRC_GROUP_ID,
  title: "Tag-version-prefix",
  description: "Prefix used when tagging new version.",
});

export const timingSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"timing"}`,
  key: "timing",
  groupId: NPMRC_GROUP_ID,
  title: "Timing",
  description: "Write timing information to json file.",
});

export const tokenDescriptionSchema = Schema.config(
  Schema.union([Schema.string(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"token-description"}`,
  key: "token-description",
  groupId: NPMRC_GROUP_ID,
  title: "Token-description",
  description: "Description text for token in npm token create.",
});

export const umaskSchema = Schema.config(Schema.union([Schema.string(), Schema.number()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"umask"}`,
  key: "umask",
  groupId: NPMRC_GROUP_ID,
  title: "Umask",
  description: "Umask value when setting file creation mode.",
});

export const unicodeSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"unicode"}`,
  key: "unicode",
  groupId: NPMRC_GROUP_ID,
  title: "Unicode",
  description: "Use unicode characters in tree output.",
});

export const updateNotifierSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"update-notifier"}`,
  key: "update-notifier",
  groupId: NPMRC_GROUP_ID,
  title: "Update-notifier",
  description: "Suppress update notification if false.",
});

export const usageSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"usage"}`,
  key: "usage",
  groupId: NPMRC_GROUP_ID,
  title: "Usage",
  description: "Show short usage output about command.",
});

export const userAgentSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"user-agent"}`,
  key: "user-agent",
  groupId: NPMRC_GROUP_ID,
  title: "User-agent",
  description: "Sets User-Agent request header.",
});

export const userconfigSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"userconfig"}`,
  key: "userconfig",
  groupId: NPMRC_GROUP_ID,
  title: "Userconfig",
  description: "Location of user-level config settings.",
});

export const npmrcVersionSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"version"}`,
  key: "version",
  groupId: NPMRC_GROUP_ID,
  title: "Version",
  description: "Output npm version and exit.",
});

export const versionsSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"versions"}`,
  key: "versions",
  groupId: NPMRC_GROUP_ID,
  title: "Versions",
  description: "Output npm version and process.versions.",
});

export const viewerSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"viewer"}`,
  key: "viewer",
  groupId: NPMRC_GROUP_ID,
  title: "Viewer",
  description: "Program to view help content.",
});

export const whichSchema = Schema.config(Schema.union([Schema.number(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"which"}`,
  key: "which",
  groupId: NPMRC_GROUP_ID,
  title: "Which",
  description: "Which 1-indexed funding source URL to open.",
});

export const workspaceSchema = Schema.config(
  Schema.union([Schema.string(), Schema.array(Schema.string())]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"workspace"}`,
  key: "workspace",
  groupId: NPMRC_GROUP_ID,
  title: "Workspace",
  description: "Enable running command in context of workspaces.",
});

export const npmrcWorkspacesSchema = Schema.config(
  Schema.union([Schema.boolean(), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"workspaces"}`,
  key: "workspaces",
  groupId: NPMRC_GROUP_ID,
  title: "Workspaces",
  description: "Run command in context of all workspaces.",
});

export const workspacesUpdateSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"workspaces-update"}`,
  key: "workspaces-update",
  groupId: NPMRC_GROUP_ID,
  title: "Workspaces-update",
  description: "Run update after operations modifying workspaces.",
});

export const yesSchema = Schema.config(Schema.union([Schema.boolean(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"yes"}`,
  key: "yes",
  groupId: NPMRC_GROUP_ID,
  title: "Yes",
  description: "Automatically answer yes to prompts.",
});

export const alsoSchema = Schema.config(
  Schema.union([Schema.enum(["dev", "development"]), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"also"}`,
  key: "also",
  groupId: NPMRC_GROUP_ID,
  title: "Also",
  description: "Alias for --include=dev.",
  deprecated: true,
});

export const cacheMaxSchema = Schema.config(
  Schema.union([Schema.number(), Schema.literal(Infinity)]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"cache-max"}`,
  key: "cache-max",
  groupId: NPMRC_GROUP_ID,
  title: "Cache-max",
  description: "Deprecated option in favor of prefer-online.",
  deprecated: true,
});

export const cacheMinSchema = Schema.config(Schema.number()).meta({
  urn: `${NPMRC_GROUP_URN}.${"cache-min"}`,
  key: "cache-min",
  groupId: NPMRC_GROUP_ID,
  title: "Cache-min",
  description: "Deprecated option in favor of prefer-offline.",
  deprecated: true,
});

export const certSchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"cert"}`,
  key: "cert",
  groupId: NPMRC_GROUP_ID,
  title: "Cert",
  description: "Client certificate to pass when accessing registry.",
  deprecated: true,
});

export const devSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"dev"}`,
  key: "dev",
  groupId: NPMRC_GROUP_ID,
  title: "Dev",
  description: "Alias for --include=dev.",
  deprecated: true,
});

export const globalStyleSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"global-style"}`,
  key: "global-style",
  groupId: NPMRC_GROUP_ID,
  title: "Global-style",
  description: "Deprecated option in favor of install-strategy=shallow.",
  deprecated: true,
});

export const initDotAuthorDotEmailSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.author.email"}`,
  key: "init.author.email",
  groupId: NPMRC_GROUP_ID,
  title: "Init.author.email",
  description: "Alias for --init-author-email.",
  deprecated: true,
});

export const initDotAuthorDotNameSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.author.name"}`,
  key: "init.author.name",
  groupId: NPMRC_GROUP_ID,
  title: "Init.author.name",
  description: "Alias for --init-author-name.",
  deprecated: true,
});

export const initDotAuthorDotUrlSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.author.url"}`,
  key: "init.author.url",
  groupId: NPMRC_GROUP_ID,
  title: "Init.author.url",
  description: "Alias for --init-author-url.",
  deprecated: true,
});

export const initDotLicenseSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.license"}`,
  key: "init.license",
  groupId: NPMRC_GROUP_ID,
  title: "Init.license",
  description: "Alias for --init-license.",
  deprecated: true,
});

export const initDotModuleSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.module"}`,
  key: "init.module",
  groupId: NPMRC_GROUP_ID,
  title: "Init.module",
  description: "Alias for --init-module.",
  deprecated: true,
});

export const initDotVersionSchema = Schema.config(Schema.string()).meta({
  urn: `${NPMRC_GROUP_URN}.${"init.version"}`,
  key: "init.version",
  groupId: NPMRC_GROUP_ID,
  title: "Init.version",
  description: "Alias for --init-version.",
  deprecated: true,
});

export const keySchema = Schema.config(Schema.union([Schema.string(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"key"}`,
  key: "key",
  groupId: NPMRC_GROUP_ID,
  title: "Key",
  description: "Client key to pass when accessing registry.",
  deprecated: true,
});

export const legacyBundlingSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"legacy-bundling"}`,
  key: "legacy-bundling",
  groupId: NPMRC_GROUP_ID,
  title: "Legacy-bundling",
  description: "Deprecated option in favor of install-strategy=nested.",
  deprecated: true,
});

export const onlySchema = Schema.config(
  Schema.union([Schema.enum(["prod", "production"]), Schema.null()]),
).meta({
  urn: `${NPMRC_GROUP_URN}.${"only"}`,
  key: "only",
  groupId: NPMRC_GROUP_ID,
  title: "Only",
  description: "Alias for --omit=dev.",
  deprecated: true,
});

export const optionalSchema = Schema.config(Schema.union([Schema.boolean(), Schema.null()])).meta({
  urn: `${NPMRC_GROUP_URN}.${"optional"}`,
  key: "optional",
  groupId: NPMRC_GROUP_ID,
  title: "Optional",
  description: "Alias for --include=optional or --omit=optional.",
  deprecated: true,
});

export const productionSchema = Schema.config(Schema.union([Schema.boolean(), Schema.null()])).meta(
  {
    urn: `${NPMRC_GROUP_URN}.${"production"}`,
    key: "production",
    groupId: NPMRC_GROUP_ID,
    title: "Production",
    description: "Alias for --omit=dev.",
    deprecated: true,
  },
);

export const shrinkwrapSchema = Schema.config(Schema.boolean()).meta({
  urn: `${NPMRC_GROUP_URN}.${"shrinkwrap"}`,
  key: "shrinkwrap",
  groupId: NPMRC_GROUP_ID,
  title: "Shrinkwrap",
  description: "Alias for --package-lock.",
  deprecated: true,
});

export const npmrcSchema = Schema.configGroup().meta({
  urn: NPMRC_GROUP_URN,
  id: NPMRC_GROUP_ID,
  title: "npmrc",
  description: "NPMRC configuration options",
  resolveMap: {
    local: ".npmrc",
    user: "~/.npmrc",
  },
});

export const defaultNpmrcConfig = {
  _auth: null,
  access: "public",
  all: false,
  "allow-directory": "all",
  "allow-file": "all",
  "allow-git": "all",
  "allow-remote": "all",
  "allow-same-version": false,
  "allow-scripts": "",
  "allow-scripts-pending": false,
  "allow-scripts-pin": true,
  audit: true,
  "audit-level": null,
  "auth-type": "web",
  before: null,
  "bin-links": true,
  browser: null,
  "bypass-2fa": false,
  ca: null,
  cache: "~/.npm",
  cafile: null,
  call: "",
  cidr: null,
  color: true,
  "commit-hooks": true,
  cpu: null,
  "dangerously-allow-all-scripts": false,
  depth: null,
  description: true,
  diff: "",
  "diff-dst-prefix": "b/",
  "diff-ignore-all-space": false,
  "diff-name-only": false,
  "diff-no-prefix": false,
  "diff-src-prefix": "a/",
  "diff-text": false,
  "diff-unified": 3,
  "dry-run": false,
  editor: "vi",
  "engine-strict": false,
  "expect-result-count": null,
  "expect-results": null,
  expires: null,
  "fetch-retries": 2,
  "fetch-retry-factor": 10,
  "fetch-retry-maxtimeout": 60000,
  "fetch-retry-mintimeout": 10000,
  "fetch-timeout": 300000,
  force: false,
  "foreground-scripts": false,
  "format-package-lock": true,
  fund: true,
  git: "git",
  "git-tag-version": true,
  global: false,
  globalconfig: "/usr/local/etc/npmrc",
  heading: "npm",
  "https-proxy": null,
  "if-present": false,
  "ignore-scripts": false,
  include: [],
  "include-attestations": false,
  "include-staged": false,
  "include-workspace-root": false,
  "init-author-email": "",
  "init-author-name": "",
  "init-author-url": "",
  "init-license": "ISC",
  "init-module": "~/.npm-init.js",
  "init-private": false,
  "init-type": "commonjs",
  "init-version": "1.0.0",
  "install-links": false,
  "install-strategy": "hoisted",
  json: false,
  "legacy-peer-deps": false,
  libc: null,
  link: false,
  "local-address": null,
  location: "user",
  "lockfile-version": null,
  loglevel: "notice",
  "logs-dir": null,
  "logs-max": 10,
  long: false,
  maxsockets: 15,
  message: "%s",
  "min-release-age": null,
  "min-release-age-exclude": [],
  name: null,
  "node-gyp": "",
  "node-options": null,
  noproxy: "",
  offline: false,
  omit: [],
  "omit-lockfile-registry-resolved": false,
  orgs: null,
  "orgs-permission": null,
  os: null,
  otp: null,
  "pack-destination": ".",
  package: [],
  "package-lock": true,
  "package-lock-only": false,
  packages: null,
  "packages-all": false,
  "packages-and-scopes-permission": null,
  parseable: false,
  password: null,
  "prefer-dedupe": false,
  "prefer-offline": false,
  "prefer-online": false,
  prefix: "",
  preid: "",
  progress: true,
  provenance: false,
  "provenance-file": null,
  proxy: null,
  "read-only": false,
  "rebuild-bundle": true,
  registry: "https://registry.npmjs.org/",
  "replace-registry-host": "npmjs",
  save: true,
  "save-bundle": false,
  "save-dev": false,
  "save-exact": false,
  "save-optional": false,
  "save-peer": false,
  "save-prefix": "^",
  "save-prod": false,
  "sbom-format": null,
  "sbom-type": "library",
  scope: "",
  scopes: null,
  "script-shell": null,
  searchexclude: "",
  searchlimit: 20,
  searchopts: "",
  searchstaleness: 900,
  shell: "bash",
  "sign-git-commit": false,
  "sign-git-tag": false,
  "strict-allow-scripts": false,
  "strict-peer-deps": false,
  "strict-ssl": true,
  tag: "latest",
  "tag-version-prefix": "v",
  timing: false,
  "token-description": null,
  umask: 0,
  unicode: true,
  "update-notifier": true,
  usage: false,
  "user-agent":
    "npm/{npm-version} node/{node-version} {platform} {arch} workspaces/{workspaces} {ci}",
  userconfig: "~/.npmrc",
  version: false,
  versions: false,
  viewer: "man",
  which: null,
  workspace: [],
  workspaces: null,
  "workspaces-update": true,
  yes: null,
  also: null,
  "cache-max": Infinity,
  "cache-min": 0,
  cert: null,
  dev: false,
  "global-style": false,
  "init.author.email": "",
  "init.author.name": "",
  "init.author.url": "",
  "init.license": "ISC",
  "init.module": "~/.npm-init.js",
  "init.version": "1.0.0",
  key: null,
  "legacy-bundling": false,
  only: null,
  optional: null,
  production: null,
  shrinkwrap: true,
};

seedScopeStore(NPMRC_GROUP_ID, "user", defaultNpmrcConfig);

export const npmrcConfigs = npmrcSchema.parse(defaultNpmrcConfig);
export const npmrcValue = npmrcConfigs;
