import * as Schema from "zod";
import { AppKeyConfig } from "./app-key.ts";
import { AppNameConfig } from "./app-name.ts";
import { DatabaseUrlConfig } from "./database-url.ts";
import appConfig from "../../../app.config.json" with { type: "json" };

const Configs = Schema.object({
  ...AppNameConfig.shape,
  ...AppKeyConfig.shape,
  ...DatabaseUrlConfig.shape,
}).readonly();

const configs = Configs.parse(appConfig);

export { Configs, configs };
