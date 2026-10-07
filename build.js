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

  if (fs.existsSync("./dist")) {
    for (const file of fs.readdirSync("./dist")) {
      const srcPath = path.join("./dist", file);
      const destPath = path.join("./", file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  function fixIndexJs(filePath) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replaceAll("my-addon", "alloy_config");
      content = content.replaceAll("@lib/module", "@alloy-ts/config");
      const oldExport = "const { add } = nativeBinding\nexport { add }";
      const newExport =
        "const { Config, ConfigBuilder, Environment, File, Value, FileFormat, ValueKind } = nativeBinding\nexport { Config, ConfigBuilder, Environment, File, Value, FileFormat, ValueKind }";
      if (content.includes(oldExport)) {
        content = content.replace(oldExport, newExport);
      }
      fs.writeFileSync(filePath, content, "utf-8");
    }
  }

  fixIndexJs("./index.js");
  fixIndexJs("./dist/index.js");
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
