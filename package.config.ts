import { definePackageConfig } from "./src/config.ts"

export default definePackageConfig({
  "name": "@alloy-ts/config",
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./dist/main.mjs",
    "./scripts/*": "./scripts/*",
    "./package.json": "./package.json"
  },
  "files": ["dist","scripts"],
  "scripts": {
    "build": "tsdown",
    "dev": "tsdown --watch",
    "prepare": "node scripts/codegen.mjs",
    "start": "node src/main.ts",
    "test": "node --test"
  },
  "dependencies": {
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@types/node": "^26.6.2",
    "tsdown": "^0.23.0"
  },
  "peerDependencies": {
    "typescript": "^7.0.2"
  },
});
