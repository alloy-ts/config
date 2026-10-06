import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { NapiCli } from "@napi-rs/cli";

async function run() {
  const args = process.argv.slice(2);
  const isRelease = args.includes("--release") || args.includes("-r");
  const dryRun = args.includes("--dry-run");
  const buildAll = args.includes("--all") || args.includes("--target-all");

  const useNapiCross = args.includes("--use-napi-cross");
  const crossCompile = args.includes("-x") || args.includes("--cross-compile");
  const useCross = args.includes("--use-cross");

  const targetIdx = args.findIndex((a) => a === "--target" || a === "-t");
  const targetFilter =
    targetIdx !== -1 && args[targetIdx + 1] && !args[targetIdx + 1]?.startsWith("-")
      ? args[targetIdx + 1]
      : undefined;

  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const targets: string[] = pkg.napi?.targets || [];

  const cli = new NapiCli();

  let targetsToBuild: (string | undefined)[] = [];
  if (targetFilter) {
    targetsToBuild = [targetFilter];
  } else if (buildAll) {
    targetsToBuild = targets.length > 0 ? targets : [undefined];
  } else {
    targetsToBuild = [undefined];
  }

  console.log(`\n🚀 Starting Local Build Pipeline (${targetsToBuild.length} target(s))...`);

  for (const target of targetsToBuild) {
    const isNapiCrossTarget =
      target &&
      (target.includes("gnueabihf") ||
        target.includes("powerpc") ||
        target.includes("s390x") ||
        target.includes("unknown-linux-gnu"));
    const effectiveUseNapiCross = useNapiCross || Boolean(isNapiCrossTarget);
    const effectiveCrossCompile = crossCompile || (target ? !effectiveUseNapiCross : false);

    console.log(`\n⚙️  Building target: ${target ?? "host"}`);
    if (dryRun) {
      console.log(`   [Dry Run] Skipped build execution for ${target ?? "host"}.`);
      continue;
    }

    try {
      await cli.build({
        platform: true,
        esm: true,
        outputDir: "./dist",
        release: isRelease,
        target,
        useNapiCross: effectiveUseNapiCross,
        crossCompile: effectiveCrossCompile,
        useCross,
      });
      console.log(`✅ Target ${target ?? "host"} built successfully.`);
    } catch (err: any) {
      console.error(`❌ Target ${target ?? "host"} failed to build:`, err?.message || err);
      if (!buildAll) {
        process.exit(1);
      }
    }
  }

  console.log(`\n✨ Local build process complete!`);
}

void run().catch((err) => {
  console.error("Fatal error during build:", err);
  process.exit(1);
});
