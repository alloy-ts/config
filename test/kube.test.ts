import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  defineConfigFor,
  defineKubeConfig,
  loadConfigFiles,
} from "../src/config.ts";
import { KubeConfig } from "../src/models/config/kube.ts";

describe("KubeConfig schema & defineKubeConfig", () => {
  it("should validate a full kubeconfig specification", () => {
    const kube = KubeConfig.parse({
      apiVersion: "v1",
      kind: "Config",
      preferences: {
        colors: true,
      },
      clusters: [
        {
          name: "kind-cluster",
          cluster: {
            server: "https://127.0.0.1:6443",
            "insecure-skip-tls-verify": true,
            "certificate-authority": "/path/to/ca.crt",
          },
        },
      ],
      users: [
        {
          name: "kind-user",
          user: {
            "client-certificate": "/path/to/client.crt",
            "client-key": "/path/to/client.key",
            token: "secret-token",
            exec: {
              apiVersion: "client.authentication.k8s.io/v1beta1",
              command: "aws",
              args: ["eks", "get-token", "--cluster-name", "my-cluster"],
            },
          },
        },
      ],
      contexts: [
        {
          name: "kind-context",
          context: {
            cluster: "kind-cluster",
            user: "kind-user",
            namespace: "default",
          },
        },
      ],
      "current-context": "kind-context",
    });

    assert.equal(kube.apiVersion, "v1");
    assert.equal(kube.kind, "Config");
    assert.equal(kube.clusters?.[0].name, "kind-cluster");
    assert.equal(kube.clusters?.[0].cluster.server, "https://127.0.0.1:6443");
    assert.equal(kube.users?.[0].name, "kind-user");
    assert.equal(kube.users?.[0].user.exec?.command, "aws");
    assert.equal(kube.contexts?.[0].name, "kind-context");
    assert.equal(kube["current-context"], "kind-context");
  });

  it("should validate kube config via defineKubeConfig helper", () => {
    const kube = defineKubeConfig({
      apiVersion: "v1",
      kind: "Config",
      clusters: [
        {
          name: "kind-kind",
          cluster: {
            server: "https://127.0.0.1:6443",
          },
        },
      ],
      "current-context": "kind-kind",
    });

    assert.equal(kube.apiVersion, "v1");
    assert.equal(kube.clusters?.[0].name, "kind-kind");
    assert.equal(kube["current-context"], "kind-kind");
  });

  it("should support defineConfigFor('kube')", () => {
    const kubeDef = defineConfigFor("kube");
    assert.equal(typeof kubeDef, "function");
    const configured = kubeDef({
      kind: "Config",
      "current-context": "my-context",
    });
    assert.equal(configured.kind, "Config");
    assert.equal(configured["current-context"], "my-context");
  });

  it("should load candidate config file for 'kube' grouping", async () => {
    const filePath = resolve(process.cwd(), "kube.config.json");
    writeFileSync(
      filePath,
      JSON.stringify({
        apiVersion: "v1",
        kind: "Config",
        "current-context": "test-kind-candidate",
      }),
    );

    try {
      const files = await loadConfigFiles([["kube"]]);
      assert.equal(files.length, 1);
      assert.equal(files[0].grouping, "kube");
      assert.equal(files[0].file, "kube.config.json");
      assert.equal(files[0].config["current-context"], "test-kind-candidate");
    } finally {
      unlinkSync(filePath);
    }
  });
});
