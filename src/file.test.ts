import assert from "node:assert";
import { describe, it } from "vite-plus/test";
import { ConfigBuilder, File, FileFormat } from "../dist/index.js";

describe("File module tests", () => {
  it("File.new and File.fromStr", () => {
    const file1 = new File("test.json", FileFormat.Json);
    assert.ok(file1);

    const file2 = File.fromStr('{"port": 8080}', FileFormat.Json);
    assert.ok(file2);

    const builder = new ConfigBuilder();
    builder.addSource(file2);
    const config = builder.build();

    assert.strictEqual(config.getInt("port"), 8080);
  });

  it("File.withName and methods", () => {
    const file = File.withName("non_existent_config");
    file.required(false);
    file.format(FileFormat.Json);

    const builder = new ConfigBuilder();
    builder.addSource(file);
    const config = builder.build();
    assert.ok(config);
  });
});
