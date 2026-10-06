import { NapiCli } from "@napi-rs/cli";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

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

  if (fs.existsSync("./dist/index.d.ts")) {
    let content = fs.readFileSync("./dist/index.d.ts", "utf8");
    content = content.replace(/export declare const enum/g, "export declare enum");
    fs.writeFileSync("./dist/index.d.ts", content, "utf8");
  }

  if (fs.existsSync("./dist")) {
    const files = fs.readdirSync("./dist");
    for (const file of files) {
      if (
        file.endsWith(".node") ||
        file.endsWith(".d.ts") ||
        file.endsWith(".js") ||
        file.endsWith(".cjs")
      ) {
        fs.copyFileSync(path.join("./dist", file), path.join(".", file));
      }
    }
  }

  try {
    execSync("npx vp fmt index.d.ts index.js", { stdio: "ignore" });
  } catch {
    // ignore if fmt not available
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
