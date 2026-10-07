import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import * as Schema from "../packages/schema/src/index.js";

describe("Schema type validations", () => {
  it("Primitives & Coercion", () => {
    assert.strictEqual(Schema.string().parse("hello"), "hello");
    assert.strictEqual(Schema.number().parse(42), 42);
    assert.strictEqual(Schema.boolean().parse(true), true);

    const coercedNum = Schema.coerce.number();
    assert.strictEqual(coercedNum.parse("123"), 123);

    const coercedBool = Schema.coerce.boolean();
    assert.strictEqual(coercedBool.parse("true"), true);
  });

  it("Literals & Enums", () => {
    const literalSchema = Schema.literal("tuna");
    assert.strictEqual(literalSchema.parse("tuna"), "tuna");

    const enumSchema = Schema.enum(["Salmon", "Tuna"]);
    assert.strictEqual(enumSchema.parse("Tuna"), "Tuna");
  });

  it("Objects & Optionals", () => {
    const Person = Schema.object({
      name: Schema.string(),
      age: Schema.number().optional(),
    });

    const parsed1 = Person.parse({ name: "Alice", age: 30 });
    assert.deepStrictEqual(parsed1, { name: "Alice", age: 30 });

    const parsed2 = Person.parse({ name: "Bob" });
    assert.deepStrictEqual(parsed2, { name: "Bob" });
  });

  it("Unions & XOR", () => {
    const unionSchema = Schema.union([Schema.string(), Schema.number()]);
    assert.strictEqual(unionSchema.parse("test"), "test");
    assert.strictEqual(unionSchema.parse(100), 100);

    const xorSchema = Schema.xor([
      Schema.object({ a: Schema.string() }).strict(),
      Schema.object({ b: Schema.number() }).strict(),
    ]);
    assert.deepStrictEqual(xorSchema.parse({ a: "hello" }), { a: "hello" });
  });

  it("Codecs & Transforms", () => {
    const stringToNumber = Schema.codec(
      Schema.string(),
      Schema.number(),
      {
        decode: (str) => Number.parseInt(str),
        encode: (num) => String(num),
      }
    );

    assert.strictEqual(stringToNumber.parse("50"), 50);
    assert.strictEqual(Schema.encode(stringToNumber, 50), "50");
  });
});
