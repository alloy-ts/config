#!/usr/bin/env node

import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bootstrapTsUrl =
  pathToFileURL(join(root, "scripts", "bootstrap.ts")).href;

try {
  const { main } = await import(bootstrapTsUrl);
  await main();
} catch (error) {
  console.error("Failed to run bootstrap.ts:", error);
  process.exit(1);
}
