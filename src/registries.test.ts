import { expect, test } from "vite-plus/test";
import { z } from "zod";
import { configFieldRegistry, configGroupRegistry } from "./registries.ts";

test("configFieldRegistry registers schema metadata with required urn and groupId", () => {
  const schema = z.object({ foo: z.string() }).register(configFieldRegistry, {
    urn: "urn:test:foo",
    key: "foo",
    groupId: "test-group",
    title: "Foo Field",
    description: "A test foo field",
  });

  const metadata = configFieldRegistry.get(schema);
  expect(metadata).toEqual({
    urn: "urn:test:foo",
    key: "foo",
    groupId: "test-group",
    title: "Foo Field",
    description: "A test foo field",
  });
});

test("configGroupRegistry validates registered fields and succeeds with resolveMap", () => {
  z.object({ bar: z.number() }).register(configFieldRegistry, {
    urn: "urn:test:group:bar",
    key: "bar",
    groupId: "test-group-id",
    title: "Bar Field",
  });

  const groupSchema = z.object({ bar: z.number() }).register(configGroupRegistry, {
    urn: "urn:test:group",
    id: "test-group-id",
    title: "Test Group",
    resolveMap: {
      local: ".testrc",
      user: "~/.testrc",
      system: "/etc/testrc",
    },
  });

  const metadata = configGroupRegistry.get(groupSchema);
  expect(metadata).toEqual({
    urn: "urn:test:group",
    id: "test-group-id",
    title: "Test Group",
    resolveMap: {
      local: ".testrc",
      user: "~/.testrc",
      system: "/etc/testrc",
    },
  });
});

test("configGroupRegistry throws error if a field is not registered in configFieldRegistry for groupId", () => {
  const unvalidatedGroup = z.object({
    unregisteredField: z.string(),
  });

  expect(() => {
    unvalidatedGroup.register(configGroupRegistry, {
      urn: "urn:test:invalid-group",
      id: "invalid-group-id",
    });
  }).toThrow(/unregisteredField/);
});
