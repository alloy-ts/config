import { createRequire } from "node:module";
import type * as Types from "../dist/index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../dist/index.js");

function makeChainable(cls: any, methods: string[]) {
  for (const method of methods) {
    const orig = cls.prototype[method];
    if (typeof orig === "function") {
      cls.prototype[method] = function (this: any, ...args: any[]) {
        orig.apply(this, args);
        return this;
      };
    }
  }
}

makeChainable(native.ConfigBuilder, [
  "setDefault",
  "setOverride",
  "setOverrideOption",
  "addSource",
]);
makeChainable(native.Environment, ["prefix", "separator", "ignoreEmpty", "keepPrefix"]);
makeChainable(native.File, ["format", "required"]);

export const FileFormat: {
  readonly Toml: 0;
  readonly Json: 1;
  readonly Yaml: 2;
  readonly Ini: 3;
  readonly Ron: 4;
  readonly Json5: 5;
} = native.FileFormat;

export const Config: typeof Types.Config & {
  File: typeof Types.File & { Format: typeof FileFormat };
} = native.Config;
export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File & { Format: typeof FileFormat } = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const Value: typeof Types.Value = native.Value;

(File as any).Format = FileFormat;
(Config as any).File = File;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type Value = Types.Value;
export type FileFormat = Types.FileFormat;
