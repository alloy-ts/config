import { parseArgs } from "node:util";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { processProject } from "../src/update-landscape.ts";

export function discoverProjectFiles(repoRoot: string): string[] {
  const rootProj = join(repoRoot, "project.yaml");
  if (existsSync(rootProj)) {
    return [rootProj];
  }

  const projectPaths: string[] = [];
  if (existsSync(repoRoot)) {
    const entries = readdirSync(repoRoot);
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;
      const fullPath = join(repoRoot, entry);
      if (statSync(fullPath).isDirectory()) {
        const subProj = join(fullPath, "project.yaml");
        if (existsSync(subProj)) {
          projectPaths.push(subProj);
        }
      }
    }
  }
  return projectPaths;
}

export async function main() {
  const { values } = parseArgs({
    options: {
      project: { type: "string" },
      "repo-root": { type: "string" },
      landscape: { type: "string" },
      "landscape-repo": { type: "string", default: "cncf/landscape" },
      "create-pr": { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(`
update-landscape.ts — Sync project.yaml metadata changes to CNCF landscape.yml

Usage:
  node --import tsx/esm scripts/update-landscape.ts --landscape <path> [options]

Options:
  --project <path>       Path to a single project.yaml file
  --repo-root <dir>      Root of a .project repository (defaults to ".")
  --landscape <path>     Path to landscape.yml (required)
  --landscape-repo <r>   Target GitHub repository for PR (default: cncf/landscape)
  --create-pr            Create a Pull Request with the changes
  --dry-run              Print changes and PR details without executing
  -h, --help             Show this help message
`);
    return;
  }

  const landscapePath = values.landscape as string;
  if (!landscapePath) {
    console.error("Error: --landscape is required");
    process.exit(1);
  }

  const projectPath = values.project as string | undefined;
  let repoRoot = values["repo-root"] as string | undefined;

  if (!projectPath && !repoRoot) {
    repoRoot = ".";
  }

  let projectPaths: string[] = [];
  if (projectPath) {
    projectPaths = [projectPath];
  } else if (repoRoot) {
    projectPaths = discoverProjectFiles(repoRoot);
  }

  if (projectPaths.length === 0) {
    console.error("Error: No project.yaml files found.");
    process.exit(1);
  }

  const dryRun = Boolean(values["dry-run"]);
  const createPr = Boolean(values["create-pr"]);
  const landscapeRepo = (values["landscape-repo"] as string) ||
    "cncf/landscape";

  for (const path of projectPaths) {
    try {
      processProject(path, landscapePath, { dryRun, createPr, landscapeRepo });
    } catch (err) {
      console.error(`Error processing ${path}:`, err);
    }
  }
}

if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1]?.endsWith("update-landscape.ts")
) {
  main().catch((err) => {
    console.error("Update Landscape CLI error:", err);
    process.exit(1);
  });
}
