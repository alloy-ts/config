import { expect, test } from "vite-plus/test";
import { configFieldRegistry, configGroupRegistry } from "./registries.ts";
import * as Schema from "./schema.ts";

test("Schema.config registers single field schema into configFieldRegistry", () => {
  const nameField = Schema.config(Schema.string().min(1), {
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

test("Schema.configGroup registers group schema into configGroupRegistry", () => {
  const ageField = Schema.config(Schema.number(), {
    urn: "urn:test:field:age",
    key: "age",
    groupId: "user-config",
    title: "Age Field",
  });

  const userGroup = Schema.configGroup(
    Schema.object({
      age: ageField.optional(),
    }).readonly(),
    {
      urn: "urn:test:group:user",
      id: "user-config",
      title: "User Config",
    },
  );

  const meta = configGroupRegistry.get(userGroup);
  expect(meta).toEqual({
    urn: "urn:test:group:user",
    id: "user-config",
    title: "User Config",
  });
});
