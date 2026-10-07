import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../dist/index.js");

function wrapValue(v: any): any {
  if (v === null || v === undefined) return v;
  let res: any;
  if (typeof v === "string") {
    res = new String(v);
  } else if (typeof v === "number") {
    res = new Number(v);
  } else if (typeof v === "boolean") {
    res = new Boolean(v);
  } else if (Array.isArray(v)) {
    return v.map(wrapValue);
  } else if (typeof v === "object") {
    res = {};
    for (const [k, val] of Object.entries(v)) {
      res[k] = wrapValue(val);
    }
    return res;
  } else {
    return v;
  }

  res.intoString = () => String(v);
  res.intoInt = () => Number(v);
  res.intoInt128 = () => Number(v);
  res.intoUint = () => Number(v);
  res.intoUint128 = () => Number(v);
  res.intoFloat = () => Number(v);
  res.intoBool = () => Boolean(v);
  res.toJSON = () => v;
  res[Symbol.for("nodejs.util.inspect.custom")] = () => v;

  return res;
}

const origGetArray = native.Config.prototype.getArray;
if (origGetArray) {
  native.Config.prototype.getArray = function (key: string) {
    const arr = origGetArray.call(this, key);
    return arr.map(wrapValue);
  };
}

const origGetTable = native.Config.prototype.getTable;
if (origGetTable) {
  native.Config.prototype.getTable = function (key: string) {
    const table = origGetTable.call(this, key);
    const wrapped: Record<string, any> = {};
    for (const [k, v] of Object.entries(table)) {
      wrapped[k] = wrapValue(v);
    }
    return wrapped;
  };
}

export const Config: typeof Types.Config & { File?: typeof Types.File } = native.Config;
export const ConfigBuilder: typeof Types.ConfigBuilder = native.ConfigBuilder;
export const File: typeof Types.File & { Format?: typeof Types.FileFormat } = native.File;
export const Environment: typeof Types.Environment = native.Environment;
export const FileFormat: typeof Types.FileFormat = native.FileFormat;
export const Value: typeof Types.Value = native.Value;

(Config as any).File = native.File;
(File as any).Format = native.FileFormat;

export type Config = Types.Config;
export type ConfigBuilder = Types.ConfigBuilder;
export type File = Types.File;
export type Environment = Types.Environment;
export type FileFormat = Types.FileFormat;
export type Value = Types.Value;
