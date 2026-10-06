import { describe, expect, it } from "vitest";
import { Config, Value } from "./main.ts";

describe("Config NAPI bindings", () => {
  it("builds Config using builder pattern with defaults and overrides", () => {
    const config = Config.builder()
      .setDefault("default_key", "default_val")
      .setOverride("override_key", 42)
      .build();

    expect(config.getString("default_key")).toBe("default_val");
    expect(config.getInt("override_key")).toBe(42);
  });

  it("retrieves typed values using Config get methods", () => {
    const config = Config.builder()
      .setDefault("str", "hello")
      .setDefault("int", 100)
      .setDefault("float", 3.14)
      .setDefault("bool", true)
      .setDefault("table", { nested: "val" })
      .setDefault("array", [1, 2, 3])
      .build();

    expect(config.getString("str")).toBe("hello");
    expect(config.getInt("int")).toBe(100);
    expect(config.getFloat("float")).toBeCloseTo(3.14);
    expect(config.getBool("bool")).toBe(true);
    expect(config.getTable("table")).toEqual({ nested: "val" });
    expect(config.getArray("array")).toEqual([1, 2, 3]);
    expect(config.get("str")).toBe("hello");
  });

  it("deserializes entire Config", () => {
    const config = Config.builder()
      .setDefault("a", "alpha")
      .setDefault("b", 123)
      .build();

    const deserialized = config.tryDeserialize() as { a: string; b: number };
    expect(deserialized.a).toBe("alpha");
    expect(deserialized.b).toBe(123);
  });

  it("creates Config from object via try_from", () => {
    const config = Config.try_from({ foo: "bar", num: 99 });
    expect(config.getString("foo")).toBe("bar");
    expect(config.getInt("num")).toBe(99);
  });

  it("works with Value class", () => {
    const value = Value.new("test_val", "origin_test");
    expect(value).toBeDefined();
    expect(value.origin()).toBe("origin_test");
  });
});
