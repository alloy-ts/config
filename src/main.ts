import { createRequire } from "node:module";
import type * as Types from "../index.d.ts";

const require = createRequire(import.meta.url);
const native = require("../index.js");

export const Config = native.Config;
export const ConfigBuilder = native.ConfigBuilder;
export const File = native.File;
export const Environment = native.Environment;
export const FileFormat = native.FileFormat;
export const Value = native.Value;

function defineProp(obj: any, name: string, value: any) {
  if (obj && !(name in obj)) {
    try {
      Object.defineProperty(obj, name, {
        value,
        writable: true,
        configurable: true,
      });
    } catch {
      // Ignore if property cannot be defined
    }
  }
}

if (Config) {
  defineProp(Config.prototype, "getString", Config.prototype.get_string);
  defineProp(Config.prototype, "getInt", Config.prototype.get_int);
  defineProp(Config.prototype, "getFloat", Config.prototype.get_float);
  defineProp(Config.prototype, "getBool", Config.prototype.get_bool);
  defineProp(Config.prototype, "getTable", Config.prototype.get_table);
  defineProp(Config.prototype, "getArray", Config.prototype.get_array);
  defineProp(Config.prototype, "tryDeserialize", Config.prototype.try_deserialize);
  defineProp(Config, "tryFrom", Config.try_from);
}

if (ConfigBuilder) {
  defineProp(ConfigBuilder.prototype, "setDefault", ConfigBuilder.prototype.set_default);
  defineProp(ConfigBuilder.prototype, "setOverride", ConfigBuilder.prototype.set_override);
  defineProp(
    ConfigBuilder.prototype,
    "setOverrideOption",
    ConfigBuilder.prototype.set_override_option,
  );
  defineProp(ConfigBuilder.prototype, "addSource", ConfigBuilder.prototype.add_source);
  defineProp(ConfigBuilder.prototype, "addFile", ConfigBuilder.prototype.add_file);
  defineProp(ConfigBuilder.prototype, "buildCloned", ConfigBuilder.prototype.build_cloned);
}

if (File) {
  defineProp(File, "fromStr", File.from_str);
  defineProp(
    File,
    "new",
    (name: string, format: any) => File.from_str?.("", format) || File.with_name?.(name),
  );
  defineProp(File, "withName", File.with_name);
}

if (Environment) {
  defineProp(Environment, "withPrefix", Environment.with_prefix);
}

if (Value) {
  defineProp(Value, "new", (val: any, origin?: string) => new Value(origin, val));
  defineProp(Value.prototype, "intoBool", Value.prototype.into_bool);
  defineProp(Value.prototype, "intoInt", Value.prototype.into_int);
  defineProp(Value.prototype, "intoInt128", Value.prototype.into_int128);
  defineProp(Value.prototype, "intoUint", Value.prototype.into_uint);
  defineProp(Value.prototype, "intoUint128", Value.prototype.into_uint128);
  defineProp(Value.prototype, "intoFloat", Value.prototype.into_float);
  defineProp(Value.prototype, "intoString", Value.prototype.into_string);
  defineProp(Value.prototype, "intoArray", Value.prototype.into_array);
  defineProp(Value.prototype, "intoTable", Value.prototype.into_table);
  defineProp(Value.prototype, "tryDeserialize", Value.prototype.try_deserialize);
}

export type Config = Types.Config & {
  getString(key: string): string;
  get_string(key: string): string;
  getInt(key: string): number;
  get_int(key: string): number;
  getFloat(key: string): number;
  get_float(key: string): number;
  getBool(key: string): boolean;
  get_bool(key: string): boolean;
  getTable(key: string): Record<string, any>;
  get_table(key: string): Record<string, any>;
  getArray(key: string): Array<any>;
  get_array(key: string): Array<any>;
  get(key: string): unknown;
  tryDeserialize(): unknown;
  try_deserialize(): unknown;
};

export type ConfigBuilder = Types.ConfigBuilder & {
  setDefault(key: string, value: any): ConfigBuilder;
  set_default(key: string, value: any): ConfigBuilder;
  setOverride(key: string, value: any): ConfigBuilder;
  set_override(key: string, value: any): ConfigBuilder;
  setOverrideOption(key: string, value?: any): ConfigBuilder;
  set_override_option(key: string, value?: any): ConfigBuilder;
  addSource(source: any): ConfigBuilder;
  add_source(source: any): ConfigBuilder;
  addFile(file_path: string, format?: any): ConfigBuilder;
  add_file(file_path: string, format?: any): ConfigBuilder;
  build(): Config;
  buildCloned(): Config;
  build_cloned(): Config;
};

export type File = Types.File & {
  required(required: boolean): File;
  format(format: any): File;
};

export type Environment = Types.Environment & {
  separator(separator: string): Environment;
  ignore_empty(ignore: boolean): Environment;
  ignoreEmpty(ignore: boolean): Environment;
  keep_prefix(keep: boolean): Environment;
  keepPrefix(keep: boolean): Environment;
};

export type FileFormat = Types.FileFormat;

export type Value = Types.Value & {
  origin(): string | null;
  intoBool(): boolean;
  into_bool(): boolean;
  intoInt(): number;
  into_int(): number;
  intoInt128(): number;
  into_int128(): number;
  intoUint(): number;
  into_uint(): number;
  intoUint128(): number;
  into_uint128(): number;
  intoFloat(): number;
  into_float(): number;
  intoString(): string;
  into_string(): string;
  intoArray(): Value[];
  into_array(): Value[];
  intoTable(): Record<string, Value>;
  into_table(): Record<string, Value>;
  tryDeserialize(): unknown;
  try_deserialize(): unknown;
};
