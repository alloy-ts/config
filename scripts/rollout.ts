import { parseArgs } from "node:util";
import { runRollout } from "../src/rollout.ts";

export async function main() {
  const { values } = parseArgs({
    options: {
      landscape: { type: "string" },
      maturity: { type: "string" },
      "batch-size": { type: "string", default: "50" },
      batch: { type: "string", default: "1" },
      list: { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
      "skip-secrets": { type: "boolean", default: false },
      "skip-protection": { type: "boolean", default: false },
      "provision-bin": { type: "string", default: "scripts/provision.sh" },
      "bootstrap-bin": { type: "string" },
      "log-dir": { type: "string", default: "/tmp/rollout-logs" },
      "poll-timeout": { type: "string", default: "300" },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(`
rollout.ts — Staged rollout of .project repos across CNCF project orgs.

Usage:
  node --import tsx/esm scripts/rollout.ts --landscape <path> --maturity <level> [options]

Options:
  --landscape <path>    Path to landscape.yml (required)
  --maturity <level>    Filter: graduated|incubating|sandbox|all (required)
  --batch-size <n>      Orgs per batch (default: 50)
  --batch <n>           Which batch to run, 1-indexed (default: 1)
  --list                List mode: show orgs + status, no provisioning
  --dry-run             Print what would be done without making changes
  --skip-secrets        Skip setting repository secrets
  --skip-protection     Skip setting branch protection rules
  --log-dir <path>      Directory for per-org logs (default: /tmp/rollout-logs)
  --poll-timeout <s>    Max seconds to wait for workflow (default: 300)
  -h, --help            Show this help message
`);
    return;
  }

  const landscape = values.landscape as string;
  const maturity = values.maturity as
    | "graduated"
    | "incubating"
    | "sandbox"
    | "all";

  if (!landscape) {
    console.error("Error: --landscape is required");
    process.exit(1);
  }

  if (
    !maturity ||
    !["graduated", "incubating", "sandbox", "all"].includes(maturity)
  ) {
    console.error(
      "Error: --maturity is required (graduated|incubating|sandbox|all)",
    );
    process.exit(1);
  }

  await runRollout({
    landscape,
    maturity,
    batchSize: parseInt((values["batch-size"] as string) || "50", 10),
    batchNum: parseInt((values.batch as string) || "1", 10),
    list: Boolean(values.list),
    dryRun: Boolean(values["dry-run"]),
    skipSecrets: Boolean(values["skip-secrets"]),
    skipProtection: Boolean(values["skip-protection"]),
    provisionBin: values["provision-bin"] as string,
    bootstrapBin: values["bootstrap-bin"] as string,
    logDir: values["log-dir"] as string,
    pollTimeout: parseInt((values["poll-timeout"] as string) || "300", 10),
  });
}

if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1]?.endsWith("rollout.ts")
) {
  main().catch((err) => {
    console.error("Rollout CLI error:", err);
    process.exit(1);
  });
}
