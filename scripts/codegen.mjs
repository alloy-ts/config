#!/usr/bin/env node

import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { execSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const toUrl = (p) => pathToFileURL(resolve(repoRoot, p)).href;

async function runCodegen() {
  const cwd = process.cwd();
  let configModule;
  try {
    configModule = await import("@alloy-ts/config");
  } catch {
    const distPath = resolve(repoRoot, "dist/main.mjs");
    if (
      !existsSync(distPath) && existsSync(resolve(repoRoot, "tsdown.config.ts"))
    ) {
      try {
        execSync("npx tsdown", { cwd: repoRoot, stdio: "ignore" });
      } catch {
        // ignore build error
      }
    }
    try {
      configModule = await import(toUrl("dist/main.mjs"));
    } catch {
      configModule = await import(toUrl("src/config.ts"));
    }
  }
  const { configGroupPreferences, loadAppConfig, DEFAULT_CODEGEN } =
    configModule;

  let appConfig = {};
  try {
    appConfig = await loadAppConfig(configGroupPreferences);
  } catch {
    // If no config file is found, skip codegen silently
    return;
  }

  const codegenMappings = appConfig.config?.codegen ?? DEFAULT_CODEGEN;
  if (!Array.isArray(codegenMappings) || codegenMappings.length === 0) {
    return;
  }

  for (const mapping of codegenMappings) {
    const { in: inFile, out: outFile } = mapping;
    if (!inFile || !outFile) continue;

    const inFiles = Array.isArray(inFile) ? inFile : [inFile];
    if (inFiles.length === 0) continue;

    const loadedContents = [];
    let hasError = false;

    for (const file of inFiles) {
      const inPath = resolve(cwd, file);
      if (!existsSync(inPath)) {
        console.warn(`[codegen] Warning: input file "${file}" does not exist.`);
        hasError = true;
        break;
      }

      try {
        let content;
        if (file.endsWith(".yaml") || file.endsWith(".yml")) {
          const text = readFileSync(inPath, "utf8");
          content = parseYaml(text);
        } else if (file.endsWith(".json") || file.endsWith(".jsonc")) {
          const text = readFileSync(inPath, "utf8");
          const stripped = text
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1")
            .replace(/,\s*([\]}])/g, "$1");
          content = JSON.parse(stripped);
        } else {
          const inUrl = pathToFileURL(inPath).href;
          const imported = await import(inUrl);
          content = imported.default !== undefined
            ? imported.default
            : imported;
        }
        loadedContents.push(content);
      } catch (err) {
        console.warn(
          `[codegen] Warning: failed to load input file "${file}":`,
          err,
        );
        hasError = true;
        break;
      }
    }

    if (hasError || loadedContents.length === 0) continue;

    let finalContent;
    if (inFiles.length === 1) {
      finalContent = loadedContents[0];
    } else {
      finalContent = {};
      for (const item of loadedContents) {
        if (typeof item === "object" && item !== null) {
          finalContent = { ...finalContent, ...item };
        }
      }
    }

    const outPath = resolve(cwd, outFile);
    let outData;
    const formatOption = mapping.format;

    if (formatOption === "yaml") {
      outData = typeof finalContent === "string"
        ? finalContent
        : stringifyYaml(finalContent);
    } else if (formatOption === "json") {
      outData = typeof finalContent === "string"
        ? finalContent
        : JSON.stringify(finalContent, null, 2) + "\n";
    } else if (formatOption === "ts" || formatOption === "js") {
      outData = typeof finalContent === "string"
        ? finalContent
        : `export default ${JSON.stringify(finalContent, null, 2)};\n`;
    } else if (outFile.endsWith(".yaml") || outFile.endsWith(".yml")) {
      outData = typeof finalContent === "string"
        ? finalContent
        : stringifyYaml(finalContent);
    } else if (outFile.endsWith(".ts") || outFile.endsWith(".js")) {
      outData = typeof finalContent === "string"
        ? finalContent
        : `export default ${JSON.stringify(finalContent, null, 2)};\n`;
    } else if (typeof finalContent === "string") {
      outData = finalContent;
    } else {
      outData = JSON.stringify(finalContent, null, 2) + "\n";
    }

    writeFileSync(outPath, outData, "utf8");
    const inDesc = Array.isArray(inFile)
      ? JSON.stringify(inFile)
      : `"${inFile}"`;
    console.log(`[codegen] Generated "${outFile}" from ${inDesc}.`);
  }
}

runCodegen().catch((err) => {
  console.error("[codegen] Error executing codegen:", err);
  process.exit(1);
});
