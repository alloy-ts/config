import { NapiCli } from "@napi-rs/cli";
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
    outputDir: "./dist",
    release: isRelease,
    target,
    useNapiCross,
    crossCompile,
    useCross,
  });

  if (fs.existsSync("./dist/index.js")) {
    let content = fs.readFileSync("./dist/index.js", "utf-8");
    if (!content.includes("File.new =")) {
      content += `\nFile.new = function(name, format) { return new File(name, format); };\nConfig.File = File;\nFile.Format = FileFormat;\n`;
      fs.writeFileSync("./dist/index.js", content, "utf-8");
    }
    fs.copyFileSync("./dist/index.js", "./index.js");
  }

  if (fs.existsSync("./dist/index.d.ts")) {
    let dts = fs.readFileSync("./dist/index.d.ts", "utf-8");
    dts = dts.replace("export declare const enum FileFormat", "export declare enum FileFormat");
    if (!dts.includes("static File:")) {
      dts = dts.replace(
        "export declare class Config {",
        "export declare class Config {\n  static File: typeof File;",
      );
    }
    if (!dts.includes("static Format:")) {
      dts = dts.replace(
        "export declare class File {",
        "export declare class File {\n  static Format: typeof FileFormat;",
      );
    }
    fs.writeFileSync("./dist/index.d.ts", dts, "utf-8");
    fs.copyFileSync("./dist/index.d.ts", "./index.d.ts");
  }

  for (const file of fs.readdirSync("./dist")) {
    if (file.endsWith(".node")) {
      fs.copyFileSync(`./dist/${file}`, `./${file}`);
    }
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
