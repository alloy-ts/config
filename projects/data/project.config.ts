import { defineProjectConfig } from "../src/config";

export default defineProjectConfig({
  schemaVersion: "0.1.0",
  slug: "data",
  name: "Data",
  description: "A TypeScript library for defining and loading data.",
  type: "project",
  maturityLog: [
    {
      phase: "sandbox",
      date: "2024-01-01",
      issue: "https://github.com/cncf/toc/issues/1000",
    },
  ],
  repositories: [
    {
      url: "https://github.com/alloy-ts/data",
      primary: true,
    },
  ],
  website: "https://github.com/alloy-ts/data",
});
