import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const FileFormat = {
  Ini: "ini",
  Json: "json",
  Json5: "json5",
  Ron: "ron",
  Toml: "toml",
  Yaml: "yaml",
} as const;
export type FileFormat = (typeof FileFormat)[keyof typeof FileFormat];

export const File = native.File as typeof Types.File & {
  Format: typeof FileFormat;
  new: (name: string, format?: any) => Types.File;
};
(File as any).Format = FileFormat;

if (!("new" in File)) {
  Object.defineProperty(File, "new", {
    value: (name: string, format?: any) => new native.File(name, format),
    writable: true,
    configurable: true,
  });
}

export const Config = native.Config as typeof Types.Config & {
  File: typeof File;
};
(Config as any).File = File;

export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const Environment: typeof Types.Environment = native.Environment;
export const Value = native.Value as typeof Types.Value & {
  new (value: any, origin?: string): Types.Value;
};

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type Value = Types.Value;
