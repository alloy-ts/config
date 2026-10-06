import {
  Config as NativeConfig,
  ConfigBuilder as NativeConfigBuilder,
  File as NativeFile,
  FileFormat as NativeFileFormat,
  Value as NativeValue,
} from "../dist/index.js";

// Extend File class with static methods and static Format property
export class File extends NativeFile {
  static Format = NativeFileFormat;

  static from_str(s: string, format: NativeFileFormat): File {
    return NativeFile.fromStr(s, format) as File;
  }

  static with_name(baseName: string): File {
    return NativeFile.withName(baseName) as File;
  }
}

export class ConfigBuilder extends NativeConfigBuilder {
  override setDefault(key: string, value: unknown): this {
    return this.set_default(key, value);
  }

  set_default(key: string, value: unknown): this {
    return super.setDefault(key, value) as this;
  }

  override setOverride(key: string, value: unknown): this {
    return this.set_override(key, value);
  }

  set_override(key: string, value: unknown): this {
    return super.setOverride(key, value) as this;
  }

  override addSource(file: NativeFile): this {
    return this.add_source(file);
  }

  add_source(file: NativeFile): this {
    return super.addSource(file) as this;
  }
}

// Extend Config class with static File, ConfigBuilder, Value properties
export class Config {
  private inner: NativeConfig;

  constructor(inner: NativeConfig) {
    this.inner = inner;
  }

  static File = File;
  static Builder = ConfigBuilder;
  static Value = NativeValue;

  static builder(): ConfigBuilder {
    return new ConfigBuilder();
  }

  static tryFrom(from: unknown): Config {
    return new Config(NativeConfig.tryFrom(from));
  }

  get(key: string): unknown {
    return this.inner.get(key);
  }

  getString(key: string): string {
    return this.inner.getString(key);
  }

  getInt(key: string): number {
    return this.inner.getInt(key);
  }

  getFloat(key: string): number {
    return this.inner.getFloat(key);
  }

  getBool(key: string): boolean {
    return this.inner.getBool(key);
  }

  getTable(key: string): Record<string, any> {
    return this.inner.getTable(key);
  }

  getArray(key: string): Array<any> {
    return this.inner.getArray(key);
  }

  tryDeserialize(): unknown {
    return this.inner.tryDeserialize();
  }

  get cache(): any {
    return this.inner.cache;
  }
}

export { NativeFileFormat as FileFormat, NativeValue as Value };
