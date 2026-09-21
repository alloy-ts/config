import { parseArgs } from "node:util";
import {
  type BootstrapResult,
  createOnboardingIssue,
  fetchFoundationMaintainers,
  fetchFromCLOMonitor,
  fetchFromGitHub,
  fetchFromLandscape,
  generateMaintainersYaml,
  generateOrgYaml,
  generateProjectYaml,
  getGitHubToken,
  loadDotEnv,
  mergeBootstrapData,
  parseBatchFile,
  parseGitHubUrl,
  setSecret,
  slugify,
  writeScaffold,
} from "../src/bootstrap.ts";

export async function main() {
  const { values } = parseArgs({
    options: {
      org: { type: "string" },
      name: { type: "string" },
      repo: { type: "string" },
      batch: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      "skip-secrets": { type: "boolean", default: false },
      "skip-protection": { type: "boolean", default: false },
      "skip-issue": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      "no-cache": { type: "boolean", default: false },
      "bootstrap-bin": { type: "string", default: "./bin/bootstrap" },
      "env-file": { type: "string", default: ".env" },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(`
bootstrap.ts — Create and bootstrap a .project repo for a CNCF project.

Usage:
  node --import tsx/esm scripts/bootstrap.ts --org <org> --name <name> [--repo <repo>] [options]
  node --import tsx/esm scripts/bootstrap.ts --batch <file> [options]

Options:
  --org <org>           GitHub organization (e.g., "project-copacetic")
  --name <name>         Project display name (e.g., "Copacetic")
  --repo <repo>         Primary repo name (defaults to org name)
  --batch <file>        Batch mode: read org|name|repo from file (pipe-delimited)
  --dry-run             Print what would be done without making changes
  --skip-secrets        Skip setting repository secrets
  --skip-protection     Skip setting branch protection rules
  --skip-issue          Skip creating onboarding issue
  --force               Force regeneration of scaffold files (overwrites auxiliary files)
  --no-cache            Skip the once-per-run project-maintainers.csv prefetch
  --env-file <file>     Path to .env file (default: .env)
  -h, --help            Show this help message
`);
    return;
  }

  const envFile = (values["env-file"] as string) || ".env";
  loadDotEnv(envFile);

  const dryRun = Boolean(values["dry-run"]);
  const force = Boolean(values.force);
  const skipSecrets = Boolean(values["skip-secrets"]);
  const skipIssue = Boolean(values["skip-issue"]);

  const processOne = async (
    orgInput: string,
    nameInput: string,
    repoInput?: string,
  ) => {
    const parsedOrg = parseGitHubUrl(orgInput);
    const parsedRepo = parseGitHubUrl(repoInput || orgInput);

    const org = parsedOrg.org || parsedOrg.repo || "";
    const repo = parsedRepo.repo || parsedOrg.repo || org || "";
    const name = nameInput || org || "My Project";
    const slug = slugify(name);

    console.error(
      `==> Provisioning: ${org}/.project (name: ${name}, primary repo: ${repo})`,
    );

    const token = getGitHubToken();
    const landscapeData = await fetchFromLandscape(name);
    const cloProject = await fetchFromCLOMonitor(name);
    const ghData = await fetchFromGitHub(org, repo, token);
    const maintainersList = await fetchFoundationMaintainers();

    const result: BootstrapResult = mergeBootstrapData({
      projectName: name,
      slug,
      org,
      repo,
      landscapeData,
      cloProject,
      ghData,
      maintainersList,
    });

    if (dryRun) {
      console.log("--- project.yaml ---");
      console.log(generateProjectYaml(result));
      console.log("--- maintainers.yaml ---");
      console.log(generateMaintainersYaml(result));
      return;
    }

    const targetDir = `.project-${slug}`;
    writeScaffold(targetDir, result, { force });

    if (!skipSecrets && process.env.LANDSCAPE_REPO_TOKEN) {
      setSecret(
        `${org}/.project`,
        "LANDSCAPE_REPO_TOKEN",
        process.env.LANDSCAPE_REPO_TOKEN,
      );
    }

    if (!skipIssue) {
      createOnboardingIssue(org, name, `${org}/.project`, result.todos);
    }

    console.error(`==> Done: https://github.com/${org}/.project`);
  };

  const batchFile = values.batch as string | undefined;
  if (batchFile) {
    const batchItems = parseBatchFile(batchFile);
    console.error(`Loaded ${batchItems.length} project(s) from batch file.`);
    for (const item of batchItems) {
      await processOne(item.org, item.name, item.repo);
    }
  } else {
    const org = (values.org as string) || "";
    const name = (values.name as string) || "";
    const repo = (values.repo as string) || "";

    if (!org && !name) {
      console.error(
        "Error: at least one of --org or --name is required (or use --batch)",
      );
      process.exit(1);
    }

    await processOne(org, name, repo);
  }
}

if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1]?.endsWith("bootstrap.ts")
) {
  main().catch((err) => {
    console.error("Bootstrap CLI error:", err);
    process.exit(1);
  });
}
