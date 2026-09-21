import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { parse as parseYaml } from "yaml";
import {
  ConfigManager,
  configPreferences,
  createDefineConfig,
  DEFAULT_MERGE_WITH_GLOBAL,
  defaultConfig,
  defineConfig,
  defineConfigFor,
  defineDenoConfig,
  defineOrgConfig,
  definePackageConfig,
  defineProjectConfig,
  defineTypeScriptConfig,
  expandHomeDir,
  getConfig,
  loadAppConfig,
  loadConfigFiles,
  requireGroupings,
  setConfig,
} from "../src/config.ts";
import * as Schema from "zod";
import { configReg } from "../src/models/registries.ts";
import { ConfigConfig } from "../src/models/config/std.ts";
import { PackageConfig } from "../src/models/config/package.ts";
import { TsconfigConfig } from "../src/models/config/tsconfig.ts";
import { DenoConfig } from "../src/models/config/deno.ts";
import { ProjectConfig } from "../src/models/config/project.ts";
import { OrgConfig } from "../src/models/config/org.ts";

describe("Config interface & set/get methods", () => {
  it("should set and get config values by key and by group + key", () => {
    setConfig("package", "name", "my-package");
    setConfig("package", "version", "1.0.0");

    assert.equal(getConfig("name"), "my-package");
    assert.equal(getConfig("version"), "1.0.0");
    assert.equal(getConfig("package", "name"), "my-package");
    assert.equal(getConfig("package", "version"), "1.0.0");
    assert.equal(getConfig("nonexistent"), undefined);
    assert.equal(getConfig("package", "nonexistent"), undefined);
  });

  it("should support independent ConfigManager instances", () => {
    const mgr = new ConfigManager({ initialKey: "initialVal" });
    assert.equal(mgr.get("initialKey"), "initialVal");

    mgr.set("database", "url", "sqlite://test.db");
    assert.equal(mgr.get("url"), "sqlite://test.db");
    assert.equal(mgr.get("database", "url"), "sqlite://test.db");
  });
});

describe("Candidate file resolution (with or without .config)", () => {
  it("should load candidate file with .config suffix (e.g. dummy1.config.json)", async () => {
    const filePath = resolve(process.cwd(), "dummy1.config.json");
    writeFileSync(filePath, JSON.stringify({ foo: "bar1" }));
    try {
      const files = await loadConfigFiles([["dummy1"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy1");
      assert.equal(files[0].file, "dummy1.config.json");
      assert.deepEqual(files[0].config, { foo: "bar1" });
    } finally {
      unlinkSync(filePath);
    }
  });

  it("should load candidate file with .config.yaml suffix", async () => {
    const filePath = resolve(process.cwd(), "dummy3.config.yaml");
    writeFileSync(filePath, "foo: yaml1\nbar: 123\n");
    try {
      const files = await loadConfigFiles([["dummy3"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy3");
      assert.equal(files[0].file, "dummy3.config.yaml");
      assert.deepEqual(files[0].config, { foo: "yaml1", bar: 123 });
    } finally {
      unlinkSync(filePath);
    }
  });

  it("should load candidate file with .yml extension without .config suffix", async () => {
    const filePath = resolve(process.cwd(), "dummy4.yml");
    writeFileSync(filePath, "greeting: hello\ncount: 5\n");
    try {
      const files = await loadConfigFiles([["dummy4"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy4");
      assert.equal(files[0].file, "dummy4.yml");
      assert.deepEqual(files[0].config, { greeting: "hello", count: 5 });
    } finally {
      unlinkSync(filePath);
    }
  });

  it("should load candidate file without .config suffix (e.g. dummy2.json)", async () => {
    const filePath = resolve(process.cwd(), "dummy2.json");
    writeFileSync(filePath, JSON.stringify({ foo: "bar2" }));
    try {
      const files = await loadConfigFiles([["dummy2"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy2");
      assert.equal(files[0].file, "dummy2.json");
      assert.deepEqual(files[0].config, { foo: "bar2" });
    } finally {
      unlinkSync(filePath);
    }
  });

  it("should load package config candidate for 'package' grouping", async () => {
    const files = await loadConfigFiles([["package"]]);
    assert.equal(files.length, 1);
    assert.equal(files[0].grouping, "package");
    assert.ok(
      files[0].file === "package.config.ts" ||
        files[0].file === "package.json" ||
        files[0].file === "package.config.json",
    );
    assert.equal(typeof files[0].config.name, "string");
  });

  it("should throw error when loading app config if no file matches preferences", async () => {
    await assert.rejects(
      async () => {
        await loadAppConfig([["nonexistent_grouping_xyz_123"]]);
      },
      (err: Error) => {
        return err.message.includes(
          "Unable to load application config. Looked for:",
        );
      },
    );
  });
});

describe("PackageConfig schema & definePackageConfig", () => {
  it("should validate a standard package.json configuration", () => {
    const pkg = PackageConfig.parse({
      name: "my-package",
      version: "1.0.0",
      description: "A test package",
      license: "MIT",
      type: "module",
      scripts: { test: "node --test" },
      dependencies: { zod: "^4.0.0" },
    });
    assert.equal(pkg.name, "my-package");
    assert.equal(pkg.version, "1.0.0");
    assert.equal(pkg.type, "module");
  });

  it("should validate package config via definePackageConfig helper", () => {
    const pkgConfig = definePackageConfig({
      name: "authoring-test",
      version: "2.0.0",
      scripts: { build: "tsdown" },
    });
    assert.equal(pkgConfig.name, "authoring-test");
    assert.equal(pkgConfig.version, "2.0.0");
    assert.deepEqual(pkgConfig.scripts, { build: "tsdown" });
  });
});

describe("TsconfigConfig schema & defineTypeScriptConfig", () => {
  it("should validate a standard tsconfig.json configuration", () => {
    const tsconfig = TsconfigConfig.parse({
      compilerOptions: {
        strict: true,
        target: "esnext",
        moduleResolution: "bundler",
      },
      include: ["src/**/*"],
    });
    assert.deepEqual(tsconfig.compilerOptions?.target, "esnext");
    assert.deepEqual(tsconfig.include, ["src/**/*"]);
  });

  it("should validate tsconfig via defineTypeScriptConfig helper", () => {
    const cfg = defineTypeScriptConfig({
      compilerOptions: {
        noEmit: true,
      },
      exclude: ["node_modules"],
    });
    assert.equal(cfg.compilerOptions?.noEmit, true);
    assert.deepEqual(cfg.exclude, ["node_modules"]);
  });

  it("should load tsconfig candidate for ['ts', 'tsconfig'] grouping", async () => {
    const files = await loadConfigFiles([["ts", "tsconfig"]]);
    assert.equal(files.length, 1);
    assert.ok(files[0].grouping === "ts" || files[0].grouping === "tsconfig");
    assert.ok(
      files[0].file === "ts.config.ts" || files[0].file === "tsconfig.json",
    );
    assert.equal(typeof files[0].config.compilerOptions, "object");
  });
});

describe("ProjectConfig schema & defineProjectConfig", () => {
  it("should validate a valid CNCF project.yaml configuration", () => {
    const validProject = {
      schemaVersion: "0.1.0",
      slug: "helm",
      name: "Helm",
      description: "The Kubernetes Package Manager",
      type: "project",
      package_managers: {
        container: ["ghcr.io/helm/helm"],
      },
      project_lead: "@jdoe",
      slack_channels: [
        {
          name: "#helm-users",
          workspace: "cncf",
          link: "https://cloud-native.slack.com/messages/helm-users",
          primary: true,
        },
      ],
      maturityLog: [
        {
          phase: "graduated",
          date: "2020-04-30T00:00:00Z",
          issue: "https://github.com/cncf/toc/issues/123",
        },
      ],
      repositories: [
        {
          url: "https://github.com/helm/helm",
          primary: true,
        },
        "https://github.com/helm/chart-testing",
      ],
      website: "https://helm.sh",
      security: {
        policy: "https://github.com/helm/community/blob/main/SECURITY.md",
        contact: {
          email: "cncf-helm-security@lists.cncf.io",
        },
      },
      legal: {
        license: "https://github.com/helm/helm/blob/main/LICENSE",
        identity_type: {
          has_dco: true,
          has_cla: true,
        },
      },
      landscape: {
        category: "App Definition and Development",
        subcategory: "Application Definition & Image Build",
      },
    };

    const parsed = ProjectConfig.parse(validProject);
    assert.equal(parsed.slug, "helm");
    assert.equal(parsed.project_lead, "jdoe");
    assert.equal(parsed.maturityLog[0].phase, "graduated");
  });

  it("should validate project config via defineProjectConfig helper", () => {
    const project = defineProjectConfig({
      schemaVersion: "0.1.0",
      slug: "my-tool",
      name: "My Tool",
      description: "A cool tool",
      maturityLog: [
        {
          phase: "sandbox",
          date: "2023-01-01",
          issue: "https://github.com/cncf/toc/issues/999",
        },
      ],
      repositories: ["https://github.com/my-org/my-tool"],
    });

    assert.equal(project.slug, "my-tool");
    assert.equal(project.name, "My Tool");
  });

  it("should fail validation for non-chronological maturity log", () => {
    assert.throws(() => {
      ProjectConfig.parse({
        schemaVersion: "0.1.0",
        slug: "test-proj",
        name: "Test",
        description: "Test",
        maturityLog: [
          {
            phase: "graduated",
            date: "2023-01-01",
            issue: "https://github.com/cncf/toc/issues/2",
          },
          {
            phase: "sandbox",
            date: "2020-01-01",
            issue: "https://github.com/cncf/toc/issues/1",
          },
        ],
        repositories: ["https://github.com/test/test"],
      });
    }, /Maturity log entries must be in chronological order/);
  });

  it("should fail validation for invalid slug", () => {
    assert.throws(() => {
      ProjectConfig.parse({
        schemaVersion: "0.1.0",
        slug: "-invalid-slug-",
        name: "Test",
        description: "Test",
        maturityLog: [
          {
            phase: "sandbox",
            date: "2023-01-01",
            issue: "https://github.com/cncf/toc/issues/1",
          },
        ],
        repositories: ["https://github.com/test/test"],
      });
    }, /Slug must contain/);
  });

  it("should fail validation for multiple primary slack channels", () => {
    assert.throws(() => {
      ProjectConfig.parse({
        schemaVersion: "0.1.0",
        slug: "test-proj",
        name: "Test",
        description: "Test",
        slack_channels: [
          { name: "#channel-1", primary: true },
          { name: "#channel-2", primary: true },
        ],
        maturityLog: [
          {
            phase: "sandbox",
            date: "2023-01-01",
            issue: "https://github.com/cncf/toc/issues/1",
          },
        ],
        repositories: ["https://github.com/test/test"],
      });
    }, /At most one Slack channel may be marked as primary/);
  });

  it("should fail validation for security contact without email or advisory_url", () => {
    assert.throws(() => {
      ProjectConfig.parse({
        schemaVersion: "0.1.0",
        slug: "test-proj",
        name: "Test",
        description: "Test",
        maturityLog: [
          {
            phase: "sandbox",
            date: "2023-01-01",
            issue: "https://github.com/cncf/toc/issues/1",
          },
        ],
        repositories: ["https://github.com/test/test"],
        security: {
          contact: {},
        },
      });
    }, /At least one of email or advisory_url must be provided/);
  });

  it("should fail validation for invalid identity_type CLA/DCO combinations", () => {
    assert.throws(() => {
      ProjectConfig.parse({
        schemaVersion: "0.1.0",
        slug: "test-proj",
        name: "Test",
        description: "Test",
        maturityLog: [
          {
            phase: "sandbox",
            date: "2023-01-01",
            issue: "https://github.com/cncf/toc/issues/1",
          },
        ],
        repositories: ["https://github.com/test/test"],
        legal: {
          identity_type: {
            has_cla: true,
            has_dco: false,
          },
        },
      });
    }, /Invalid CLA\/DCO combination/);
  });
});

describe("OrgConfig schema & defineOrgConfig", () => {
  it("should validate a valid CNCF org.yaml configuration", () => {
    const validOrg = {
      schemaVersion: "0.1.0",
      org: "spiffe",
      projects: [{ id: "spiffe" }, { id: "spire", path: "spire" }],
    };

    const parsed = OrgConfig.parse(validOrg);
    assert.equal(parsed.org, "spiffe");
    assert.equal(parsed.projects.length, 2);
  });

  it("should validate org config via defineOrgConfig helper", () => {
    const orgConfig = defineOrgConfig({
      schemaVersion: "0.1.0",
      org: "spinframework",
      projects: [{ id: "spin" }, { id: "spinkube" }],
    });

    assert.equal(orgConfig.org, "spinframework");
    assert.equal(orgConfig.projects[0].id, "spin");
  });

  it("should fail validation if projects has fewer than 2 entries", () => {
    assert.throws(() => {
      OrgConfig.parse({
        schemaVersion: "0.1.0",
        org: "single-org",
        projects: [{ id: "single" }],
      });
    }, /Org projects list must contain at least two entries/);
  });

  it("should fail validation if project ids are duplicate", () => {
    assert.throws(() => {
      OrgConfig.parse({
        schemaVersion: "0.1.0",
        org: "dup-org",
        projects: [{ id: "proj-1" }, { id: "proj-1" }],
      });
    }, /Project id values within org.yaml must be unique/);
  });

  it("should fail validation for invalid project path", () => {
    assert.throws(() => {
      OrgConfig.parse({
        schemaVersion: "0.1.0",
        org: "bad-path-org",
        projects: [
          { id: "proj-1", path: "../invalid/path" },
          { id: "proj-2" },
        ],
      });
    }, /Path must be relative, exactly one level deep/);
  });
});

describe("DenoConfig schema & defineDenoConfig", () => {
  it("should validate a standard deno.json configuration", () => {
    const deno = DenoConfig.parse({
      name: "@scope/my-deno-package",
      version: "1.0.0",
      exports: "./mod.ts",
      tasks: {
        start: "deno run main.ts",
        test: {
          description: "Run unit tests",
          command: "deno test",
        },
      },
      imports: {
        "std/": "https://deno.land/std@0.200.0/",
      },
      fmt: {
        useTabs: true,
        lineWidth: 100,
      },
      lint: {
        report: "pretty",
      },
    });
    assert.equal(deno.name, "@scope/my-deno-package");
    assert.equal(deno.version, "1.0.0");
    assert.equal(deno.exports, "./mod.ts");
    assert.equal(deno.fmt?.useTabs, true);
  });

  it("should validate deno config via defineDenoConfig helper", () => {
    const denoConfig = defineDenoConfig({
      name: "my-deno-app",
      version: "0.1.0",
      nodeModulesDir: "auto",
      vendor: true,
    });
    assert.equal(denoConfig.name, "my-deno-app");
    assert.equal(denoConfig.nodeModulesDir, "auto");
    assert.equal(denoConfig.vendor, true);
  });

  it("should load deno candidate for 'deno' grouping", async () => {
    const filePath = resolve(process.cwd(), "deno.config.json");
    writeFileSync(
      filePath,
      JSON.stringify({ name: "test-deno-candidate", version: "0.0.1" }),
    );
    try {
      const files = await loadConfigFiles([["deno"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "deno");
      assert.equal(files[0].file, "deno.config.json");
      assert.equal(files[0].config.name, "test-deno-candidate");
    } finally {
      unlinkSync(filePath);
    }
  });
});

describe("ConfigConfig schema & prepare script", () => {
  it("should default config properties when not provided", () => {
    const parsed = ConfigConfig.parse({});
    assert.deepEqual(parsed.config, {
      mergeWithGlobal: ["~/.config", "~"],
      codegen: [
        { in: "package.config.ts", out: "package.json" },
        { in: "ts.config.ts", out: "tsconfig.json" },
        { in: "deno.config.ts", out: "deno.json" },
        { in: "compose.config.ts", out: "compose.yml" },
        { in: "container.config.ts", out: "container.config.yml" },
      ],
    });
  });

  it("should validate codegen configuration schema under config object", () => {
    const parsed = ConfigConfig.parse({
      config: {
        codegen: [{ in: "package.config.ts", out: "package.json" }],
      },
    });
    assert.deepEqual(parsed.config?.codegen, [
      { in: "package.config.ts", out: "package.json" },
    ]);
  });

  it("should validate codegen configuration schema with array in", () => {
    const parsed = ConfigConfig.parse({
      config: {
        codegen: [{ in: ["package.json", "deno.json"], out: "deno.jsonc" }],
      },
    });
    assert.deepEqual(parsed.config?.codegen, [
      { in: ["package.json", "deno.json"], out: "deno.jsonc" },
    ]);
  });

  it("should validate codegen configuration schema with explicit format option", () => {
    const parsed = ConfigConfig.parse({
      config: {
        codegen: [{
          in: "compose.config.ts",
          out: "compose.yml",
          format: "yaml",
        }],
      },
    });
    assert.deepEqual(parsed.config?.codegen, [
      { in: "compose.config.ts", out: "compose.yml", format: "yaml" },
    ]);
  });

  it("should execute codegen with explicit format option", () => {
    const alloyConfigPath = resolve(process.cwd(), "alloy.config.json");
    const codegenInPath = resolve(process.cwd(), "test-format-in.json");
    const codegenOutPath = resolve(process.cwd(), "test-format-out.txt");

    writeFileSync(
      codegenInPath,
      JSON.stringify({ service: "api", replicas: 3 }),
    );
    writeFileSync(
      alloyConfigPath,
      JSON.stringify({
        config: {
          codegen: [{
            in: "test-format-in.json",
            out: "test-format-out.txt",
            format: "yaml",
          }],
        },
      }),
    );

    try {
      execFileSync(process.execPath, ["scripts/codegen.mjs"], {
        cwd: process.cwd(),
        stdio: "pipe",
      });

      assert.equal(existsSync(codegenOutPath), true);
      const rawText = readFileSync(codegenOutPath, "utf8");
      const parsed = parseYaml(rawText);
      assert.deepEqual(parsed, { service: "api", replicas: 3 });
    } finally {
      if (existsSync(alloyConfigPath)) unlinkSync(alloyConfigPath);
      if (existsSync(codegenInPath)) unlinkSync(codegenInPath);
      if (existsSync(codegenOutPath)) unlinkSync(codegenOutPath);
    }
  });

  it("should execute codegen generating yaml output file", () => {
    const alloyConfigPath = resolve(process.cwd(), "alloy.config.json");
    const codegenInPath = resolve(process.cwd(), "test-in-yaml.json");
    const codegenOutPath = resolve(process.cwd(), "test-out.yaml");

    writeFileSync(
      codegenInPath,
      JSON.stringify({ name: "yaml-app", port: 8080 }),
    );
    writeFileSync(
      alloyConfigPath,
      JSON.stringify({
        config: {
          codegen: [{ in: "test-in-yaml.json", out: "test-out.yaml" }],
        },
      }),
    );

    try {
      execFileSync(process.execPath, ["scripts/codegen.mjs"], {
        cwd: process.cwd(),
        stdio: "pipe",
      });

      assert.equal(existsSync(codegenOutPath), true);
      const rawYaml = readFileSync(codegenOutPath, "utf8");
      const parsedYaml = parseYaml(rawYaml);
      assert.deepEqual(parsedYaml, { name: "yaml-app", port: 8080 });
    } finally {
      if (existsSync(alloyConfigPath)) unlinkSync(alloyConfigPath);
      if (existsSync(codegenInPath)) unlinkSync(codegenInPath);
      if (existsSync(codegenOutPath)) unlinkSync(codegenOutPath);
    }
  });

  it("should execute codegen merging array of in input files", () => {
    const alloyConfigPath = resolve(process.cwd(), "alloy.config.json");
    const inPath1 = resolve(process.cwd(), "test-in1.json");
    const inPath2 = resolve(process.cwd(), "test-in2.yaml");
    const codegenOutPath = resolve(process.cwd(), "test-merged.jsonc");

    writeFileSync(
      inPath1,
      JSON.stringify({ name: "pkg1", version: "1.0.0", description: "first" }),
    );
    writeFileSync(inPath2, "name: pkg2\nlicense: MIT\n");
    writeFileSync(
      alloyConfigPath,
      JSON.stringify({
        config: {
          codegen: [{
            in: ["test-in1.json", "test-in2.yaml"],
            out: "test-merged.jsonc",
          }],
        },
      }),
    );

    try {
      execFileSync(process.execPath, ["scripts/codegen.mjs"], {
        cwd: process.cwd(),
        stdio: "pipe",
      });

      assert.equal(existsSync(codegenOutPath), true);
      const outContent = JSON.parse(readFileSync(codegenOutPath, "utf8"));
      assert.deepEqual(outContent, {
        name: "pkg2",
        version: "1.0.0",
        description: "first",
        license: "MIT",
      });
    } finally {
      if (existsSync(alloyConfigPath)) unlinkSync(alloyConfigPath);
      if (existsSync(inPath1)) unlinkSync(inPath1);
      if (existsSync(inPath2)) unlinkSync(inPath2);
      if (existsSync(codegenOutPath)) unlinkSync(codegenOutPath);
    }
  });

  it("should execute codegen via scripts/codegen.mjs", () => {
    const alloyConfigPath = resolve(process.cwd(), "alloy.config.json");
    const codegenInPath = resolve(process.cwd(), "test-in.json");
    const codegenOutPath = resolve(process.cwd(), "test-out.json");

    writeFileSync(
      codegenInPath,
      JSON.stringify({ generated: true, value: 42 }),
    );
    writeFileSync(
      alloyConfigPath,
      JSON.stringify({
        config: {
          codegen: [{ in: "test-in.json", out: "test-out.json" }],
        },
      }),
    );

    try {
      execFileSync(process.execPath, ["scripts/codegen.mjs"], {
        cwd: process.cwd(),
        stdio: "pipe",
      });

      assert.equal(existsSync(codegenOutPath), true);
      const outContent = JSON.parse(readFileSync(codegenOutPath, "utf8"));
      assert.deepEqual(outContent, { generated: true, value: 42 });
    } finally {
      if (existsSync(alloyConfigPath)) unlinkSync(alloyConfigPath);
      if (existsSync(codegenInPath)) unlinkSync(codegenInPath);
      if (existsSync(codegenOutPath)) unlinkSync(codegenOutPath);
    }
  });

  it("should execute codegen via scripts/codegen.mjs from a subdirectory", () => {
    const subDir = resolve(process.cwd(), ".tmp_sub_test");
    mkdirSync(subDir, { recursive: true });

    const alloyConfigPath = resolve(subDir, "alloy.config.json");
    const codegenInPath = resolve(subDir, "test-in.json");
    const codegenOutPath = resolve(subDir, "test-out.json");
    const scriptPath = resolve(process.cwd(), "scripts/codegen.mjs");

    writeFileSync(
      codegenInPath,
      JSON.stringify({ generatedInSubdir: true, value: 100 }),
    );
    writeFileSync(
      alloyConfigPath,
      JSON.stringify({
        config: {
          codegen: [{ in: "test-in.json", out: "test-out.json" }],
        },
      }),
    );

    try {
      execFileSync(process.execPath, [scriptPath], {
        cwd: subDir,
        stdio: "pipe",
      });

      assert.equal(existsSync(codegenOutPath), true);
      const outContent = JSON.parse(readFileSync(codegenOutPath, "utf8"));
      assert.deepEqual(outContent, { generatedInSubdir: true, value: 100 });
    } finally {
      rmSync(subDir, { recursive: true, force: true });
    }
  });

  it("should execute codegen in examples directory using @alloy-ts/config package import", () => {
    const examplesDir = resolve(process.cwd(), "examples");
    const scriptPath = resolve(process.cwd(), "scripts/codegen.mjs");

    execFileSync(process.execPath, [scriptPath], {
      cwd: examplesDir,
      stdio: "pipe",
    });

    const pkgJsonPath = resolve(examplesDir, "package.json");
    assert.equal(existsSync(pkgJsonPath), true);
    const content = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
    assert.equal(content.name, "examples");
  });
});

describe("MergeWithGlobalConfig schema & global config merging", () => {
  it("should default mergeWithGlobal array to ['~/.config', '~']", () => {
    const parsed = ConfigConfig.parse({});
    assert.deepEqual(parsed.config?.mergeWithGlobal, ["~/.config", "~"]);
    assert.deepEqual(DEFAULT_MERGE_WITH_GLOBAL, ["~/.config", "~"]);
  });

  it("should validate custom mergeWithGlobal array under config object", () => {
    const parsed = ConfigConfig.parse({
      config: {
        mergeWithGlobal: ["/etc/alloy", "~/.alloy"],
      },
    });
    assert.deepEqual(parsed.config?.mergeWithGlobal, [
      "/etc/alloy",
      "~/.alloy",
    ]);
  });

  it("should fail validation or ignore when codegen or mergeWithGlobal are at top-level without config object", () => {
    // Top level codegen is not a recognized property on ConfigConfig / ConfigObject
    // Parsing through defineConfig with strict validation or checking object shape
    const StrictConfig = ConfigConfig.strict();
    assert.throws(() => {
      StrictConfig.parse({
        codegen: [{ in: "package.config.ts", out: "package.manifest.json" }],
      });
    });
  });

  it("should expand home directory path", () => {
    assert.equal(expandHomeDir("~"), homedir());
    assert.equal(expandHomeDir("~/.config"), resolve(homedir(), ".config"));
    assert.equal(expandHomeDir("/tmp/config"), "/tmp/config");
  });

  it("should merge global config with local config override", async () => {
    const tmpGlobalDir = resolve(process.cwd(), ".tmp_global_config_test");
    mkdirSync(tmpGlobalDir, { recursive: true });

    const globalConfigFile = join(tmpGlobalDir, "dummy_merge.config.json");
    writeFileSync(
      globalConfigFile,
      JSON.stringify({
        title: "Global Title",
        globalOption: "enabled",
        port: 3000,
      }),
    );

    const localConfigFile = resolve(process.cwd(), "dummy_merge.config.json");
    writeFileSync(
      localConfigFile,
      JSON.stringify({
        config: {
          mergeWithGlobal: [tmpGlobalDir],
        },
        title: "Local Title",
        port: 8080,
      }),
    );

    try {
      const files = await loadConfigFiles([["dummy_merge"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "dummy_merge");
      assert.deepEqual(files[0].config, {
        config: {
          mergeWithGlobal: [tmpGlobalDir],
        },
        title: "Local Title",
        globalOption: "enabled",
        port: 8080,
      });
    } finally {
      if (existsSync(localConfigFile)) unlinkSync(localConfigFile);
      rmSync(tmpGlobalDir, { recursive: true, force: true });
    }
  });
});

describe("Authoring & Discovery", () => {
  it("should create defineConfig helpers and validate correct shapes", () => {
    const TestSchema = Schema.object({
      port: Schema.number(),
    });
    const defConfig = createDefineConfig(TestSchema);

    const result = defConfig({ port: 8080 });
    assert.deepEqual(result, { port: 8080 });

    assert.throws(() => {
      // @ts-expect-error invalid type
      defConfig({ port: "invalid" });
    });
  });

  it("should get defineConfig helper for registered grouping", () => {
    const pkgDefConfig = defineConfigFor("package");
    assert.equal(typeof pkgDefConfig, "function");
    const configured = pkgDefConfig({ name: "App Test" });
    assert.equal(configured.name, "App Test");

    const denoDefConfig = defineConfigFor("deno");
    assert.equal(typeof denoDefConfig, "function");
    const denoConfigured = denoDefConfig({ name: "Deno Group Test" });
    assert.equal(denoConfigured.name, "Deno Group Test");

    assert.throws(() => {
      defineConfigFor("non_existent_grouping");
    }, /No config schema registered for grouping "non_existent_grouping"/);
  });

  it("should require registered grouping", () => {
    const UnregisteredSchema = Schema.object({ foo: Schema.string() });
    assert.throws(() => {
      requireGroupings(UnregisteredSchema);
    }, /Config schema is not registered with a `grouping`/);

    const RegisteredSchema = Schema.object({ bar: Schema.string() }).register(
      configReg,
      {
        urn: "test:registered",
        key: "bar",
        grouping: "testGroup",
      },
    );

    assert.deepEqual(requireGroupings(RegisteredSchema), ["testGroup"]);
  });

  it("should generate preferences for registered schemas", () => {
    const S1 = Schema.object({ k1: Schema.string() }).register(configReg, {
      urn: "test:s1",
      key: "k1",
      grouping: "pkg",
    });
    const S2 = Schema.object({ k2: Schema.number() }).register(configReg, {
      urn: "test:s2",
      key: "k2",
      grouping: ["db", "pkg"],
    });

    const prefs = configPreferences([S1, S2]);
    assert.deepEqual(prefs, [["pkg"], ["db", "pkg"]]);
  });
});
