import { defineKubeConfig } from "@alloy-ts/config";

export default defineKubeConfig({
  apiVersion: "v1",
  kind: "Config",
  preferences: {},
  clusters: [
    {
      name: "kind-kind",
      cluster: {
        server: "https://127.0.0.1:6443",
        "insecure-skip-tls-verify": true,
      },
    },
  ],
  users: [
    {
      name: "kind-kind",
      user: {
        "client-certificate-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCg==",
        "client-key-data": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQo=",
      },
    },
  ],
  contexts: [
    {
      name: "kind-kind",
      context: {
        cluster: "kind-kind",
        user: "kind-kind",
      },
    },
  ],
  "current-context": "kind-kind",
});
