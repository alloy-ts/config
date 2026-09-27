import { Config, type Scope } from "./config.ts";

export function parseCliArgs(args: string[]): {
  command: string | undefined;
  scope: Scope | undefined;
  key: string | undefined;
  value: string | undefined;
} {
  let scope: Scope | undefined = undefined;
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg.startsWith("--scope=")) {
      scope = arg.slice(8) as Scope;
    } else if (arg === "--scope" || arg === "-s") {
      i++;
      if (i < args.length) {
        scope = args[i] as Scope;
      }
    } else {
      positional.push(arg);
    }
  }

  const command = positional[0];
  const key = positional[1];
  const value = positional[2];

  return { command, scope, key, value };
}

export function cli(args: string[] = process.argv.slice(2)): any {
  const { command, scope, key, value } = parseCliArgs(args);

  if (command === "get") {
    if (!key) {
      throw new Error("Missing required argument <key> for 'get' command.");
    }
    const result = Config.get(key, scope);
    console.log(typeof result === "object" ? JSON.stringify(result, null, 2) : result);
    return result;
  }

  if (command === "set") {
    if (!key || value === undefined) {
      throw new Error("Missing required arguments <key> and <value> for 'set' command.");
    }
    Config.set(key, value, scope ?? "local");
    const updated = Config.get(key, scope ?? "local");
    console.log(`Set ${key} = ${updated}`);
    return updated;
  }

  throw new Error(
    `Unknown or missing command "${command ?? ""}". Usage: get|set [--scope=local|user|system] <key> [value]`,
  );
}
