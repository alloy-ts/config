import fs from "fs";
import path from "path";

for (const file of [
  "node_modules/@napi-rs/cli/dist/cli.js",
  "node_modules/@napi-rs/cli/dist/index.js",
]) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(
      /join\(dirname\(finalOutputDir\),\s*`\.\$\{basename\(finalOutputDir\)\}\.napi-stage-`\)/g,
      "join(tmpdir(), `.${basename(finalOutputDir)}.napi-stage-`)",
    );
    fs.writeFileSync(file, content);
  }
}

const { NapiCli } = await import("@napi-rs/cli");

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
    outputDir: ".",
    release: isRelease,
    target,
    useNapiCross,
    crossCompile,
    useCross,
  });

  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist", { recursive: true });
  }
  fs.writeFileSync(path.join("dist", "index.js"), 'export * from "../index.js";\n');
}

void run().catch((err) => {
  console.error(err);
  process.exit(1);
});
