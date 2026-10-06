import { NapiCli } from "@napi-rs/cli";
import fs from "node:fs";
import path from "node:path";

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

  const rootDir = process.cwd();
  const distDir = path.join(rootDir, "dist");

  // Copy .node files and NAPI index.js to root directory
  if (fs.existsSync(distDir)) {
    for (const file of fs.readdirSync(distDir)) {
      if (file.endsWith(".node") || file === "index.d.ts" || file === "index.js") {
        fs.copyFileSync(path.join(distDir, file), path.join(rootDir, file));
      }
    }
    // Copy index.mjs to index.js in dist so direct imports to dist/index.js load index.mjs
    if (fs.existsSync(path.join(distDir, "index.mjs"))) {
      fs.copyFileSync(path.join(distDir, "index.mjs"), path.join(distDir, "index.js"));
    }
  }

  // Ensure config/settings.json exists for tests
  fs.mkdirSync(path.join(rootDir, "config"), { recursive: true });
  fs.writeFileSync(
    path.join(rootDir, "config", "settings.json"),
    JSON.stringify({ setting: "json_file_value" }) + "\n",
  );
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
