import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  batchSlice,
  filterAndDedupOrgs,
  parseLandscapeYaml,
} from "../src/rollout.ts";

const sampleLandscapeYaml = `
landscape:
  - name: App Definition
    subcategories:
      - name: Database
        items:
          - name: Vitess
            project: graduated
            project_org: https://github.com/vitessio
            repo_url: https://github.com/vitessio/vitess
          - name: TiKV
            project: graduated
            repo_url: https://github.com/tikv/tikv
          - name: OldProj
            project: archived
            repo_url: https://github.com/oldorg/oldproj
`;

describe("Rollout Utility Functions", () => {
  it("should parse landscape YAML correctly", () => {
    const items = parseLandscapeYaml(sampleLandscapeYaml);
    assert.equal(items.length, 3);
    assert.equal(items[0].org, "vitessio");
    assert.equal(items[1].org, "tikv");
  });

  it("should filter archived projects and match requested maturity level", () => {
    const items = parseLandscapeYaml(sampleLandscapeYaml);
    const graduated = filterAndDedupOrgs(items, "graduated");
    assert.equal(graduated.length, 2);
    assert.equal(graduated[0].org, "tikv");
    assert.equal(graduated[1].org, "vitessio");

    const sandbox = filterAndDedupOrgs(items, "sandbox");
    assert.equal(sandbox.length, 0);
  });

  it("should slice org items into batch ranges correctly", () => {
    const items = [
      { org: "org1", name: "p1", maturity: "graduated" },
      { org: "org2", name: "p2", maturity: "graduated" },
      { org: "org3", name: "p3", maturity: "graduated" },
      { org: "org4", name: "p4", maturity: "graduated" },
      { org: "org5", name: "p5", maturity: "graduated" },
    ];

    const { slice, totalBatches } = batchSlice(items, 2, 1);
    assert.equal(totalBatches, 3);
    assert.equal(slice.length, 2);
    assert.equal(slice[0].org, "org1");
    assert.equal(slice[1].org, "org2");

    const b2 = batchSlice(items, 2, 2);
    assert.equal(b2.slice.length, 2);
    assert.equal(b2.slice[0].org, "org3");

    const b3 = batchSlice(items, 2, 3);
    assert.equal(b3.slice.length, 1);
    assert.equal(b3.slice[0].org, "org5");
  });
});
