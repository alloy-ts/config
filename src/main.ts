import { createRequire } from "node:module";
import type * as Types from "../dist/index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../dist/index.js");

export const FileFormat = {
  Toml: 0,
  Json: 1,
  Yaml: 2,
  Ini: 3,
  Ron: 4,
  Json5: 5,
} as const;

export type FileFormat = Types.FileFormat | "json" | "toml" | "yaml" | "ini" | "ron" | "json5";

export const File: typeof Types.File & { Format: typeof FileFormat } = Object.assign(native.File, {
  Format: FileFormat,
});

export const Config: typeof Types.Config & {
  File: typeof File;
} = Object.assign(native.Config, {
  File,
});

export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const Environment: typeof Types.Environment = native.Environment;
export const Value: typeof Types.Value = native.Value;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type Value = Types.Value;
