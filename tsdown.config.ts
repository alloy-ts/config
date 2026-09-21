import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  dts: true,
  exports: true,
  format: "esm",
  entry: ["./src/main.ts"],
  outDir: "dist",
  hooks: {
    // Validate the resolved config during the build so missing/invalid keys
    // fail here rather than when the app loads it at runtime.
    "build:prepare": () => {
      execFileSync(process.execPath, [join(root, "scripts/check-config.mjs")], {
        stdio: "inherit",
      });
    },
  },
});
