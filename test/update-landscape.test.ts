import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  detectChanges,
  updateLandscape,
  yamlQuoteIfNeeded,
} from "../src/update-landscape.ts";

const sampleLandscapeContent = `landscape:
  - name: App Definition
    subcategories:
      - name: Database
        items:
          - name: Helm
            homepage_url: https://helm.sh
            description: The Kubernetes Package Manager
            repo_url: https://github.com/helm/helm
            extra:
              slack_url: https://cloud-native.slack.com/messages/helm-users
`;

describe("Update Landscape Utility Functions", () => {
  it("should quote YAML strings when necessary", () => {
    assert.equal(yamlQuoteIfNeeded("simple"), "simple");
    assert.equal(yamlQuoteIfNeeded("has: colon"), '"has: colon"');
    assert.equal(yamlQuoteIfNeeded("@handle"), '"@handle"');
  });

  it("should detect changes in project fields against landscape item", () => {
    const itemObj = {
      homepage_url: "https://old-helm.sh",
      description: "Old description",
    };
    const edits = detectChanges(itemObj, {
      website: "https://helm.sh",
      description: "Old description",
    });
    assert.equal(edits.length, 1);
    assert.equal(edits[0].key, "homepage_url");
    assert.equal(edits[0].newValue, "https://helm.sh");
  });

  it("should update landscape YAML content when project fields change", () => {
    const project = {
      name: "Helm",
      website: "https://new-helm.sh",
      description: "New description for Helm",
      repositories: ["https://github.com/helm/helm"],
    };

    const result = updateLandscape(sampleLandscapeContent, project);
    assert.equal(result.status, "updated");
    assert.ok(result.output.includes("https://new-helm.sh"));
    assert.ok(result.output.includes("New description for Helm"));
  });

  it("should return no_changes when landscape item is up to date", () => {
    const project = {
      name: "Helm",
      website: "https://helm.sh",
      description: "The Kubernetes Package Manager",
      repositories: ["https://github.com/helm/helm"],
    };

    const result = updateLandscape(sampleLandscapeContent, project);
    assert.equal(result.status, "no_changes");
  });

  it("should return no_match when no landscape item matches project name or repo", () => {
    const project = {
      name: "NonExistentProject",
      website: "https://nonexistent.io",
      description: "Not in landscape",
      repositories: ["https://github.com/nonexistent/nonexistent"],
    };

    const result = updateLandscape(sampleLandscapeContent, project);
    assert.equal(result.status, "no_match");
  });
});
