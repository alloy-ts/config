import { expect, test } from "vite-plus/test";
import { Config, FileFormat } from "./main.ts";

test("Config.builder with chainable methods and Config.File", () => {
  const jsonContent = JSON.stringify({
    server: {
      port: 8080,
    },
  });

  const file = Config.File.fromStr(jsonContent, Config.File.Format.Json);

  const config = Config.builder()
    .setDefault("default", "1")
    .addSource(file)
    .setOverride("override", "1")
    .build();

  expect(config.getString("default")).toBe("1");
  expect(config.getInt("server.port")).toBe(8080);
  expect(config.getString("override")).toBe("1");
});

test("Config.File constructor and File.Format", () => {
  const file = new Config.File("config/settings", FileFormat.Json);
  expect(file).toBeDefined();
});
