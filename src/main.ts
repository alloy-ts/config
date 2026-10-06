import console from "node:console";
import * as nativeBinding from "../dist/index.js";

export const Config = nativeBinding.Config as typeof nativeBinding.Config & {
  File: typeof nativeBinding.File & {
    Format: typeof nativeBinding.FileFormat;
  };
};

export const ConfigBuilder = nativeBinding.ConfigBuilder;
export const Environment = nativeBinding.Environment;

export const File = nativeBinding.File as typeof nativeBinding.File & {
  Format: typeof nativeBinding.FileFormat;
};

export const FileFormat = nativeBinding.FileFormat;
export const Value = nativeBinding.Value;

// Attach File and Format namespace properties on Config and File
(Config as unknown as Record<string, unknown>).File = File;
(File as unknown as Record<string, unknown>).Format = FileFormat;

export const main = () => {
  return "Hello, world!";
};

console.log(main());
