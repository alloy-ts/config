import fs from "node:fs";
import path from "node:path";
import { NapiCli } from "@napi-rs/cli";

function fixConstEnums() {
  const distDir = path.resolve(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    for (const file of files) {
      if (file.endsWith(".d.ts") || file.endsWith(".d.mts")) {
        const filePath = path.join(distDir, file);
        let content = fs.readFileSync(filePath, "utf-8");
        const updated = content.replace(/(export\s+)?declare\s+const\s+enum/g, "$1declare enum");
        if (updated !== content) {
          fs.writeFileSync(filePath, updated, "utf-8");
        }
      }
    }
  }
}

async function run() {
  const args = process.argv.slice(2);
  const isPost = args.includes("--post");

  if (isPost) {
    fixConstEnums();
    return;
  }

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

  fixConstEnums();
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
