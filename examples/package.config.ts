import { definePackageConfig } from "@alloy-ts/config";

export default definePackageConfig({
  "name": "examples",
  "module": "index.ts",
  "type": "module",
  "private": true,
  "scripts": {
    "prepare": "node node_modules/@alloy-ts/config/scripts/codegen.mjs",
    "start": "node src/main.ts",
    "test": "node --test",
  },
  "dependencies": {
    "@alloy-ts/config": "file:..",
  },
  "devDependencies": {
    "@types/bun": "latest",
  },
  "peerDependencies": {
    "typescript": "^5",
  },
});
