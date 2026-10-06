import * as bindings from "../index.js";

export {
  ConfigBuilder,
  Environment,
  File,
  FileSourceFile,
  FileSourceString,
  Value,
  __napiBindingTarget,
} from "../index.js";

export type FileFormat = bindings.FileFormat;
export type ValueKind = bindings.ValueKind;

export const FileFormat = {
  Toml: "Toml",
  Json: "Json",
  Json5: "Json5",
  Ron: "Ron",
  Yaml: "Yaml",
  Ini: "Ini",
} as const;

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

export const Config = bindings.Config as typeof bindings.Config & {
  File: typeof bindings.File & {
    Format: typeof FileFormat;
  };
};

(Config as any).File = bindings.File;
(Config as any).File.Format = FileFormat;
