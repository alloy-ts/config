import * as Schema from "zod";
import { configReg } from "../registries.ts";

const AppKeyConfig = Schema.object({
  appKey: Schema.string()
    .optional()
    .default(() =>
      Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex")
    ),
}).register(configReg, {
  urn: "model:config.app.appKey",
  key: "appKey",
  title: "App Key",
  description: "Secret key for HMAC verification.",
  grouping: "app",
  moduleUrl: import.meta.url,
  examples: [{
    appKey: "b64a236142c6ac47a606057225fd28046a02bafe168817b65ac625a2d8c58144",
  }],
});

type AppKey = Schema.infer<typeof AppKeyConfig>;

export { type AppKey, AppKeyConfig };
