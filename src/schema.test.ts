import { expect, test } from "vite-plus/test";
import { configFieldRegistry, configGroupRegistry } from "./registries.ts";
import * as Schema from "./schema.ts";

test("Schema.config registers single field schema into configFieldRegistry using .meta()", () => {
  const nameField = Schema.config(Schema.string().min(1)).meta({
    urn: "urn:test:field:name",
    key: "name",
    groupId: "test-group-id",
    title: "Name Field",
  });

  expect(nameField.parse("my-name")).toBe("my-name");

  const meta = configFieldRegistry.get(nameField);
  expect(meta).toEqual({
    urn: "urn:test:field:name",
    key: "name",
    groupId: "test-group-id",
    title: "Name Field",
  });
});

test("Schema.config supports chaining method calls before .meta()", () => {
  const urnField = Schema.config(Schema.string()).startsWith("urn:").meta({
    urn: "urn:test:field:urnField",
    key: "urnField",
    groupId: "test-group-id",
    title: "URN Field",
  });

  expect(urnField.parse("urn:valid")).toBe("urn:valid");
  expect(() => urnField.parse("invalid")).toThrow();

  const meta = configFieldRegistry.get(urnField);
  expect(meta?.urn).toBe("urn:test:field:urnField");
});

test("Schema.config supports integer/number positive().meta()", () => {
  const positiveInt = Schema.config(Schema.number().int()).positive().meta({
    urn: "urn:test:field:positiveInt",
    key: "positiveInt",
    groupId: "test-group-id",
    title: "Positive Int Field",
  });

  expect(positiveInt.parse(5)).toBe(5);
  expect(() => positiveInt.parse(-5)).toThrow();
  expect(configFieldRegistry.get(positiveInt)?.key).toBe("positiveInt");
});

test("Schema.configGroup registers group schema into configGroupRegistry without passing field schemas", () => {
  Schema.config(Schema.number()).meta({
    urn: "urn:test:field:age",
    key: "age",
    groupId: "user-config",
    title: "Age Field",
  });

  const userGroup = Schema.configGroup().meta({
    urn: "urn:test:group:user",
    id: "user-config",
    title: "User Config",
  });

  const meta = configGroupRegistry.get(userGroup);
  expect(meta).toEqual({
    urn: "urn:test:group:user",
    id: "user-config",
    title: "User Config",
  });

  // Verify group schema auto-built from fields parses valid input
  const parsed = userGroup.parse({ age: 25 });
  expect(parsed.age).toBe(25);
});
