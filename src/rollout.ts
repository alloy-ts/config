import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { parse as parseYaml } from "yaml";

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */

export interface LandscapeItem {
  org: string;
  name: string;
  maturity: string;
  repoUrl?: string;
  projectOrg?: string;
}

export interface RolloutOptions {
  landscape: string;
  maturity: "graduated" | "incubating" | "sandbox" | "all";
  batchSize?: number;
  batchNum?: number;
  list?: boolean;
  dryRun?: boolean;
  skipSecrets?: boolean;
  skipProtection?: boolean;
  provisionBin?: string;
  bootstrapBin?: string;
  logDir?: string;
  pollTimeout?: number;
}

export interface RolloutSummary {
  total: number;
  skipped: number;
  succeeded: number;
  failed: number;
  succeededOrgs: string[];
  failedOrgs: string[];
  skippedOrgs: string[];
}

/* -------------------------------------------------------------------------- */
/*                             Landscape Parser                               */
/* -------------------------------------------------------------------------- */

export function parseLandscapeYaml(
  landscapeFilePathOrYaml: string,
): LandscapeItem[] {
  let content = landscapeFilePathOrYaml;
  if (existsSync(landscapeFilePathOrYaml)) {
    content = readFileSync(landscapeFilePathOrYaml, "utf8");
  }

  const parsed = parseYaml(content) as {
    landscape?: {
      subcategories?: {
        items?: {
          name?: string;
          project?: string;
          repo_url?: string;
          project_org?: string;
        }[];
      }[];
    }[];
  };

  const items: LandscapeItem[] = [];
  if (!parsed || !parsed.landscape) return items;

  for (const cat of parsed.landscape) {
    if (!cat.subcategories) continue;
    for (const subcat of cat.subcategories) {
      if (!subcat.items) continue;
      for (const item of subcat.items) {
        if (!item.project) continue;
        let org = "";
        if (item.project_org) {
          org = item.project_org.replace(/^https?:\/\/github\.com\//i, "")
            .replace(/\/$/, "");
        } else if (item.repo_url) {
          const clean = item.repo_url.replace(/^https?:\/\/github\.com\//i, "")
            .replace(/\/$/, "");
          org = clean.split("/")[0] || "";
        }
        if (org) {
          items.push({
            org,
            name: item.name || org,
            maturity: item.project,
            repoUrl: item.repo_url,
            projectOrg: item.project_org,
          });
        }
      }
    }
  }

  return items;
}

export function filterAndDedupOrgs(
  items: LandscapeItem[],
  targetMaturity: "graduated" | "incubating" | "sandbox" | "all",
): LandscapeItem[] {
  const seen = new Set<string>();
  const filtered: LandscapeItem[] = [];

  for (const item of items) {
    if (item.maturity === "archived") continue;
    if (targetMaturity !== "all" && item.maturity !== targetMaturity) continue;

    const lowerOrg = item.org.toLowerCase();
    if (seen.has(lowerOrg)) continue;
    seen.add(lowerOrg);
    filtered.push(item);
  }

  filtered.sort((a, b) =>
    a.org.localeCompare(b.org, undefined, { sensitivity: "base" })
  );
  return filtered;
}

export function batchSlice(
  items: LandscapeItem[],
  batchSize = 50,
  batchNum = 1,
): { slice: LandscapeItem[]; totalBatches: number; totalItems: number } {
  const totalItems = items.length;
  const totalBatches = Math.max(1, Math.ceil(totalItems / batchSize));

  if (batchNum > totalBatches) {
    throw new Error(
      `Batch ${batchNum} requested but only ${totalBatches} batches exist (${totalItems} orgs, batch size ${batchSize})`,
    );
  }

  const start = (batchNum - 1) * batchSize;
  const end = Math.min(totalItems, batchNum * batchSize);
  const slice = items.slice(start, end);

  return { slice, totalBatches, totalItems };
}

/* -------------------------------------------------------------------------- */
/*                               GitHub & Rollout                             */
/* -------------------------------------------------------------------------- */

export function checkProjectExists(org: string): boolean {
  try {
    execFileSync("gh", ["repo", "view", `${org}/.project`, "--json", "name"], {
      stdio: ["ignore", "ignore", "ignore"],
    });
    return true;
  } catch {
    return false;
  }
}

export function listProjects(batchItems: LandscapeItem[]): void {
  console.log(
    `\n${"#".padEnd(4)} ${"ORG".padEnd(30)} ${"PROJECT".padEnd(30)} ${
      "MATURITY".padEnd(12)
    } STATUS`,
  );
  console.log(
    `${"---".padEnd(4)} ${"---".padEnd(30)} ${"-------".padEnd(30)} ${
      "--------".padEnd(12)
    } ------`,
  );

  let idx = 1;
  for (const item of batchItems) {
    const exists = checkProjectExists(item.org);
    const status = exists ? "exists" : "missing";
    console.log(
      `${String(idx).padEnd(4)} ${item.org.padEnd(30)} ${
        item.name.padEnd(30)
      } ${item.maturity.padEnd(12)} ${status}`,
    );
    idx++;
  }
  console.log("\nUse without --list to provision missing repos.");
}

export function pollWorkflow(org: string, timeoutSec = 300): boolean {
  const repo = `${org}/.project`;
  const deadline = Date.now() + timeoutSec * 1000;

  while (Date.now() < deadline) {
    try {
      const out = execFileSync("gh", [
        "api",
        `repos/${repo}/actions/workflows/validate.yaml/runs?per_page=1`,
      ], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      const parsed = JSON.parse(out) as {
        workflow_runs?: { status?: string; conclusion?: string }[];
      };
      const run = parsed.workflow_runs?.[0];
      if (run) {
        if (run.status === "completed") {
          return run.conclusion === "success";
        }
      }
    } catch {
      // Retry
    }
  }
  return false;
}

export async function runRollout(
  options: RolloutOptions,
): Promise<RolloutSummary> {
  const allItems = parseLandscapeYaml(options.landscape);
  const filtered = filterAndDedupOrgs(allItems, options.maturity);
  const batchSize = options.batchSize || 50;
  const batchNum = options.batchNum || 1;
  const { slice, totalBatches, totalItems } = batchSlice(
    filtered,
    batchSize,
    batchNum,
  );

  console.error(
    `==> Batch ${batchNum} of ${totalBatches} (${totalItems} orgs total, ${batchSize} per batch)`,
  );

  if (options.list) {
    listProjects(slice);
    return {
      total: slice.length,
      skipped: 0,
      succeeded: 0,
      failed: 0,
      succeededOrgs: [],
      failedOrgs: [],
      skippedOrgs: [],
    };
  }

  const logDir = options.logDir || "/tmp/rollout-logs";
  mkdirSync(logDir, { recursive: true });

  const summary: RolloutSummary = {
    total: slice.length,
    skipped: 0,
    succeeded: 0,
    failed: 0,
    succeededOrgs: [],
    failedOrgs: [],
    skippedOrgs: [],
  };

  for (const item of slice) {
    if (checkProjectExists(item.org)) {
      console.error(`[${item.org}] .project repo already exists — skipping`);
      summary.skipped++;
      summary.skippedOrgs.push(item.org);
      continue;
    }

    console.error(`[${item.org}] Provisioning .project repo...`);
    try {
      if (!options.dryRun) {
        const passed = pollWorkflow(item.org, options.pollTimeout || 300);
        if (passed) {
          console.error(`[${item.org}] Provisioned & validated successfully`);
          summary.succeeded++;
          summary.succeededOrgs.push(item.org);
        } else {
          console.error(`[${item.org}] Validation failed or timed out`);
          summary.failed++;
          summary.failedOrgs.push(item.org);
        }
      } else {
        console.error(`[${item.org}] Dry run provisioned`);
        summary.succeeded++;
        summary.succeededOrgs.push(item.org);
      }
    } catch {
      summary.failed++;
      summary.failedOrgs.push(item.org);
    }
  }

  const summaryText = `
====================================================
  ROLLOUT SUMMARY
  Maturity: ${options.maturity}
  Batch: ${batchNum} (size: ${batchSize})
  Timestamp: ${new Date().toISOString()}
====================================================
  Total:    ${summary.total}
  Skipped:  ${summary.skipped}  (already provisioned)
  Success:  ${summary.succeeded}
  Failed:   ${summary.failed}
====================================================
`;
  console.log(summaryText);
  writeFileSync(join(logDir, "summary.txt"), summaryText, "utf8");

  return summary;
}
