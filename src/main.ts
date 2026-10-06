import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const File = native.File;
export const Environment = native.Environment;
export const FileFormat = native.FileFormat;
export const Value = native.Value;
export const ConfigBuilder = native.ConfigBuilder;

export const Config = Object.assign(native.Config, {
  File: Object.assign(native.File, {
    Format: native.FileFormat,
  }),
  Environment: native.Environment,
  Value: native.Value,
  Builder: native.ConfigBuilder,
});

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
