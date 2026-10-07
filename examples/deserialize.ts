import { Config, ConfigBuilder, Value } from "@alloy-ts/config";

// 1. Serialize an object into a Config using Config.tryFrom
const appConfig = Config.tryFrom({
  server: {
    host: "127.0.0.1",
    port: 5000,
  },
  features: {
    analytics: true,
    billing: false,
  },
});

console.log("Host:", appConfig.getString("server.host"));

// 2. Deserialize entire Config into a JavaScript object
const deserialized = appConfig.tryDeserialize();
console.log("Deserialized config object:", deserialized);

// 3. Inspecting individual Value objects
const val = Value.new(42, "config_file.json");
console.log("Origin:", val.origin()); // "config_file.json"
console.log("As int:", val.intoInt()); // 42
console.log("As string:", val.intoString()); // "42"
console.log("As float:", val.intoFloat()); // 42
