import { expect, test } from "vite-plus/test";
import { Config } from "./main.ts";

test("Config builder chaining and source reading", () => {
  const jsonContent = JSON.stringify({
    app: {
      name: "alloy-app",
      port: 8080,
    },
  });

  const fileSource = Config.File.from_str(jsonContent, Config.File.Format.Json);

  const config = Config.builder()
    .setDefault("default", "1")
    .addSource(fileSource)
    .setOverride("override", "1")
    .build();

  expect(config.getString("default")).toBe("1");
  expect(config.getString("override")).toBe("1");
  expect(config.getString("app.name")).toBe("alloy-app");
  expect(config.getInt("app.port")).toBe(8080);
});
