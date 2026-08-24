import * as Schema from "zod";
import { configReg } from "../registries.ts";

const AppNameConfig = Schema.object({
  appName: Schema.string().nonempty(),
}).register(configReg, {
  key: "appName",
  title: "App Name",
  description: "Huamen-friendly name for the app.",
  grouping: "app",
  moduleUrl: import.meta.url,
  examples: [{ appName: "My App" }],
});

type AppName = Schema.infer<typeof AppNameConfig>;

export { type AppName, AppNameConfig };
