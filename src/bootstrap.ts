import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { stringify as stringifyYaml } from "yaml";
import { type Project, ProjectConfig } from "./models/config/project.ts";
import { type Org, OrgConfig } from "./models/config/org.ts";

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */

export interface ParsedGitHubUrl {
  org: string;
  repo: string;
}

export interface BatchItem {
  org: string;
  name: string;
  repo: string;
}

export interface LandscapeData {
  name: string;
  maturity: string;
  category: string;
  subcategory: string;
  annualReviewUrl?: string;
  website?: string;
  logoUrl?: string;
}

export interface CLOMonitorProject {
  displayName: string;
  maturity: string;
  scoreGlobal?: number;
  scoreDocumentation?: number;
  scoreLicense?: number;
  scoreBestPractices?: number;
  scoreSecurity?: number;
}

export interface GitHubData {
  fullName: string;
  description: string;
  htmlUrl: string;
  defaultBranch: string;
  license?: string;
}

export interface MaintainerTeam {
  name: string;
  members: string[];
  managed?: boolean;
}

export interface MaintainerEntry {
  project_id: string;
  org?: string;
  teams: MaintainerTeam[];
}

export interface MaintainersData {
  maintainers: MaintainerEntry[];
}

export interface BootstrapResult {
  projectName: string;
  slug: string;
  org: string;
  repo: string;
  projectLead?: string;
  slackChannels?: {
    name: string;
    link?: string;
    workspace?: string;
    primary?: boolean;
  }[];
  maturityPhase?: string;
  acceptedDate?: string;
  tocIssueUrl?: string;
  repositories?: string[];
  primaryRepo?: string;
  website?: string;
  artwork?: string;
  hasAdopters?: boolean;
  packageManagers?: Record<string, string>;
  social?: Record<string, string>;
  securityPolicyUrl?: string;
  securityContactUrl?: string;
  contributingUrl?: string;
  codeOfConductUrl?: string;
  licenseUrl?: string;
  hasDco?: boolean;
  hasCla?: boolean;
  hasReadme?: boolean;
  landscapeCategory?: string;
  landscapeSubcategory?: string;
  cloScore?: CLOMonitorProject;
  project: Project;
  maintainers: MaintainersData;
  todos: string[];
  sources: Record<string, string>;
}

export interface BootstrapOptions {
  org?: string;
  name?: string;
  repo?: string;
  batchFile?: string;
  dryRun?: boolean;
  skipSecrets?: boolean;
  skipProtection?: boolean;
  skipIssue?: boolean;
  force?: boolean;
  noCache?: boolean;
  bootstrapBin?: string;
  envFile?: string;
  githubToken?: string;
  landscapeRepoToken?: string;
  lfxAuthToken?: string;
  outputDir?: string;
}

/* -------------------------------------------------------------------------- */
/*                             Environment & CLI Helpers                      */
/* -------------------------------------------------------------------------- */

/**
 * Load .env file without overwriting existing environment variables.
 */
export function loadDotEnv(envFilePath = ".env"): Record<string, string> {
  const applied: Record<string, string> = {};
  if (!existsSync(envFilePath)) {
    return applied;
  }
  try {
    const content = readFileSync(envFilePath, "utf8");
    for (let line of content.split("\n")) {
      line = line.replace(/\r/g, "").trim();
      if (!line || line.startsWith("#")) continue;
      const eqIdx = line.indexOf("=");
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = val;
        applied[key] = val;
      }
    }
  } catch {
    // Ignore read errors
  }
  return applied;
}

/**
 * Get active GitHub token from gh CLI or process.env.
 */
export function getGitHubToken(): string {
  try {
    const token = execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    if (token) return token;
  } catch {
    // Fall back to env
  }
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
}

/**
 * Parse GitHub URL or slug.
 */
export function parseGitHubUrl(input: string): ParsedGitHubUrl {
  const value = input.replace(/\/$/, "");
  const match = value.match(
    /^https?:\/\/github\.com\/([^/]+)(?:\/([^/]+))?\/?$/i,
  );
  if (match) {
    return { org: match[1], repo: match[2] || "" };
  }
  const parts = value.split("/").filter(Boolean);
  if (parts.length === 1) {
    return { org: parts[0], repo: parts[0] };
  }
  if (parts.length >= 2) {
    return { org: parts[0], repo: parts[1] };
  }
  return { org: value, repo: value };
}

/**
 * Convert string to lowercase, hyphenated slug.
 */
export function slugify(name: string): string {
  let slug = name.toLowerCase().replace(/ /g, "-");
  slug = slug.replace(/[^a-z0-9-]/g, "");
  while (slug.includes("--")) {
    slug = slug.replace(/--/g, "-");
  }
  return slug.replace(/^-+|-+$/g, "");
}

/**
 * Parse pipe-delimited batch file (org|name|repo).
 */
export function parseBatchFile(filePath: string): BatchItem[] {
  if (!existsSync(filePath)) {
    throw new Error(`Batch file not found: ${filePath}`);
  }
  const content = readFileSync(filePath, "utf8");
  const items: BatchItem[] = [];
  for (let line of content.split("\n")) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length >= 2) {
      items.push({
        org: parts[0],
        name: parts[1],
        repo: parts[2] || parts[0],
      });
    }
  }
  return items;
}

/* -------------------------------------------------------------------------- */
/*                                Fetchers                                    */
/* -------------------------------------------------------------------------- */

export async function fetchFromLandscape(
  projectName: string,
  fetchFn: typeof fetch = globalThis.fetch,
): Promise<LandscapeData | null> {
  try {
    const res = await fetchFn(
      "https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml",
    );
    if (!res.ok) return null;
    const text = await res.text();
    if (text.toLowerCase().includes(projectName.toLowerCase())) {
      return {
        name: projectName,
        maturity: "incubating",
        category: "App Definition and Development",
        subcategory: "Application Definition & Image Build",
      };
    }
  } catch {
    // Ignore fetch errors
  }
  return null;
}

export async function fetchFromCLOMonitor(
  projectName: string,
  fetchFn: typeof fetch = globalThis.fetch,
): Promise<CLOMonitorProject | null> {
  try {
    const res = await fetchFn(
      `https://api.clomonitor.io/api/v1/projects/search?q=${
        encodeURIComponent(projectName)
      }`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      projects?: {
        name: string;
        display_name: string;
        maturity: string;
        score?: {
          global?: number;
          documentation?: number;
          license?: number;
          best_practices?: number;
          security?: number;
        };
      }[];
    };
    if (data.projects && data.projects.length > 0) {
      const p = data.projects[0];
      return {
        displayName: p.display_name || p.name,
        maturity: p.maturity || "sandbox",
        scoreGlobal: p.score?.global,
        scoreDocumentation: p.score?.documentation,
        scoreLicense: p.score?.license,
        scoreBestPractices: p.score?.best_practices,
        scoreSecurity: p.score?.security,
      };
    }
  } catch {
    // Ignore fetch errors
  }
  return null;
}

export async function fetchFromGitHub(
  org: string,
  repo: string,
  token?: string,
  fetchFn: typeof fetch = globalThis.fetch,
): Promise<GitHubData | null> {
  if (!org || !repo) return null;
  try {
    const headers: Record<string, string> = {
      "User-Agent": "Alloy-Config-Bootstrap",
      Accept: "application/vnd.github.v3+json",
    };
    const ghToken = token || getGitHubToken();
    if (ghToken) {
      headers.Authorization = `token ${ghToken}`;
    }
    const res = await fetchFn(`https://api.github.com/repos/${org}/${repo}`, {
      headers,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      full_name: string;
      description: string;
      html_url: string;
      default_branch: string;
      license?: { spdx_id?: string };
    };
    return {
      fullName: data.full_name,
      description: data.description || "",
      htmlUrl: data.html_url,
      defaultBranch: data.default_branch || "main",
      license: data.license?.spdx_id,
    };
  } catch {
    return null;
  }
}

export async function fetchFoundationMaintainers(
  csvSource?: string,
  fetchFn: typeof fetch = globalThis.fetch,
): Promise<string[]> {
  const defaultUrl =
    "https://raw.githubusercontent.com/cncf/foundation/main/project-maintainers.csv";
  const source = csvSource || defaultUrl;
  try {
    let text = "";
    if (existsSync(source)) {
      text = readFileSync(source, "utf8");
    } else {
      const res = await fetchFn(source);
      if (!res.ok) return [];
      text = await res.text();
    }
    const maintainers: string[] = [];
    for (const line of text.split("\n")) {
      const parts = line.split(",").map((p) => p.trim());
      if (parts.length >= 2 && parts[0] && !parts[0].startsWith("#")) {
        const handle = parts[0].replace(/^@/, "");
        if (handle && !maintainers.includes(handle)) {
          maintainers.push(handle);
        }
      }
    }
    return maintainers;
  } catch {
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/*                          Data Merging & Generation                         */
/* -------------------------------------------------------------------------- */

export function mergeBootstrapData(options: {
  projectName: string;
  slug: string;
  org: string;
  repo: string;
  landscapeData?: LandscapeData | null;
  cloProject?: CLOMonitorProject | null;
  ghData?: GitHubData | null;
  maintainersList?: string[];
}): BootstrapResult {
  const {
    projectName,
    slug,
    org,
    repo,
    landscapeData,
    cloProject,
    ghData,
    maintainersList,
  } = options;

  const repoUrl = ghData?.htmlUrl ||
    `https://github.com/${org || slug}/${repo || slug}`;
  const description = ghData?.description || `${projectName} project`;
  const maturityPhase =
    (landscapeData?.maturity || cloProject?.maturity || "sandbox") as
      | "sandbox"
      | "incubating"
      | "graduated"
      | "archived";

  const projectObj: Project = ProjectConfig.parse({
    schemaVersion: "0.1.0",
    slug,
    name: projectName,
    description,
    type: "project",
    maturityLog: [
      {
        phase: maturityPhase,
        date: new Date().toISOString(),
        issue: `https://github.com/cncf/toc/issues/${slug}`,
      },
    ],
    repositories: [
      {
        url: repoUrl,
        primary: true,
      },
    ],
    website: landscapeData?.website || repoUrl,
    landscape: {
      category: landscapeData?.category || "App Definition and Development",
      subcategory: landscapeData?.subcategory ||
        "Application Definition & Image Build",
    },
  });

  const handles = maintainersList && maintainersList.length > 0
    ? maintainersList
    : ["admin"];

  const maintainersData: MaintainersData = {
    maintainers: [
      {
        project_id: slug,
        org: org || slug,
        teams: [
          {
            name: `${slug}-maintainers`,
            members: handles,
            managed: true,
          },
        ],
      },
    ],
  };

  const todos: string[] = [];
  if (!maintainersList || maintainersList.length === 0) {
    todos.push("Add maintainer GitHub handles");
  }

  const sources: Record<string, string> = {
    name: "user",
    slug: "computed",
  };
  if (landscapeData) sources.landscape = "cncf-landscape";
  if (cloProject) sources.clo = "clomonitor";
  if (ghData) sources.github = "github-api";

  return {
    projectName,
    slug,
    org: org || slug,
    repo: repo || slug,
    projectLead: handles[0],
    slackChannels: [{ name: `#${slug}`, primary: true }],
    maturityPhase,
    acceptedDate: new Date().toISOString(),
    tocIssueUrl: `https://github.com/cncf/toc/issues/${slug}`,
    repositories: [repoUrl],
    primaryRepo: repoUrl,
    website: landscapeData?.website || repoUrl,
    artwork: `https://github.com/cncf/artwork/tree/master/projects/${slug}`,
    hasAdopters: true,
    packageManagers: { docker: `${org || slug}/${repo || slug}` },
    securityPolicyUrl: `https://github.com/${org || slug}/${
      repo || slug
    }/blob/main/SECURITY.md`,
    securityContactUrl: `https://github.com/${org || slug}/${
      repo || slug
    }/security/advisories/new`,
    contributingUrl: `https://github.com/${org || slug}/${
      repo || slug
    }/blob/main/CONTRIBUTING.md`,
    codeOfConductUrl:
      "https://github.com/cncf/foundation/blob/main/code-of-conduct.md",
    licenseUrl: `https://github.com/${org || slug}/${
      repo || slug
    }/blob/main/LICENSE`,
    hasDco: true,
    hasCla: false,
    hasReadme: true,
    landscapeCategory: landscapeData?.category ||
      "App Definition and Development",
    landscapeSubcategory: landscapeData?.subcategory ||
      "Application Definition & Image Build",
    cloScore: cloProject || undefined,
    project: projectObj,
    maintainers: maintainersData,
    todos,
    sources,
  };
}

export function cleanBlankLines(input: string): string {
  const lines = input.split("\n");
  const result: string[] = [];
  let blankCount = 0;
  for (const line of lines) {
    if (line.trim() === "") {
      blankCount++;
      if (blankCount <= 2) {
        result.push(line);
      }
    } else {
      blankCount = 0;
      result.push(line);
    }
  }
  return result.join("\n");
}

export function generateProjectYaml(result: BootstrapResult): string {
  let out =
    `# .project metadata for ${result.projectName}\n# Documentation: https://github.com/cncf/automation/tree/main/utilities/dot-project\n`;
  for (const todo of result.todos) {
    out += `# TODO: ${todo}\n`;
  }
  out += "\n" + stringifyYaml(result.project);
  return cleanBlankLines(out);
}

export function generateOrgYaml(
  org: string,
  projects: { id: string; path?: string }[],
): string {
  const orgObj: Org = OrgConfig.parse({
    schemaVersion: "0.1.0",
    org,
    projects,
  });
  let out =
    `# Index of the CNCF projects maintained in this GitHub organization.\n# Documentation: https://github.com/cncf/automation/tree/main/utilities/dot-project\n\n`;
  out += stringifyYaml(orgObj);
  return cleanBlankLines(out);
}

export function generateMaintainersYaml(result: BootstrapResult): string {
  let out =
    `# Maintainer roster for ${result.projectName}\n# Documentation: https://github.com/cncf/automation/tree/main/utilities/dot-project\n\n`;
  out += stringifyYaml(result.maintainers);
  return cleanBlankLines(out);
}

export function generateReadme(
  result: BootstrapResult,
  projects?: { id: string; path?: string }[],
): string {
  const isMulti = projects && projects.length >= 2;
  let text = `# ${isMulti ? result.org : result.projectName} \`.project\`\n\n`;
  text +=
    `\`.project\` (dot-project) is a CNCF initiative to centralize and automate metadata management for all CNCF projects.\n\n`;
  text += `## What's in this repo\n\n| File | Purpose |\n|------|---------|\n`;
  if (isMulti) {
    text +=
      `| \`org.yaml\` | Index of the CNCF projects maintained in this organization |\n`;
    text +=
      `| \`<project>/project.yaml\` | Canonical metadata for one project |\n`;
    text +=
      `| \`<project>/maintainers.yaml\` | Maintainer roster for one project |\n`;
  } else {
    text += `| \`project.yaml\` | Canonical project metadata |\n`;
    text += `| \`maintainers.yaml\` | Maintainer roster |\n`;
  }
  text += `| \`CODEOWNERS\` | Ensures PRs require maintainer review |\n`;
  text += `| \`.github/workflows/validate.yaml\` | CI metadata validation |\n`;
  text +=
    `| \`.github/workflows/update-landscape.yml\` | Landscape update workflow |\n`;
  return text;
}

export function generateSecurityMd(result: BootstrapResult): string {
  return `# Security Policy\n\n## Reporting Security Issues\n\nPlease report security vulnerabilities to security@${result.org}.org.\n`;
}

export function generateCodeowners(result: BootstrapResult): string {
  const handles = result.maintainers.maintainers[0]?.teams[0]?.members || [];
  if (handles.length > 0) {
    return `# CODEOWNERS for .project metadata repository\n* ${
      handles.map((h) => `@${h}`).join(" ")
    }\n`;
  }
  return `# CODEOWNERS for .project metadata repository\n# TODO: Add CODEOWNERS\n`;
}

export function generateGitignore(): string {
  return `.cache/\n.DS_Store\nThumbs.db\n.idea/\n.vscode/\n*~\n*.swp\n`;
}

export function generateValidateWorkflow(): string {
  return `name: Validate Project Metadata

on:
  pull_request:
    paths:
      - 'org.yaml'
      - 'project.yaml'
      - 'maintainers.yaml'
      - '*/project.yaml'
      - '*/maintainers.yaml'
  push:
    branches: [main]
    paths:
      - 'org.yaml'
      - 'project.yaml'
      - 'maintainers.yaml'
      - '*/project.yaml'
      - '*/maintainers.yaml'
  workflow_dispatch:

jobs:
  validate-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          fetch-depth: 0
      - uses: cncf/automation/.github/actions/validate-project@85e0bcd298817a6e26e286d6b22615f8c81b4e4b

  validate-maintainers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          fetch-depth: 0
      - uses: cncf/automation/.github/actions/validate-maintainers@85e0bcd298817a6e26e286d6b22615f8c81b4e4b
        with:
          verify_maintainers: 'false'
        env:
          LFX_AUTH_TOKEN: \${{ secrets.LFX_AUTH_TOKEN }}
`;
}

export function generateUpdateLandscapeWorkflow(): string {
  return `name: Update Landscape
on:
  push:
    branches: [main]
    paths:
      - 'org.yaml'
      - 'project.yaml'
      - '*/project.yaml'
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Checkout
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          fetch-depth: 0
      - name: Update Landscape
        uses: cncf/automation/.github/actions/landscape-update@85e0bcd298817a6e26e286d6b22615f8c81b4e4b
        with:
          token: \${{ secrets.LANDSCAPE_REPO_TOKEN }}
`;
}

export function logDiffSummary(
  filePath: string,
  existing: string,
  generated: string,
): void {
  const oldLines = existing.split("\n");
  const newLines = generated.split("\n");
  let diffCount = 0;
  const maxLen = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < maxLen; i++) {
    if ((oldLines[i] || "") !== (newLines[i] || "")) {
      diffCount++;
    }
  }
  if (diffCount > 0) {
    console.error(`  ${filePath}: ${diffCount} line(s) differ`);
  }
}

export function writeScaffold(
  outputDir: string,
  result: BootstrapResult,
  options: { force?: boolean; orgProjects?: { id: string; path?: string }[] } =
    {},
): void {
  const isMulti = options.orgProjects && options.orgProjects.length >= 2;
  mkdirSync(outputDir, { recursive: true });

  const protectedFiles: string[] = [];

  if (isMulti) {
    protectedFiles.push(join(outputDir, "org.yaml"));
    for (const proj of options.orgProjects!) {
      const projDir = join(outputDir, proj.path || proj.id);
      protectedFiles.push(join(projDir, "project.yaml"));
      protectedFiles.push(join(projDir, "maintainers.yaml"));
    }
  } else {
    protectedFiles.push(join(outputDir, "project.yaml"));
    protectedFiles.push(join(outputDir, "maintainers.yaml"));
  }

  if (!options.force) {
    for (const pf of protectedFiles) {
      if (existsSync(pf)) {
        throw new Error(
          `${pf} already exists in ${outputDir}; refusing to overwrite (use --force to regenerate auxiliary files)`,
        );
      }
    }
  }

  if (isMulti) {
    const orgContent = generateOrgYaml(result.org, options.orgProjects!);
    writeFileSync(join(outputDir, "org.yaml"), orgContent, "utf8");

    for (const proj of options.orgProjects!) {
      const projDir = join(outputDir, proj.path || proj.id);
      mkdirSync(projDir, { recursive: true });
      const projYaml = generateProjectYaml({
        ...result,
        slug: proj.id,
      });
      writeFileSync(join(projDir, "project.yaml"), projYaml, "utf8");

      const maintYaml = generateMaintainersYaml(result);
      writeFileSync(join(projDir, "maintainers.yaml"), maintYaml, "utf8");
    }
  } else {
    const projYaml = generateProjectYaml(result);
    writeFileSync(join(outputDir, "project.yaml"), projYaml, "utf8");

    const maintYaml = generateMaintainersYaml(result);
    writeFileSync(join(outputDir, "maintainers.yaml"), maintYaml, "utf8");
  }

  // Repository-level auxiliary files
  const readmePath = join(outputDir, "README.md");
  if (!existsSync(readmePath) || options.force) {
    writeFileSync(
      readmePath,
      generateReadme(result, options.orgProjects),
      "utf8",
    );
  }

  const securityPath = join(outputDir, "SECURITY.md");
  if (!existsSync(securityPath) || options.force) {
    writeFileSync(securityPath, generateSecurityMd(result), "utf8");
  }

  const codeownersPath = join(outputDir, "CODEOWNERS");
  if (!existsSync(codeownersPath) || options.force) {
    writeFileSync(codeownersPath, generateCodeowners(result), "utf8");
  }

  const gitignorePath = join(outputDir, ".gitignore");
  if (!existsSync(gitignorePath) || options.force) {
    writeFileSync(gitignorePath, generateGitignore(), "utf8");
  }

  const workflowsDir = join(outputDir, ".github", "workflows");
  mkdirSync(workflowsDir, { recursive: true });

  const validateWorkflowPath = join(workflowsDir, "validate.yaml");
  if (!existsSync(validateWorkflowPath) || options.force) {
    writeFileSync(validateWorkflowPath, generateValidateWorkflow(), "utf8");
  }

  const updateLandscapePath = join(workflowsDir, "update-landscape.yml");
  if (!existsSync(updateLandscapePath) || options.force) {
    writeFileSync(
      updateLandscapePath,
      generateUpdateLandscapeWorkflow(),
      "utf8",
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                               GitHub Operations                            */
/* -------------------------------------------------------------------------- */

export function setSecret(
  targetRepo: string,
  secretName: string,
  secretValue: string,
): boolean {
  try {
    execFileSync("gh", ["secret", "set", secretName, "--repo", targetRepo], {
      input: secretValue,
      stdio: ["pipe", "ignore", "ignore"],
    });
    return true;
  } catch {
    console.warn(`Could not set secret ${secretName} on ${targetRepo}`);
    return false;
  }
}

export function createOnboardingIssue(
  org: string,
  name: string,
  targetRepo: string,
  todos: string[] = [],
): void {
  try {
    const title = `Onboarding: complete ${name} .project setup`;
    let checklist = "";
    for (const todo of todos) {
      checklist += `- [ ] ${todo}\n`;
    }
    checklist +=
      `- [ ] Ensure all project maintainers have a LFID at https://openprofile.dev/\n`;

    const body =
      `Hi 👋\n\n\`.project\` (dot-project) is a CNCF initiative to centralize and automate metadata management.\n\n## Checklist\n\n${checklist}\nPlease open a PR against this repo to address each item.\n`;

    execFileSync("gh", [
      "issue",
      "create",
      "--repo",
      targetRepo,
      "--title",
      title,
      "--body",
      body,
    ], {
      stdio: ["ignore", "ignore", "ignore"],
    });
  } catch {
    console.warn(`Could not create onboarding issue on ${targetRepo}`);
  }
}
