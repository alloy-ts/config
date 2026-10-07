// Schema Package Implementation
export type infer<T> = T extends BaseSchema<infer Out, any> ? Out : never;
export type input<T> = T extends BaseSchema<any, infer In> ? In : never;
export type output<T> = T extends BaseSchema<infer Out, any> ? Out : never;

export class SchemaError extends Error {
  issues: any[];
  constructor(issues: any[]) {
    super(JSON.stringify(issues, null, 2));
    this.name = "SchemaError";
    this.issues = issues;
  }
}

export abstract class BaseSchema<Output = any, Input = Output> {
  abstract parse(input: unknown): Output;

  safeParse(input: unknown): { success: true; data: Output } | { success: false; error: SchemaError } {
    try {
      const data = this.parse(input);
      return { success: true, data };
    } catch (err: any) {
      if (err instanceof SchemaError) {
        return { success: false, error: err };
      }
      return { success: false, error: new SchemaError([{ code: "custom", message: err.message || String(err) }]) };
    }
  }

  optional(): SchemaOptional<this> {
    return new SchemaOptional(this);
  }

  exactOptional(): SchemaExactOptional<this> {
    return new SchemaExactOptional(this);
  }

  nullable(): SchemaNullable<this> {
    return new SchemaNullable(this);
  }

  nullish(): SchemaNullable<SchemaOptional<this>> {
    return new SchemaNullable(new SchemaOptional(this));
  }

  default(def: Output | (() => Output)): SchemaDefault<this> {
    return new SchemaDefault(this, def);
  }

  prefault(val: Input): SchemaPrefault<this> {
    return new SchemaPrefault(this, val);
  }

  catch(fallback: Output | ((ctx: { error: SchemaError; value: unknown; issues: any[] }) => Output)): SchemaCatch<this> {
    return new SchemaCatch(this, fallback);
  }

  refine(fn: (val: Output) => boolean | Promise<boolean>, opts?: { error?: string | ((iss: any) => string); abort?: boolean; path?: (string | number)[]; when?: (payload: { value: unknown; issues: any[] }) => boolean }): SchemaRefined<this> {
    return new SchemaRefined(this, fn, opts);
  }

  superRefine(fn: (val: Output, ctx: { addIssue: (iss: any) => void }) => void): SchemaSuperRefined<this> {
    return new SchemaSuperRefined(this, fn);
  }

  check(fn: (ctx: { value: Output; issues: any[] }) => void): SchemaCheck<this> {
    return new SchemaCheck(this, fn);
  }

  transform<NewOut>(fn: (val: Output, ctx: { issues: any[] }) => NewOut): SchemaTransform<this, NewOut> {
    return new SchemaTransform(this, fn);
  }

  pipe<Target extends BaseSchema<any, Output>>(target: Target): SchemaPipe<this, Target> {
    return new SchemaPipe(this, target);
  }

  brand<B extends string, Direction extends "in" | "out" | "inout" = "out">(): this {
    return this;
  }

  readonly(): SchemaReadonly<this> {
    return new SchemaReadonly(this);
  }

  apply<R>(fn: (schema: this, ...args: any[]) => R, ...args: any[]): R {
    return fn(this, ...args);
  }
}

// Primitives
export class SchemaString extends BaseSchema<string> {
  checks: ((val: string) => void)[] = [];

  parse(input: unknown): string {
    if (typeof input !== "string") {
      throw new SchemaError([{ code: "invalid_type", expected: "string", received: typeof input }]);
    }
    for (const check of this.checks) {
      check(input);
    }
    return input;
  }

  min(length: number): this {
    this.checks.push((val) => {
      if (Array.from(val).length < length) {
        throw new SchemaError([{ code: "too_small", minimum: length, origin: "string" }]);
      }
    });
    return this;
  }

  max(length: number): this {
    this.checks.push((val) => {
      if (Array.from(val).length > length) {
        throw new SchemaError([{ code: "too_big", maximum: length, origin: "string" }]);
      }
    });
    return this;
  }

  length(length: number): this {
    this.checks.push((val) => {
      if (Array.from(val).length !== length) {
        throw new SchemaError([{ code: "invalid_string", length }]);
      }
    });
    return this;
  }

  nonempty(): this {
    return this.min(1);
  }

  regex(re: RegExp): this {
    this.checks.push((val) => {
      if (!re.test(val)) {
        throw new SchemaError([{ code: "invalid_string", regex: re.toString() }]);
      }
    });
    return this;
  }

  startsWith(str: string): this {
    this.checks.push((val) => {
      if (!val.startsWith(str)) {
        throw new SchemaError([{ code: "invalid_string", startsWith: str }]);
      }
    });
    return this;
  }

  endsWith(str: string): this {
    this.checks.push((val) => {
      if (!val.endsWith(str)) {
        throw new SchemaError([{ code: "invalid_string", endsWith: str }]);
      }
    });
    return this;
  }

  includes(str: string): this {
    this.checks.push((val) => {
      if (!val.includes(str)) {
        throw new SchemaError([{ code: "invalid_string", includes: str }]);
      }
    });
    return this;
  }

  uppercase(): this {
    return this.regex(/^[A-Z]*$/);
  }

  lowercase(): this {
    return this.regex(/^[a-z]*$/);
  }

  trim(): SchemaTransform<this, string> {
    return this.transform((val) => val.trim());
  }

  toLowerCase(): SchemaTransform<this, string> {
    return this.transform((val) => val.toLowerCase());
  }

  toUpperCase(): SchemaTransform<this, string> {
    return this.transform((val) => val.toUpperCase());
  }

  normalize(): SchemaTransform<this, string> {
    return this.transform((val) => val.normalize());
  }
}

export class SchemaNumber extends BaseSchema<number> {
  checks: ((val: number) => void)[] = [];

  parse(input: unknown): number {
    if (typeof input !== "number" || Number.isNaN(input) || !Number.isFinite(input)) {
      throw new SchemaError([{ code: "invalid_type", expected: "number", received: typeof input }]);
    }
    for (const check of this.checks) {
      check(input);
    }
    return input;
  }

  gt(val: number): this {
    this.checks.push((n) => {
      if (n <= val) throw new SchemaError([{ code: "too_small", minimum: val, inclusive: false }]);
    });
    return this;
  }

  gte(val: number): this {
    this.checks.push((n) => {
      if (n < val) throw new SchemaError([{ code: "too_small", minimum: val, inclusive: true }]);
    });
    return this;
  }

  min(val: number): this {
    return this.gte(val);
  }

  lt(val: number): this {
    this.checks.push((n) => {
      if (n >= val) throw new SchemaError([{ code: "too_big", maximum: val, inclusive: false }]);
    });
    return this;
  }

  lte(val: number): this {
    this.checks.push((n) => {
      if (n > val) throw new SchemaError([{ code: "too_big", maximum: val, inclusive: true }]);
    });
    return this;
  }

  max(val: number): this {
    return this.lte(val);
  }

  positive(): this {
    return this.gt(0);
  }

  nonnegative(): this {
    return this.gte(0);
  }

  negative(): this {
    return this.lt(0);
  }

  nonpositive(): this {
    return this.lte(0);
  }

  multipleOf(step: number): this {
    this.checks.push((n) => {
      if (n % step !== 0) throw new SchemaError([{ code: "not_multiple_of", step }]);
    });
    return this;
  }

  step(step: number): this {
    return this.multipleOf(step);
  }
}

export class SchemaBigInt extends BaseSchema<bigint> {
  checks: ((val: bigint) => void)[] = [];

  parse(input: unknown): bigint {
    if (typeof input !== "bigint") {
      throw new SchemaError([{ code: "invalid_type", expected: "bigint", received: typeof input }]);
    }
    for (const check of this.checks) {
      check(input);
    }
    return input;
  }

  gt(val: bigint): this {
    this.checks.push((n) => { if (n <= val) throw new SchemaError([{ code: "too_small" }]); });
    return this;
  }

  gte(val: bigint): this {
    this.checks.push((n) => { if (n < val) throw new SchemaError([{ code: "too_small" }]); });
    return this;
  }

  min(val: bigint): this { return this.gte(val); }

  lt(val: bigint): this {
    this.checks.push((n) => { if (n >= val) throw new SchemaError([{ code: "too_big" }]); });
    return this;
  }

  lte(val: bigint): this {
    this.checks.push((n) => { if (n > val) throw new SchemaError([{ code: "too_big" }]); });
    return this;
  }

  max(val: bigint): this { return this.lte(val); }

  positive(): this { return this.gt(0n); }
  nonnegative(): this { return this.gte(0n); }
  negative(): this { return this.lt(0n); }
  nonpositive(): this { return this.lte(0n); }

  multipleOf(step: bigint): this {
    this.checks.push((n) => { if (n % step !== 0n) throw new SchemaError([{ code: "not_multiple_of" }]); });
    return this;
  }
  step(step: bigint): this { return this.multipleOf(step); }
}

export class SchemaBoolean extends BaseSchema<boolean> {
  parse(input: unknown): boolean {
    if (typeof input !== "boolean") {
      throw new SchemaError([{ code: "invalid_type", expected: "boolean", received: typeof input }]);
    }
    return input;
  }
}

export class SchemaSymbol extends BaseSchema<symbol> {
  parse(input: unknown): symbol {
    if (typeof input !== "symbol") {
      throw new SchemaError([{ code: "invalid_type", expected: "symbol", received: typeof input }]);
    }
    return input;
  }
}

export class SchemaUndefined extends BaseSchema<undefined> {
  parse(input: unknown): undefined {
    if (input !== undefined) {
      throw new SchemaError([{ code: "invalid_type", expected: "undefined", received: typeof input }]);
    }
    return undefined;
  }
}

export class SchemaNull extends BaseSchema<null> {
  parse(input: unknown): null {
    if (input !== null) {
      throw new SchemaError([{ code: "invalid_type", expected: "null", received: typeof input }]);
    }
    return null;
  }
}

export class SchemaAny extends BaseSchema<any> {
  parse(input: unknown): any {
    return input;
  }
}

export class SchemaUnknown extends BaseSchema<unknown> {
  parse(input: unknown): unknown {
    return input;
  }
}

export class SchemaNever extends BaseSchema<never> {
  parse(input: unknown): never {
    throw new SchemaError([{ code: "invalid_type", expected: "never", received: typeof input }]);
  }
}

export class SchemaNaN extends BaseSchema<number> {
  parse(input: unknown): number {
    if (typeof input !== "number" || !Number.isNaN(input)) {
      throw new SchemaError([{ code: "invalid_type", expected: "NaN", received: typeof input }]);
    }
    return input;
  }
}

// Coercion
export const coerce = {
  string<In = unknown>(): BaseSchema<string, In> {
    return new SchemaCustom((val) => String(val)) as any;
  },
  number<In = unknown>(): BaseSchema<number, In> {
    return new SchemaCustom((val) => Number(val)) as any;
  },
  boolean<In = unknown>(): BaseSchema<boolean, In> {
    return new SchemaCustom((val) => Boolean(val)) as any;
  },
  bigint<In = unknown>(): BaseSchema<bigint, In> {
    return new SchemaCustom((val) => BigInt(val as any)) as any;
  },
  date<In = unknown>(): BaseSchema<Date, In> {
    return new SchemaCustom((val) => new Date(val as any)) as any;
  },
};

// Literals
export class SchemaLiteral<T> extends BaseSchema<T> {
  value: T | T[];
  values: Set<T>;

  constructor(val: T | T[]) {
    super();
    this.value = val;
    this.values = new Set(Array.isArray(val) ? val : [val]);
  }

  parse(input: unknown): T {
    if (!this.values.has(input as T)) {
      throw new SchemaError([{ code: "invalid_literal", expected: Array.from(this.values) }]);
    }
    return input as T;
  }
}

// Wrappers
export class SchemaOptional<T extends BaseSchema<any, any>> extends BaseSchema<Output<T> | undefined, Input<T> | undefined> {
  inner: T;
  constructor(inner: T) {
    super();
    this.inner = inner;
  }
  unwrap(): T {
    return this.inner;
  }
  parse(input: unknown): Output<T> | undefined {
    if (input === undefined) return undefined;
    return this.inner.parse(input);
  }
}

export class SchemaExactOptional<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>, Input<T>> {
  inner: T;
  constructor(inner: T) {
    super();
    this.inner = inner;
  }
  unwrap(): T {
    return this.inner;
  }
  parse(input: unknown): Output<T> {
    return this.inner.parse(input);
  }
}

export class SchemaNullable<T extends BaseSchema<any, any>> extends BaseSchema<Output<T> | null, Input<T> | null> {
  inner: T;
  constructor(inner: T) {
    super();
    this.inner = inner;
  }
  unwrap(): T {
    return this.inner;
  }
  parse(input: unknown): Output<T> | null {
    if (input === null) return null;
    return this.inner.parse(input);
  }
}

export class SchemaDefault<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  defaultValue: any;
  constructor(inner: T, def: any) {
    super();
    this.inner = inner;
    this.defaultValue = def;
  }
  parse(input: unknown): Output<T> {
    if (input === undefined) {
      return typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue;
    }
    return this.inner.parse(input);
  }
}

export class SchemaPrefault<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  prefaultValue: any;
  constructor(inner: T, val: any) {
    super();
    this.inner = inner;
    this.prefaultValue = val;
  }
  parse(input: unknown): Output<T> {
    if (input === undefined) {
      return this.inner.parse(this.prefaultValue);
    }
    return this.inner.parse(input);
  }
}

export class SchemaCatch<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  fallback: any;
  constructor(inner: T, fallback: any) {
    super();
    this.inner = inner;
    this.fallback = fallback;
  }
  parse(input: unknown): Output<T> {
    try {
      return this.inner.parse(input);
    } catch (err: any) {
      if (typeof this.fallback === "function") {
        return this.fallback({ error: err, value: input, issues: err.issues || [] });
      }
      return this.fallback;
    }
  }
}

export class SchemaReadonly<T extends BaseSchema<any, any>> extends BaseSchema<Readonly<Output<T>>> {
  inner: T;
  constructor(inner: T) {
    super();
    this.inner = inner;
  }
  parse(input: unknown): Readonly<Output<T>> {
    const res = this.inner.parse(input);
    if (res && typeof res === "object") {
      return Object.freeze(res);
    }
    return res;
  }
}

// Objects
export class SchemaObject<Shape extends Record<string | symbol, BaseSchema<any, any>>> extends BaseSchema<{ [K in keyof Shape]: Output<Shape[K]> }> {
  shape: Shape;
  strictMode = false;
  looseMode = false;
  catchallSchema?: BaseSchema<any, any>;

  constructor(shape: Shape) {
    super();
    this.shape = shape;
  }

  parse(input: unknown): any {
    if (typeof input !== "object" || input === null) {
      throw new SchemaError([{ code: "invalid_type", expected: "object", received: typeof input }]);
    }
    const result: any = {};
    const inputObj = input as any;
    const shapeKeys = Reflect.ownKeys(this.shape);

    for (const key of shapeKeys) {
      const fieldSchema = this.shape[key];
      const val = inputObj[key];
      const parsedVal = fieldSchema.parse(val);
      if (parsedVal !== undefined || (key in inputObj)) {
        result[key] = parsedVal;
      }
    }

    const inputKeys = Reflect.ownKeys(inputObj);
    for (const key of inputKeys) {
      if (!shapeKeys.includes(key)) {
        if (this.strictMode) {
          throw new SchemaError([{ code: "unrecognized_keys", keys: [String(key)] }]);
        } else if (this.catchallSchema) {
          result[key] = this.catchallSchema.parse(inputObj[key]);
        } else if (this.looseMode) {
          result[key] = inputObj[key];
        }
      }
    }
    return result;
  }

  strict(): this {
    this.strictMode = true;
    return this;
  }

  loose(): this {
    this.looseMode = true;
    return this;
  }

  catchall(schema: BaseSchema<any, any>): this {
    this.catchallSchema = schema;
    return this;
  }

  keyof(): SchemaEnum<Extract<keyof Shape, string>[]> {
    return new SchemaEnum(Object.keys(this.shape) as any);
  }

  extend<NewShape extends Record<string, BaseSchema<any, any>>>(newShape: NewShape): SchemaObject<Shape & NewShape> {
    return new SchemaObject({ ...this.shape, ...newShape } as any);
  }

  safeExtend(newShape: Record<string, BaseSchema<any, any>>): SchemaObject<any> {
    return this.extend(newShape);
  }

  pick(mask: Record<string, boolean>): SchemaObject<any> {
    const newShape: any = {};
    for (const k of Object.keys(mask)) {
      if (mask[k] && this.shape[k]) {
        newShape[k] = this.shape[k];
      }
    }
    return new SchemaObject(newShape);
  }

  omit(mask: Record<string, boolean>): SchemaObject<any> {
    const newShape: any = { ...this.shape };
    for (const k of Object.keys(mask)) {
      if (mask[k]) {
        delete newShape[k];
      }
    }
    return new SchemaObject(newShape);
  }

  partial(mask?: Record<string, boolean>): SchemaObject<any> {
    const newShape: any = {};
    for (const k of Object.keys(this.shape)) {
      if (!mask || mask[k]) {
        newShape[k] = this.shape[k].optional();
      } else {
        newShape[k] = this.shape[k];
      }
    }
    return new SchemaObject(newShape);
  }

  exactPartial(mask?: Record<string, boolean>): SchemaObject<any> {
    const newShape: any = {};
    for (const k of Object.keys(this.shape)) {
      if (!mask || mask[k]) {
        newShape[k] = this.shape[k].exactOptional();
      } else {
        newShape[k] = this.shape[k];
      }
    }
    return new SchemaObject(newShape);
  }

  required(mask?: Record<string, boolean>): SchemaObject<any> {
    const newShape: any = {};
    for (const k of Object.keys(this.shape)) {
      let schema = this.shape[k];
      if (!mask || mask[k]) {
        if (schema instanceof SchemaOptional) {
          schema = schema.unwrap();
        }
      }
      newShape[k] = schema;
    }
    return new SchemaObject(newShape);
  }
}

// Arrays & Tuples
export class SchemaArray<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>[]> {
  element: T;
  checks: ((arr: any[]) => void)[] = [];

  constructor(element: T) {
    super();
    this.element = element;
  }

  unwrap(): T {
    return this.element;
  }

  parse(input: unknown): Output<T>[] {
    if (!Array.isArray(input)) {
      throw new SchemaError([{ code: "invalid_type", expected: "array", received: typeof input }]);
    }
    const res = input.map((item) => this.element.parse(item));
    for (const check of this.checks) {
      check(res);
    }
    return res;
  }

  min(length: number): this {
    this.checks.push((arr) => {
      if (arr.length < length) throw new SchemaError([{ code: "too_small", minimum: length }]);
    });
    return this;
  }

  max(length: number): this {
    this.checks.push((arr) => {
      if (arr.length > length) throw new SchemaError([{ code: "too_big", maximum: length }]);
    });
    return this;
  }

  length(length: number): this {
    this.checks.push((arr) => {
      if (arr.length !== length) throw new SchemaError([{ code: "invalid_length", length }]);
    });
    return this;
  }

  nonempty(): this {
    return this.min(1);
  }
}

export class SchemaTuple<T extends BaseSchema<any, any>[]> extends BaseSchema<any> {
  items: T;
  restSchema?: BaseSchema<any, any>;

  constructor(items: T, rest?: BaseSchema<any, any>) {
    super();
    this.items = items;
    this.restSchema = rest;
  }

  parse(input: unknown): any {
    if (!Array.isArray(input)) {
      throw new SchemaError([{ code: "invalid_type", expected: "tuple", received: typeof input }]);
    }
    const res: any[] = [];
    for (let i = 0; i < this.items.length; i++) {
      res.push(this.items[i].parse(input[i]));
    }
    if (this.restSchema) {
      for (let i = this.items.length; i < input.length; i++) {
        res.push(this.restSchema.parse(input[i]));
      }
    }
    return res;
  }
}

// Unions
export class SchemaUnion<T extends BaseSchema<any, any>[]> extends BaseSchema<Output<T[number]>> {
  options: T;

  constructor(options: T) {
    super();
    this.options = options;
  }

  parse(input: unknown): Output<T[number]> {
    for (const option of this.options) {
      const res = option.safeParse(input);
      if (res.success) return res.data;
    }
    throw new SchemaError([{ code: "invalid_union" }]);
  }
}

export class SchemaXor<T extends BaseSchema<any, any>[]> extends BaseSchema<Output<T[number]>> {
  options: T;

  constructor(options: T) {
    super();
    this.options = options;
  }

  parse(input: unknown): Output<T[number]> {
    const matches: any[] = [];
    for (let i = 0; i < this.options.length; i++) {
      const res = this.options[i].safeParse(input);
      if (res.success) matches.push({ index: i, data: res.data });
    }
    if (matches.length !== 1) {
      throw new SchemaError([{ code: "invalid_union", xorMatches: matches.length }]);
    }
    return matches[0].data;
  }
}

export class SchemaDiscriminatedUnion<Discriminator extends string, T extends BaseSchema<any, any>[]> extends BaseSchema<Output<T[number]>> {
  discriminator: Discriminator;
  options: T;

  constructor(discriminator: Discriminator, options: T) {
    super();
    this.discriminator = discriminator;
    this.options = options;
  }

  parse(input: unknown): Output<T[number]> {
    if (typeof input !== "object" || input === null) {
      throw new SchemaError([{ code: "invalid_type", expected: "object", received: typeof input }]);
    }
    const tag = (input as any)[this.discriminator];
    for (const option of this.options) {
      const res = option.safeParse(input);
      if (res.success) return res.data;
    }
    throw new SchemaError([{ code: "invalid_union_discriminator", discriminator: this.discriminator, value: tag }]);
  }
}

export class SchemaIntersection<A extends BaseSchema<any, any>, B extends BaseSchema<any, any>> extends BaseSchema<Output<A> & Output<B>> {
  left: A;
  right: B;

  constructor(left: A, right: B) {
    super();
    this.left = left;
    this.right = right;
  }

  parse(input: unknown): Output<A> & Output<B> {
    const leftRes = this.left.parse(input);
    const rightRes = this.right.parse(input);
    if (typeof leftRes === "object" && typeof rightRes === "object" && leftRes !== null && rightRes !== null) {
      return { ...leftRes, ...rightRes };
    }
    return rightRes as any;
  }
}

// Enums
export class SchemaEnum<T extends (string | number)[] | Record<string, string | number>> extends BaseSchema<any> {
  enum: any = {};
  values: Set<any>;

  constructor(entries: T) {
    super();
    if (Array.isArray(entries)) {
      this.values = new Set(entries);
      for (const e of entries) {
        this.enum[e] = e;
      }
    } else {
      this.values = new Set(Object.values(entries));
      this.enum = entries;
    }
  }

  parse(input: unknown): any {
    if (!this.values.has(input)) {
      throw new SchemaError([{ code: "invalid_enum_value", options: Array.from(this.values) }]);
    }
    return input;
  }

  exclude(keys: any[]): SchemaEnum<any> {
    const remaining = Array.from(this.values).filter((v) => !keys.includes(v));
    return new SchemaEnum(remaining as any);
  }

  extract(keys: any[]): SchemaEnum<any> {
    const extracted = Array.from(this.values).filter((v) => keys.includes(v));
    return new SchemaEnum(extracted as any);
  }
}

// Records, Maps, Sets
export class SchemaRecord<K extends BaseSchema<any, any>, V extends BaseSchema<any, any>> extends BaseSchema<Record<Output<K>, Output<V>>> {
  keySchema: K;
  valueSchema: V;

  constructor(keySchema: K, valueSchema: V) {
    super();
    this.keySchema = keySchema;
    this.valueSchema = valueSchema;
  }

  parse(input: unknown): Record<Output<K>, Output<V>> {
    if (typeof input !== "object" || input === null) {
      throw new SchemaError([{ code: "invalid_type", expected: "record", received: typeof input }]);
    }
    const result: any = {};
    for (const [k, v] of Object.entries(input)) {
      const parsedKey = this.keySchema.parse(k);
      result[parsedKey] = this.valueSchema.parse(v);
    }
    return result;
  }
}

export class SchemaMap<K extends BaseSchema<any, any>, V extends BaseSchema<any, any>> extends BaseSchema<Map<Output<K>, Output<V>>> {
  keySchema: K;
  valueSchema: V;

  constructor(keySchema: K, valueSchema: V) {
    super();
    this.keySchema = keySchema;
    this.valueSchema = valueSchema;
  }

  parse(input: unknown): Map<Output<K>, Output<V>> {
    if (!(input instanceof Map)) {
      throw new SchemaError([{ code: "invalid_type", expected: "Map", received: typeof input }]);
    }
    const res = new Map();
    for (const [k, v] of input.entries()) {
      res.set(this.keySchema.parse(k), this.valueSchema.parse(v));
    }
    return res;
  }
}

export class SchemaSet<T extends BaseSchema<any, any>> extends BaseSchema<Set<Output<T>>> {
  elementSchema: T;

  constructor(elementSchema: T) {
    super();
    this.elementSchema = elementSchema;
  }

  parse(input: unknown): Set<Output<T>> {
    if (!(input instanceof Set)) {
      throw new SchemaError([{ code: "invalid_type", expected: "Set", received: typeof input }]);
    }
    const res = new Set<Output<T>>();
    for (const item of input) {
      res.add(this.elementSchema.parse(item));
    }
    return res;
  }
}

// Special Schemas
export class SchemaCustom<T> extends BaseSchema<T> {
  fn: (val: unknown) => any;

  constructor(fn: (val: unknown) => any) {
    super();
    this.fn = fn;
  }

  parse(input: unknown): T {
    const res = this.fn(input);
    if (res === false) {
      throw new SchemaError([{ code: "custom", message: "Custom validation failed" }]);
    }
    return res;
  }
}

export class SchemaRefined<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  refineFn: (val: any) => boolean | Promise<boolean>;
  opts: any;

  constructor(inner: T, fn: (val: any) => boolean | Promise<boolean>, opts?: any) {
    super();
    this.inner = inner;
    this.refineFn = fn;
    this.opts = opts;
  }

  parse(input: unknown): Output<T> {
    const val = this.inner.parse(input);
    const valid = this.refineFn(val);
    if (valid === false) {
      const msg = typeof this.opts?.error === "function" ? this.opts.error({ input: val }) : this.opts?.error || "Invalid refinement";
      throw new SchemaError([{ code: "custom", message: msg, path: this.opts?.path }]);
    }
    return val;
  }
}

export class SchemaSuperRefined<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  superRefineFn: (val: any, ctx: { addIssue: (iss: any) => void }) => void;

  constructor(inner: T, fn: (val: any, ctx: { addIssue: (iss: any) => void }) => void) {
    super();
    this.inner = inner;
    this.superRefineFn = fn;
  }

  parse(input: unknown): Output<T> {
    const val = this.inner.parse(input);
    const issues: any[] = [];
    this.superRefineFn(val, {
      addIssue: (iss) => issues.push(iss),
    });
    if (issues.length > 0) {
      throw new SchemaError(issues);
    }
    return val;
  }
}

export class SchemaCheck<T extends BaseSchema<any, any>> extends BaseSchema<Output<T>> {
  inner: T;
  checkFn: (ctx: { value: Output<T>; issues: any[] }) => void;

  constructor(inner: T, fn: (ctx: { value: Output<T>; issues: any[] }) => void) {
    super();
    this.inner = inner;
    this.checkFn = fn;
  }

  parse(input: unknown): Output<T> {
    const val = this.inner.parse(input);
    const issues: any[] = [];
    this.checkFn({ value: val, issues });
    if (issues.length > 0) {
      throw new SchemaError(issues);
    }
    return val;
  }
}

export class SchemaTransform<T extends BaseSchema<any, any>, NewOut> extends BaseSchema<NewOut, Input<T>> {
  inner: T;
  transformFn: (val: Output<T>, ctx: { issues: any[] }) => NewOut;

  constructor(inner: T, fn: (val: Output<T>, ctx: { issues: any[] }) => NewOut) {
    super();
    this.inner = inner;
    this.transformFn = fn;
  }

  parse(input: unknown): NewOut {
    const val = this.inner.parse(input);
    const issues: any[] = [];
    const res = this.transformFn(val, { issues });
    if (issues.length > 0) {
      throw new SchemaError(issues);
    }
    return res;
  }
}

export class SchemaPipe<A extends BaseSchema<any, any>, B extends BaseSchema<any, any>> extends BaseSchema<Output<B>, Input<A>> {
  left: A;
  right: B;

  constructor(left: A, right: B) {
    super();
    this.left = left;
    this.right = right;
  }

  parse(input: unknown): Output<B> {
    const intermediate = this.left.parse(input);
    return this.right.parse(intermediate);
  }
}

export class SchemaCodec<InSchema extends BaseSchema<any, any>, OutSchema extends BaseSchema<any, any>> extends BaseSchema<Output<OutSchema>, Input<InSchema>> {
  inSchema: InSchema;
  outSchema: OutSchema;
  decodeFn: (input: Output<InSchema>) => Output<OutSchema>;
  encodeFn: (output: Output<OutSchema>) => Output<InSchema>;

  constructor(
    inSchema: InSchema,
    outSchema: OutSchema,
    opts: { decode: (input: Output<InSchema>) => Output<OutSchema>; encode: (output: Output<OutSchema>) => Output<InSchema> }
  ) {
    super();
    this.inSchema = inSchema;
    this.outSchema = outSchema;
    this.decodeFn = opts.decode;
    this.encodeFn = opts.encode;
  }

  parse(input: unknown): Output<OutSchema> {
    const parsedIn = this.inSchema.parse(input);
    return this.decodeFn(parsedIn);
  }
}

// Helpers & Creator Functions
export function string(): SchemaString { return new SchemaString(); }
export function number(): SchemaNumber { return new SchemaNumber(); }
export function bigint(): SchemaBigInt { return new SchemaBigInt(); }
export function boolean(): SchemaBoolean { return new SchemaBoolean(); }
export function symbol(): SchemaSymbol { return new SchemaSymbol(); }
function _undefined(): SchemaUndefined { return new SchemaUndefined(); }
function _null(): SchemaNull { return new SchemaNull(); }
function _void(): SchemaUndefined { return new SchemaUndefined(); }

export { _undefined as undefined, _null as null, _void as void };

export function any(): SchemaAny { return new SchemaAny(); }
export function unknown(): SchemaUnknown { return new SchemaUnknown(); }
export function never(): SchemaNever { return new SchemaNever(); }
export function nan(): SchemaNaN { return new SchemaNaN(); }
export function int(): SchemaNumber { return number().step(1); }
export function int32(): SchemaNumber { return int().min(-2147483648).max(2147483647); }
export function date(): SchemaCustom<Date> {
  return new SchemaCustom((val) => {
    if (val instanceof Date && !Number.isNaN(val.getTime())) return val;
    throw new SchemaError([{ code: "invalid_type", expected: "Date", received: typeof val }]);
  });
}

export function literal<T>(val: T | T[]): SchemaLiteral<T> { return new SchemaLiteral(val); }
function _enum<T extends (string | number)[] | Record<string, string | number>>(entries: T): SchemaEnum<T> { return new SchemaEnum(entries); }
export { _enum as enum };

export function object<Shape extends Record<string | symbol, BaseSchema<any, any>>>(shape: Shape): SchemaObject<Shape> { return new SchemaObject(shape); }
export function strictObject<Shape extends Record<string | symbol, BaseSchema<any, any>>>(shape: Shape): SchemaObject<Shape> { return new SchemaObject(shape).strict(); }
export function looseObject<Shape extends Record<string | symbol, BaseSchema<any, any>>>(shape: Shape): SchemaObject<Shape> { return new SchemaObject(shape).loose(); }

export function array<T extends BaseSchema<any, any>>(element: T): SchemaArray<T> { return new SchemaArray(element); }
export function tuple<T extends BaseSchema<any, any>[]>(items: T, rest?: BaseSchema<any, any>): SchemaTuple<T> { return new SchemaTuple(items, rest); }

export function union<T extends BaseSchema<any, any>[]>(options: T): SchemaUnion<T> { return new SchemaUnion(options); }
export function xor<T extends BaseSchema<any, any>[]>(options: T): SchemaXor<T> { return new SchemaXor(options); }
export function discriminatedUnion<Discriminator extends string, T extends BaseSchema<any, any>[]>(discriminator: Discriminator, options: T): SchemaDiscriminatedUnion<Discriminator, T> { return new SchemaDiscriminatedUnion(discriminator, options); }
export function intersection<A extends BaseSchema<any, any>, B extends BaseSchema<any, any>>(a: A, b: B): SchemaIntersection<A, B> { return new SchemaIntersection(a, b); }

export function record<K extends BaseSchema<any, any>, V extends BaseSchema<any, any>>(keySchema: K, valueSchema: V): SchemaRecord<K, V> { return new SchemaRecord(keySchema, valueSchema); }
export function map<K extends BaseSchema<any, any>, V extends BaseSchema<any, any>>(keySchema: K, valueSchema: V): SchemaMap<K, V> { return new SchemaMap(keySchema, valueSchema); }
export function set<T extends BaseSchema<any, any>>(elementSchema: T): SchemaSet<T> { return new SchemaSet(elementSchema); }

export function custom<T>(fn?: (val: unknown) => any): SchemaCustom<T> { return new SchemaCustom<T>(fn || (() => true)); }
export function transform<T>(fn: (val: any, ctx: { issues: any[] }) => any): SchemaCustom<any> { return new SchemaCustom((val) => fn(val, { issues: [] })); }
export function pipe<A extends BaseSchema<any, any>, B extends BaseSchema<any, any>>(left: A, right: B): SchemaPipe<A, B> { return new SchemaPipe(left, right); }

export function codec<InSchema extends BaseSchema<any, any>, OutSchema extends BaseSchema<any, any>>(
  inSchema: InSchema,
  outSchema: OutSchema,
  opts: { decode: (input: Output<InSchema>) => Output<OutSchema>; encode: (output: Output<OutSchema>) => Output<InSchema> }
): SchemaCodec<InSchema, OutSchema> {
  return new SchemaCodec(inSchema, outSchema, opts);
}

export function decode<Codec extends SchemaCodec<any, any>>(codec: Codec, input: Input<Codec>): Output<Codec> {
  return codec.parse(input);
}

export function encode<Codec extends SchemaCodec<any, any>>(codec: Codec, output: Output<Codec>): Input<Codec> {
  return codec.encodeFn(output);
}

export function parse(schema: BaseSchema<any, any>, input: unknown): any {
  return schema.parse(input);
}

export function safeParse(schema: BaseSchema<any, any>, input: unknown) {
  return schema.safeParse(input);
}

// String format helpers
export function email(): SchemaString { return string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/); }
export function uuid(): SchemaString { return string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/); }
export function url(): SchemaString { return string().regex(/^https?:\/\/.+/); }
export function httpUrl(): SchemaString { return string().regex(/^https?:\/\/.+/); }
export function e164(): SchemaString { return string().regex(/^\+[1-9]\d{6,14}$/); }
export function ipv4(): SchemaString { return string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/); }
export function ipv6(): SchemaString { return string().regex(/^[0-9a-fA-F:]+$/); }

export function stringbool(): BaseSchema<boolean> {
  return new SchemaCustom((val) => {
    const str = String(val).toLowerCase();
    if (["true", "1", "yes", "on", "y", "enabled"].includes(str)) return true;
    if (["false", "0", "no", "off", "n", "disabled"].includes(str)) return false;
    throw new SchemaError([{ code: "invalid_value", input: val }]);
  });
}

export function toSchema<T>() {
  return <S extends BaseSchema<T, any>>(schema: S): S => schema;
}

export const NEVER = Symbol("NEVER");

export type Output<T> = T extends BaseSchema<infer O, any> ? O : never;
export type Input<T> = T extends BaseSchema<any, infer I> ? I : never;
