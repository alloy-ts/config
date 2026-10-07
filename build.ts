import { copyFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { NapiCli } from "@napi-rs/cli";

async function run() {
  const args = process.argv.slice(2);
  const isRelease = args.includes("--release") || args.includes("-r");
  const useNapiCross = args.includes("--use-napi-cross");
  const crossCompile = args.includes("--cross-compile") || args.includes("-x");
  const useCross = args.includes("--use-cross");

  const targetIdx = args.findIndex((a) => a === "--target" || a === "-t");
  const target = targetIdx !== -1 && args[targetIdx + 1] ? args[targetIdx + 1] : undefined;

  const cli = new NapiCli();
  await cli.build({
    platform: true,
    esm: true,
    outputDir: "./dist",
    release: isRelease,
    target,
    useNapiCross,
    crossCompile,
    useCross,
  });

  for (const file of readdirSync("./dist")) {
    if (file.endsWith(".node")) {
      copyFileSync(join("./dist", file), join(".", file));
    }
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
