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

  const distFiles = fs.readdirSync("./dist");
  for (const file of distFiles) {
    if (file.endsWith(".d.ts")) {
      const filePath = path.resolve("./dist", file);
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(/export declare const enum/g, "export declare enum");
      fs.writeFileSync(filePath, content, "utf-8");
      fs.writeFileSync(path.resolve(".", file), content, "utf-8");
    } else if (file.endsWith(".js") || file.endsWith(".node")) {
      fs.copyFileSync(path.resolve("./dist", file), path.resolve(".", file));
    }
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
