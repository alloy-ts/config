import { NapiCli } from "@napi-rs/cli";
import { execSync } from "node:child_process";
import fs from "node:fs";

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
    outputDir: "dist",
    release: isRelease,
    target,
    useNapiCross,
    crossCompile,
    useCross,
  });

  if (fs.existsSync("./index.d.ts")) {
    let dts = fs.readFileSync("./index.d.ts", "utf-8");
    dts = dts.replace(/export const enum /g, "export enum ");
    fs.writeFileSync("./index.d.ts", dts);
  }

  // Backup native .node files from dist
  const nodeFiles = fs.existsSync("./dist")
    ? fs.readdirSync("./dist").filter((f) => f.endsWith(".node"))
    : [];

  // Copy to root directory immediately so root index.js can find them
  for (const file of nodeFiles) {
    fs.copyFileSync(`./dist/${file}`, `./${file}`);
  }

  execSync("npx vp pack", { stdio: "inherit" });

  // Restore .node files to dist directory after vp pack
  if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist", { recursive: true });
  }
  for (const file of nodeFiles) {
    fs.copyFileSync(`./${file}`, `./dist/${file}`);
  }
  fs.writeFileSync("./dist/index.js", 'export * from "./main.mjs";\n');
  fs.writeFileSync("./dist/index.d.ts", 'export * from "./main.d.mts";\n');
  if (fs.existsSync("./dist/main.d.mts")) {
    let mainDts = fs.readFileSync("./dist/main.d.mts", "utf-8");
    mainDts = mainDts.replace(/export const enum /g, "export enum ");
    fs.writeFileSync("./dist/main.d.mts", mainDts);
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
