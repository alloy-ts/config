import { createRequire } from "node:module";
import type * as Types from "./types.d.ts";

const require = createRequire(import.meta.url);
const native = require("../dist/index.js");

export const Config: typeof Types.Config = native.Config;
export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const FileFormat: typeof Types.FileFormat = native.FileFormat;
export const Value: typeof Types.Value = native.Value;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
