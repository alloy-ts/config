import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import {
  cleanBlankLines,
  generateMaintainersYaml,
  generateOrgYaml,
  generateProjectYaml,
  generateUpdateLandscapeWorkflow,
  generateValidateWorkflow,
  loadDotEnv,
  mergeBootstrapData,
  parseBatchFile,
  parseGitHubUrl,
  slugify,
  writeScaffold,
} from "../src/bootstrap.ts";

describe("Bootstrap Utility Functions", () => {
  it("should parse GitHub URLs and slugs correctly", () => {
    assert.deepEqual(
      parseGitHubUrl("https://github.com/kubernetes/kubernetes"),
      {
        org: "kubernetes",
        repo: "kubernetes",
      },
    );
    assert.deepEqual(parseGitHubUrl("meshery/meshery"), {
      org: "meshery",
      repo: "meshery",
    });
    assert.deepEqual(parseGitHubUrl("spiffe"), {
      org: "spiffe",
      repo: "spiffe",
    });
  });

  it("should slugify project names properly", () => {
    assert.equal(
      slugify("Kubernetes Package Manager"),
      "kubernetes-package-manager",
    );
    assert.equal(slugify("SPIFFE / SPIRE"), "spiffe-spire");
    assert.equal(slugify(" --My-Cool-Project-- "), "my-cool-project");
  });

  it("should parse batch pipe-delimited files", () => {
    const tmpBatch = resolve(process.cwd(), ".tmp_test_batch");
    writeFileSync(
      tmpBatch,
      `# Batch list\nproject-copacetic|Copacetic|copacetic\ngrpc|gRPC|grpc\n`,
    );
    try {
      const items = parseBatchFile(tmpBatch);
      assert.equal(items.length, 2);
      assert.equal(items[0].org, "project-copacetic");
      assert.equal(items[0].name, "Copacetic");
      assert.equal(items[1].name, "gRPC");
    } finally {
      if (existsSync(tmpBatch)) rmSync(tmpBatch, { force: true });
    }
  });

  it("should load dot environment file into process.env", () => {
    const tmpEnv = resolve(process.cwd(), ".tmp_test_env");
    writeFileSync(
      tmpEnv,
      "TEST_BOOTSTRAP_VAR=hello_alloy\n# comment\nOTHER_VAR=123\n",
    );
    try {
      const applied = loadDotEnv(tmpEnv);
      assert.equal(applied["TEST_BOOTSTRAP_VAR"], "hello_alloy");
      assert.equal(process.env["TEST_BOOTSTRAP_VAR"], "hello_alloy");
    } finally {
      if (existsSync(tmpEnv)) rmSync(tmpEnv, { force: true });
    }
  });

  it("should merge bootstrap data into valid Project and Maintainers structures", () => {
    const result = mergeBootstrapData({
      projectName: "Test Project",
      slug: "test-project",
      org: "testorg",
      repo: "testrepo",
      maintainersList: ["jdoe", "alice"],
    });

    assert.equal(result.project.slug, "test-project");
    assert.equal(result.project.name, "Test Project");
    assert.equal(result.maintainers.maintainers[0].teams[0].members[0], "jdoe");
  });

  it("should generate valid YAML strings for project, org, and maintainers", () => {
    const result = mergeBootstrapData({
      projectName: "Helm",
      slug: "helm",
      org: "helm",
      repo: "helm",
      maintainersList: ["mattfarina"],
    });

    const projectYaml = generateProjectYaml(result);
    assert.ok(projectYaml.includes("slug: helm"));

    const orgYaml = generateOrgYaml("spiffe", [
      { id: "spiffe" },
      { id: "spire", path: "spire" },
    ]);
    assert.ok(orgYaml.includes("org: spiffe"));
    assert.ok(orgYaml.includes("id: spire"));

    const maintainersYaml = generateMaintainersYaml(result);
    assert.ok(maintainersYaml.includes("project_id: helm"));
  });

  it("should clean consecutive blank lines and generate workflows", () => {
    const multiBlank = "a\n\n\n\nb";
    assert.equal(cleanBlankLines(multiBlank), "a\n\n\nb");

    const validateWf = generateValidateWorkflow();
    assert.ok(validateWf.includes("validate-project"));

    const landscapeWf = generateUpdateLandscapeWorkflow();
    assert.ok(landscapeWf.includes("Update Landscape"));
  });

  it("should write single-project scaffold correctly", () => {
    const outputDir = resolve(process.cwd(), ".tmp_scaffold_single");
    const result = mergeBootstrapData({
      projectName: "Single Proj",
      slug: "single-proj",
      org: "singleorg",
      repo: "singlerepo",
      maintainersList: ["dev1"],
    });

    try {
      writeScaffold(outputDir, result);
      assert.ok(existsSync(join(outputDir, "project.yaml")));
      assert.ok(existsSync(join(outputDir, "maintainers.yaml")));
      assert.ok(existsSync(join(outputDir, "README.md")));
      assert.ok(existsSync(join(outputDir, "SECURITY.md")));
      assert.ok(existsSync(join(outputDir, "CODEOWNERS")));
      assert.ok(
        existsSync(join(outputDir, ".github", "workflows", "validate.yaml")),
      );

      const parsedProject = parseYaml(
        readFileSync(join(outputDir, "project.yaml"), "utf8"),
      );
      assert.equal(parsedProject.slug, "single-proj");
    } finally {
      if (existsSync(outputDir)) {
        rmSync(outputDir, { recursive: true, force: true });
      }
    }
  });

  it("should write multi-project scaffold correctly", () => {
    const outputDir = resolve(process.cwd(), ".tmp_scaffold_multi");
    const result = mergeBootstrapData({
      projectName: "Spiffe Org",
      slug: "spiffe-org",
      org: "spiffe",
      repo: "spiffe",
      maintainersList: ["lead1"],
    });

    try {
      writeScaffold(outputDir, result, {
        orgProjects: [{ id: "spiffe" }, { id: "spire", path: "spire" }],
      });

      assert.ok(existsSync(join(outputDir, "org.yaml")));
      assert.ok(existsSync(join(outputDir, "spiffe", "project.yaml")));
      assert.ok(existsSync(join(outputDir, "spire", "project.yaml")));
      assert.ok(existsSync(join(outputDir, "spiffe", "maintainers.yaml")));
      assert.ok(existsSync(join(outputDir, "spire", "maintainers.yaml")));

      const parsedOrg = parseYaml(
        readFileSync(join(outputDir, "org.yaml"), "utf8"),
      );
      assert.equal(parsedOrg.org, "spiffe");
      assert.equal(parsedOrg.projects.length, 2);
    } finally {
      if (existsSync(outputDir)) {
        rmSync(outputDir, { recursive: true, force: true });
      }
    }
  });
});
