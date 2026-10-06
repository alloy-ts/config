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

  const { copyFileSync, existsSync, readdirSync } = await import("node:fs");
  if (existsSync("./dist/index.js")) {
    copyFileSync("./dist/index.js", "./index.js");
  }
  if (existsSync("./dist/index.d.ts")) {
    copyFileSync("./dist/index.d.ts", "./index.d.ts");
  }
  if (existsSync("./dist")) {
    for (const file of readdirSync("./dist")) {
      if (file.endsWith(".node")) {
        copyFileSync(`./dist/${file}`, `./${file}`);
      }
    }
  }
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
