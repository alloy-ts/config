import { createRequire } from "node:module";
import type * as Types from "../dist/index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../dist/index.js");

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;

export const FileFormat = native.FileFormat as unknown as {
  Toml: Types.FileFormat;
  Json: Types.FileFormat;
  Yaml: Types.FileFormat;
  Ini: Types.FileFormat;
  Ron: Types.FileFormat;
  Json5: Types.FileFormat;
  [key: string]: any;
};

export const Config = native.Config as unknown as typeof Types.Config & {
  File: typeof Types.File & {
    Format: typeof FileFormat;
  };
};

export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;

export const File = native.File as unknown as typeof Types.File & {
  Format: typeof FileFormat;
};

export const Environment: typeof Types.Environment = native.Environment;
export const Value: typeof Types.Value = native.Value;

(Config as any).File = File;
(File as any).Format = FileFormat;
