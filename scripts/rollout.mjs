#!/usr/bin/env node

import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rolloutTsUrl = pathToFileURL(join(root, "scripts", "rollout.ts")).href;

try {
  const { main } = await import(rolloutTsUrl);
  await main();
} catch (error) {
  console.error("Failed to run rollout.ts:", error);
  process.exit(1);
}
