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

// Support setSchema method on ConfigBuilder
ConfigBuilder.prototype.setSchema = function (schema: any) {
  (this as any)._schema = schema;
  if (schema && typeof schema === "object") {
    if (typeof schema.getDefaults === "function") {
      const defaults = schema.getDefaults();
      if (defaults && typeof defaults === "object") {
        for (const [key, value] of Object.entries(defaults)) {
          this.setDefault(key, value);
        }
      }
    }
  }
  return this;
};

// Enhance build to pass _schema onto Config instance
const originalBuild = ConfigBuilder.prototype.build;
ConfigBuilder.prototype.build = function () {
  const config = originalBuild.call(this);
  if ((this as any)._schema) {
    (config as any)._schema = (this as any)._schema;
  }
  return config;
};

const originalBuildCloned = ConfigBuilder.prototype.buildCloned;
ConfigBuilder.prototype.buildCloned = function () {
  const config = originalBuildCloned.call(this);
  if ((this as any)._schema) {
    (config as any)._schema = (this as any)._schema;
  }
  return config;
};

// Enhance tryDeserialize on Config to validate/infer using schema if present
const originalTryDeserialize = NativeConfig.prototype.tryDeserialize;
NativeConfig.prototype.tryDeserialize = function () {
  const data = originalTryDeserialize.call(this);
  if ((this as any)._schema) {
    const schema = (this as any)._schema;
    if (typeof schema.parse === "function") {
      return schema.parse(data);
    }
    if (typeof schema.validate === "function") {
      return schema.validate(data);
    }
  }
  return data;
};

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
