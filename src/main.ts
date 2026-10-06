import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const Config: typeof Types.Config & { File?: typeof Types.File } = native.Config;
export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File & { Format?: typeof Types.FileFormat } = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const FileFormat: typeof Types.FileFormat = native.FileFormat;
export const Value: typeof Types.Value = native.Value;

if (native.Config) {
  (native.Config as any).File = native.File;
}

if (native.File) {
  (native.File as any).Format = native.FileFormat;
}

// Helper methods on primitive prototypes to support .intoString(), .intoInt(), etc.
if (typeof String.prototype !== "undefined" && !(String.prototype as any).intoString) {
  (String.prototype as any).intoString = function () {
    return String(this);
  };
}
if (typeof Number.prototype !== "undefined" && !(Number.prototype as any).intoInt) {
  (Number.prototype as any).intoInt = function () {
    return Math.floor(Number(this));
  };
  (Number.prototype as any).intoFloat = function () {
    return Number(this);
  };
  (Number.prototype as any).intoUint = function () {
    return Math.floor(Number(this));
  };
}
if (typeof Boolean.prototype !== "undefined" && !(Boolean.prototype as any).intoBool) {
  (Boolean.prototype as any).intoBool = function () {
    return Boolean(this);
  };
}

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
