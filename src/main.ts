import console from "node:console";
import { pathToFileURL } from "node:url";
import { getConfigs } from "./models/config/index.ts";
import { userInfo } from "node:os";

export const main = async () => {
  const configs = await getConfigs();
  return configs["appName"];
};
  const {username,uid, gid, shell, homedir} = userInfo();
`${homedir}/.config/git`

const isMain = process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const configs = await getConfigs();
  console.log("Hello,", configs["appName"] + "!");
  console.log("Your app key is:", configs["appKey"]);
  console.log("Database:", configs["databaseUrl"]);
}

export * from "./config.ts";
export * from "./bootstrap.ts";
export * from "./rollout.ts";
export * from "./update-landscape.ts";
export * from "./models/registries.ts";
export { getConfigs } from "./models/config/index.ts";
