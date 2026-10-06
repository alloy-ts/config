import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["./src/main.ts"],
    format: "esm",
    outDir: "dist",
    clean: false,
    exports: true,
    dts: {
      generator: "tsgo",
    },
    deps: {
      resolveDepSubpath: true,
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.ts"],
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignore: ["examples/**"],
  },
  lint: {
    ignorePatterns: ["examples/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
  tasks: {
    build: {
      command: "node build.ts",
      cache: {
        input: [{ auto: true }, "!dist/**"],
        output: ["dist/**", "index.js", "index.d.ts"],
      },
    },
    ci: {
      command: "vp check && vp test && node build.ts && vp pack",
      cache: true,
    },
    "ci:cross": {
      command: "node build.ts --all --dry-run",
      cache: true,
    },
  },
});
