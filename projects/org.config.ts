import { defineOrgConfig } from "../src/config";

export default defineOrgConfig({
  schemaVersion: "0.1.0",
  org: "alloy-ts",
  projects: [
    {
      id: "config",
      path: "./config",
    },
    {
      id: "schema",
      path: "./schema",
    },
    {
      id: "data",
      path: "./data",
    },
  ],
});
