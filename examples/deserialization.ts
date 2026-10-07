import { Config, Value } from "../src/main.ts";

interface AppConfig {
  name: string;
  version: number;
  active: boolean;
}

const input: AppConfig = {
  name: "AlloyApp",
  version: 1,
  active: true,
};

// 1. Construct Config from a plain object
const config = Config.tryFrom(input);

console.log("App Name:", config.getString("name"));
console.log("App Version:", config.getInt("version"));
console.log("App Active:", config.getBool("active"));

// 2. Deserialize entire config back into JS object
const deserialized = config.tryDeserialize();
console.log("Deserialized Config:", deserialized);

// 3. Inspect individual Value instances
const val = Value.new("hello world", "custom_origin");
console.log("Value origin:", val.origin());
console.log("Value string:", val.intoString());
