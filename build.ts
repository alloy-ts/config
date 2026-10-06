import fs from "node:fs";
import path from "node:path";
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
  const nativeDir = path.resolve(process.cwd(), "native");
  const { task } = await cli.build({
    cwd: process.cwd(),
    platform: true,
    esm: true,
    outputDir: nativeDir,
    release: isRelease,
    target,
    useNapiCross,
    crossCompile,
    useCross,
  });
  await task;

  // Copy generated files to root as required by loader
  if (fs.existsSync(nativeDir)) {
    const files = fs.readdirSync(nativeDir);
    for (const file of files) {
      if (
        file.endsWith(".node") ||
        file.endsWith(".d.ts") ||
        file.endsWith(".js") ||
        file.endsWith(".wasm")
      ) {
        fs.copyFileSync(path.join(nativeDir, file), path.resolve(process.cwd(), file));
      }
    }
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
