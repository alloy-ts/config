#!/usr/bin/env node

import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { writeFileSync, existsSync } from "node:fs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const toUrl = (p) => pathToFileURL(resolve(repoRoot, p)).href;

async function runCodegen() {
  const cwd = process.cwd();
  let configModule;
  try {
    configModule = await import("@alloy-ts/config");
  } catch {
    try {
      configModule = await import(toUrl("dist/main.mjs"));
    } catch {
      configModule = await import(toUrl("src/config.ts"));
    }
  }
  const { configGroupPreferences, loadAppConfig, DEFAULT_CODEGEN } = configModule;

  let appConfig = {};
  try {
    appConfig = await loadAppConfig(configGroupPreferences);
  } catch {
    // If no config file is found, skip codegen silently
    return;
  }

  const codegenMappings =
    appConfig.config?.codegen ?? DEFAULT_CODEGEN;
  if (!Array.isArray(codegenMappings) || codegenMappings.length === 0) {
    return;
  }

  for (const mapping of codegenMappings) {
    const { in: inFile, out: outFile } = mapping;
    if (!inFile || !outFile) continue;

    const inPath = resolve(cwd, inFile);
    if (!existsSync(inPath)) {
      console.warn(`[codegen] Warning: input file "${inFile}" does not exist.`);
      continue;
    }

    const inUrl = pathToFileURL(inPath).href;
    const isJson = inFile.endsWith(".json");
    const options = isJson ? { with: { type: "json" } } : undefined;

    const imported = await import(inUrl, options);
    const content = imported.default !== undefined ? imported.default : imported;

    const outPath = resolve(cwd, outFile);
    const outData =
      typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2) + "\n";

    writeFileSync(outPath, outData, "utf8");
    console.log(`[codegen] Generated "${outFile}" from "${inFile}".`);
  }
}

runCodegen().catch((err) => {
  console.error("[codegen] Error executing codegen:", err);
  process.exit(1);
});
