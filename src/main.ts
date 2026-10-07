import * as nativeModule from "../dist/index.js";

const native = (nativeModule as any).default || nativeModule;

export const AsyncState = native.AsyncState;
export const Config = native.Config;
export const ConfigBuilder = native.ConfigBuilder;
export const DefaultState = native.DefaultState;
export const Environment = native.Environment;
export const File = native.File;
export const FileFormat = native.FileFormat;
export const Value = native.Value;

if (Config) {
  (Config as any).File = File;
  if (File) {
    (Config as any).File.Format = FileFormat;
  }
}

if (File) {
  (File as any).Format = FileFormat;

  if (!(File as any).new) {
    (File as any).new = (name: string, format: any) => new File(name, format);
  }
  if (!(File as any).from_str) {
    (File as any).from_str = File.fromStr;
  }
  if (!(File as any).with_name) {
    (File as any).with_name = File.withName;
  }
}

export default Config;
