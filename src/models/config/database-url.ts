import * as Schema from "zod";
import { configReg } from "../registries.ts";

const DatabaseUrlConfig = Schema.object({
  databaseUrl: Schema.url().nonempty(),
}).register(configReg, {
  urn: "model:config.app.databaseUrl",
  key: "databaseUrl",
  title: "Database URL",
  description: "Local/remote database URL connection string.",
  grouping: "app",
  moduleUrl: import.meta.url,
  examples: [{ databaseUrl: "file:./data/sqlite.db" }],
});

type DatabaseUrl = Schema.infer<typeof DatabaseUrlConfig>;

export { type DatabaseUrl, DatabaseUrlConfig };
