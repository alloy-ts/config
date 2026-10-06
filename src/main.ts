import * as native from "../dist/index.js";

export const FileFormat = {
  Toml: "Toml",
  Json: "Json",
  Yaml: "Yaml",
  Ini: "Ini",
  Ron: "Ron",
  Json5: "Json5",
} as const;

export type FileFormat = (typeof FileFormat)[keyof typeof FileFormat];

export const ValueKind = {
  Nil: "Nil",
  Boolean: "Boolean",
  I64: "I64",
  I128: "I128",
  U64: "U64",
  U128: "U128",
  Float: "Float",
  String: "String",
  Table: "Table",
  Array: "Array",
} as const;

export type ValueKind = (typeof ValueKind)[keyof typeof ValueKind];

export const File = native.File as typeof native.File & {
  Format: typeof FileFormat;
};

(File as any).Format = FileFormat;

export const Config = native.Config as typeof native.Config & {
  File: typeof File;
};

(Config as any).File = File;

export const ConfigBuilder = native.ConfigBuilder;
export const Environment = native.Environment;
export const Value = native.Value;
