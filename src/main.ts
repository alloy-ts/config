import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const Config: typeof Types.Config = native.Config;
export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const FileFormat = native.FileFormat as {
  readonly Ini: Types.FileFormat.Ini;
  readonly Json: Types.FileFormat.Json;
  readonly Json5: Types.FileFormat.Json5;
  readonly Ron: Types.FileFormat.Ron;
  readonly Toml: Types.FileFormat.Toml;
  readonly Yaml: Types.FileFormat.Yaml;
};
export const Value: typeof Types.Value = native.Value;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
