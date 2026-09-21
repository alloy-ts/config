#!/usr/bin/env node

import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const updateLandscapeTsUrl =
  pathToFileURL(join(root, "scripts", "update-landscape.ts")).href;

try {
  const { main } = await import(updateLandscapeTsUrl);
  await main();
} catch (error) {
  console.error("Failed to run update-landscape.ts:", error);
  process.exit(1);
}
