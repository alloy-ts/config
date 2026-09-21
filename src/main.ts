import console from "node:console";
import { configs } from "./models/config/index.ts";

export const main = () => {
  return configs["appName"];
};

console.log("Hello,", main() + "!");
console.log("Your app key is:", configs["appKey"]);
console.log("Database:", configs["databaseUrl"]);

export * from "./config.ts";
export * from "./models/registries.ts";
export { configs } from "./models/config/index.ts";
