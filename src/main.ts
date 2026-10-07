import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const FileFormat: typeof Types.FileFormat = native.FileFormat;
export const Value: typeof Types.Value = native.Value;

// Attach File and FileFormat to Config class to support Config.File and Config.File.Format / FileFormat
const NativeConfig = native.Config;
NativeConfig.File = File;
(NativeConfig.File as any).Format = FileFormat;

// Polymorphic addSource dispatching to addFileSource, addEnvSource, addConfigSource
const originalAddSource = ConfigBuilder.prototype.addSource;
ConfigBuilder.prototype.addSource = function (source: any) {
  if (!source) return this;
  const name = source.constructor?.name;
  if (name === "File" || source instanceof File) {
    return this.addFileSource(source);
  }
  if (name === "Environment" || source instanceof Environment) {
    return this.addEnvSource(source);
  }
  if (name === "Config" || source instanceof NativeConfig) {
    return this.addConfigSource(source);
  }
  return originalAddSource.call(this, source);
};

// Create prototype aliases for camelCase and snake_case compatibility across all classes
for (const cls of [NativeConfig, File, Value, Environment, ConfigBuilder]) {
  if (!cls || !cls.prototype) continue;
  for (const key of Object.getOwnPropertyNames(cls.prototype)) {
    // convert camelCase to snake_case
    const snake = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    if (snake !== key && !(snake in cls.prototype)) {
      cls.prototype[snake] = cls.prototype[key];
    }
    // convert snake_case to camelCase
    const camel = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    if (camel !== key && !(camel in cls.prototype)) {
      cls.prototype[camel] = cls.prototype[key];
    }
  }
}

export const Config: typeof Types.Config & {
  File: typeof Types.File & { Format: typeof Types.FileFormat };
} = NativeConfig;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
