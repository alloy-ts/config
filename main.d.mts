//#region index.d.ts
export declare class Config {
  constructor();
  static builder(): ConfigBuilder;
  static tryFrom(from: any): Config;
  get cache(): Value;
  get(key: string): any;
  getString(key: string): string;
  getInt(key: string): number;
  getFloat(key: string): number;
  getBool(key: string): boolean;
  getTable(key: string): Record<string, Value>;
  getArray(key: string): Array<Value>;
  tryDeserialize(): any;
}
export declare class ConfigBuilder {
  constructor();
  setDefault(key: string, value: any): this;
  setOverride(key: string, value: any): this;
  setOverrideOption(key: string, value?: any | undefined | null): this;
  addSource(source: File | Environment | any): this;
  addAsyncSource(source: File | Environment | any): this;
  build(): Config;
  buildCloned(): Config;
}
export declare class Environment {
  constructor();
  static withPrefix(prefix: string): Environment;
  prefix(prefix: string): this;
  separator(separator: string): this;
  ignoreEmpty(ignore: boolean): this;
  keepPrefix(keep: boolean): this;
}
export declare class File {
  constructor(name?: string | undefined | null, format?: FileFormat | undefined | null);
  static withName(name: string): File;
  static fromStr(content: string, format: FileFormat): File;
  format(format: FileFormat): this;
  required(required: boolean): this;
}
export declare class Value {
  constructor(value?: Value | undefined | null, origin?: string | undefined | null);
  get kind(): ValueKind;
  origin(): string | null;
  tryDeserialize(): any;
  intoBool(): boolean;
  intoInt(): number;
  intoInt128(): number;
  intoUint(): number;
  intoUint128(): number;
  intoFloat(): number;
  intoString(): string;
  intoArray(): Array<Value>;
  intoTable(): Record<string, Value>;
}
declare const enum FileFormat {
  Toml = 0,
  Json = 1,
  Yaml = 2,
  Ini = 3,
  Ron = 4,
  Json5 = 5
}
declare const enum ValueKind {
  Nil = 0,
  Boolean = 1,
  I64 = 2,
  I128 = 3,
  U64 = 4,
  U128 = 5,
  Float = 6,
  String = 7,
  Table = 8,
  Array = 9
}
//#endregion
export type { FileFormat, ValueKind };