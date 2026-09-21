#!/usr/bin/env node

import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as Schema from "zod";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const toUrl = (p) => pathToFileURL(join(root, p)).href;

const {
  configGroupPreferences,
  configSchemas,
  Configs,
  loadConfigFiles,
  requireGroupings,
} = await import(toUrl("src/config.ts"));

/** key → the grouping that owns it as a *required* (primary) key. */
const primaryByKey = new Map();
/** grouping → combined shape of the schemas that declare it as primary. */
const groupShapes = new Map();

for (const schema of configSchemas) {
  const primary = requireGroupings(schema)[0];
  primaryByKey.set(primary, primary); // groups themselves
  for (const [key, field] of Object.entries(schema.shape)) {
    primaryByKey.set(key, primary);
    const shape = groupShapes.get(primary) ?? {};
    shape[key] = field;
    groupShapes.set(primary, shape);
  }
}

/** Strict per-grouping schema: the grouping's own required keys, extras allowed. */
function strictFor(grouping) {
  return Schema.object(groupShapes.get(grouping) ?? {}).passthrough();
}

const files = await loadConfigFiles(configGroupPreferences);

if (files.length === 0) {
  const looked = configGroupPreferences
    .flatMap((list) =>
      list.flatMap((g) => [`${g}.config.{ts,js,json}`, `${g}.{ts,js,json}`])
    )
    .join(", ");
  console.error("✘ no application config file found. Looked for:", looked);
  process.exit(1);
}

const errors = [];

// Per-file: each resolved file is validated against the keys its grouping owns.
for (const { grouping, file, config } of files) {
  const result = strictFor(grouping).safeParse(config);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const where = issue.path.length ? issue.path.join(".") : "(root)";
      errors.push(
        `  ${file} [grouping:${grouping}]: ${where} — ${issue.message}`,
      );
    }
  }
}

// Merged: catches anything that spans files (e.g. a key absent from every file).
// Keys already owned by a resolved grouping were validated per-file above, so
// skip those to avoid double-reporting the same issue.
const merged = Object.assign({}, ...files.map((f) => f.config));
const resolvedGroups = new Set(files.map((f) => f.grouping));
const mergedResult = Configs.safeParse(merged);
if (!mergedResult.success) {
  for (const issue of mergedResult.error.issues) {
    if (issue.path.length === 1) {
      const key = String(issue.path[0]);
      const primary = primaryByKey.get(key);
      if (primary !== undefined && resolvedGroups.has(primary)) continue;
      errors.push(
        `  ${key} — ${issue.message} (required by grouping "${primary}")`,
      );
    } else {
      errors.push(`  ${issue.path.join(".")} — ${issue.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error("✘ invalid application config:");
  for (const error of errors) console.error(error);
  process.exit(1);
}

const keys = Object.keys(mergedResult.data);
console.log(`✔ config valid — ${keys.length} key(s): ${keys.join(", ")}`);
console.log(
  `  loaded from: ${files.map((f) => `${f.file} [${f.grouping}]`).join(", ")}`,
);
