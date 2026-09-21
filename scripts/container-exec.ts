import { execFileSync, type ExecFileSyncOptions } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import { whichContainer, whichContainerCompose } from "./container-which.ts";
import { getConfig, loadConfigFiles } from "../src/config.ts";
import { DEFAULT_CONTAINER_AUTO_IMAGE_PULL } from "../src/models/config/std.ts";
import type { UpOptions } from "../src/models/config/container-compose.ts";

export interface ContainerExecOptions extends ExecFileSyncOptions {
  binary?: string;
}

export interface ContainerComposeUpOptions extends ContainerExecOptions {
  upOptions?: UpOptions;
}

/**
 * Helper to run a container command binary with arguments.
 */
export function formatContainerArgs(
  binary: string,
  args: string[] = [],
): { binary: string; args: string[] } {
  let actualBin = binary;
  let actualArgs = args;

  if (binary === "lima") {
    actualBin = "lima";
    actualArgs = ["nerdctl", ...args];
  } else if (binary === "limactl") {
    actualBin = "limactl";
    actualArgs = ["shell", "default", "nerdctl", ...args];
  } else if (binary === "colima") {
    actualBin = "colima";
    actualArgs = ["nerdctl", ...args];
  }

  return { binary: actualBin, args: actualArgs };
}

/**
 * Helper to run a container command binary with arguments.
 */
export function runContainerCmd(
  binary: string,
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const { binary: _override, ...execOptions } = options;
  const opts: ExecFileSyncOptions = {
    encoding: "utf8",
    stdio: "pipe",
    ...execOptions,
  };

  const formatted = formatContainerArgs(binary, args);
  return execFileSync(
    formatted.binary,
    formatted.args,
    opts,
  ) as unknown as string;
}

export function isAutoImagePullEnabled(): boolean {
  const containerCfg = getConfig<{ autoImagePull?: boolean }>("container");
  return containerCfg?.autoImagePull ?? DEFAULT_CONTAINER_AUTO_IMAGE_PULL;
}

export function isComposeImagePullEnabled(): boolean {
  const containerCfg = getConfig<{
    compose?: { imagePull?: string | boolean; autoImagePull?: boolean };
    autoImagePull?: boolean;
  }>("container");
  const composePull = containerCfg?.compose?.imagePull;
  if (typeof composePull === "string") {
    return composePull !== "never";
  }
  if (typeof composePull === "boolean") {
    return composePull;
  }
  if (typeof containerCfg?.compose?.autoImagePull === "boolean") {
    return containerCfg.compose.autoImagePull;
  }
  return isAutoImagePullEnabled();
}

export function extractPositionalImage(args: string[]): string | undefined {
  const flagWithArg = new Set([
    "-p",
    "--publish",
    "-v",
    "--volume",
    "-e",
    "--env",
    "-u",
    "--user",
    "-w",
    "--workdir",
    "-l",
    "--label",
    "--name",
    "--network",
    "--hostname",
    "--ip",
    "--entrypoint",
    "--restart",
    "--log-driver",
    "--env-file",
  ]);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("-")) {
      if (flagWithArg.has(arg)) {
        i++;
      }
      continue;
    }
    return arg;
  }
  return undefined;
}

export function autoPullComposeImagesSync(
  options: ContainerExecOptions = {},
  baseDir: string = process.cwd(),
): string[] {
  const pulled: string[] = [];
  const candidateFiles = [
    "compose.yml",
    "compose.yaml",
    "compose.config.yml",
    "compose.config.yaml",
    "compose.config.json",
    "compose.json",
    "docker-compose.yml",
    "docker-compose.yaml",
  ];

  const images = new Set<string>();

  for (const file of candidateFiles) {
    const filePath = resolve(baseDir, file);
    if (existsSync(filePath)) {
      try {
        const text = readFileSync(filePath, "utf8");
        let parsed: { services?: Record<string, { image?: string }> };
        if (file.endsWith(".json")) {
          parsed = JSON.parse(text);
        } else {
          parsed = parseYaml(text);
        }
        if (parsed?.services && typeof parsed.services === "object") {
          for (const serviceObj of Object.values(parsed.services)) {
            if (serviceObj && typeof serviceObj.image === "string") {
              images.add(serviceObj.image);
            }
          }
        }
      } catch {
        // ignore parse error
      }
    }
  }

  for (const img of images) {
    try {
      containerImage(["pull", img], options);
      pulled.push(img);
    } catch {
      // Continue pulling other images if one fails
    }
  }

  return pulled;
}

export async function autoPullComposeImages(
  options: ContainerExecOptions = {},
): Promise<string[]> {
  const pulled = autoPullComposeImagesSync(options);
  const images = new Set<string>(pulled);

  try {
    const loadedFiles = await loadConfigFiles([[
      "container-compose",
      "compose",
    ]]);
    for (const file of loadedFiles) {
      const services = file.config?.services as
        | Record<string, { image?: string }>
        | undefined;
      if (services && typeof services === "object") {
        for (const serviceObj of Object.values(services)) {
          if (serviceObj && typeof serviceObj.image === "string") {
            const img = serviceObj.image;
            if (!images.has(img)) {
              images.add(img);
              try {
                containerImage(["pull", img], options);
                pulled.push(img);
              } catch {
                // ignore
              }
            }
          }
        }
      }
    }
  } catch {
    // Skip if compose file loading fails
  }

  return pulled;
}

/* -------------------------------------------------------------------------- */
/*                            Container Subcommands                           */
/* -------------------------------------------------------------------------- */

export function containerExec(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["exec", ...args], options);
}

export function containerRun(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  if (isAutoImagePullEnabled()) {
    const img = extractPositionalImage(args);
    if (img) {
      try {
        containerImage(["pull", img], options);
      } catch {
        // ignore pull error
      }
    }
  }
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["run", ...args], options);
}

export function containerImage(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["image", ...args], options);
}

export function containerPs(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["ps", ...args], options);
}

export function containerStart(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["start", ...args], options);
}

export function containerStop(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["stop", ...args], options);
}

export function containerRm(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["rm", ...args], options);
}

export function containerLogs(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["logs", ...args], options);
}

export function containerBuild(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainer();
  return runContainerCmd(bin, ["build", ...args], options);
}

/* -------------------------------------------------------------------------- */
/*                        Container Compose Subcommands                       */
/* -------------------------------------------------------------------------- */

export function formatUpOptionsFlags(upOpts?: UpOptions): string[] {
  if (!upOpts) return [];
  const flags: string[] = [];

  const removeOrphans = upOpts.RemoveOrphans ?? upOpts.removeOrphans;
  if (removeOrphans === true) flags.push("--remove-orphans");

  const detach = upOpts.Detach ?? upOpts.detach;
  if (detach === true) flags.push("-d");

  const abortOnExit = upOpts.AbortOnContainerExit ??
    upOpts.abortOnContainerExit;
  if (abortOnExit === true) flags.push("--abort-on-container-exit");

  const noBuild = upOpts.NoBuild ?? upOpts.noBuild;
  if (noBuild === true) flags.push("--no-build");

  const noColor = upOpts.NoColor ?? upOpts.noColor;
  if (noColor === true) flags.push("--no-color");

  const noLogPrefix = upOpts.NoLogPrefix ?? upOpts.noLogPrefix;
  if (noLogPrefix === true) flags.push("--no-log-prefix");

  const forceBuild = upOpts.ForceBuild ?? upOpts.forceBuild;
  if (forceBuild === true) flags.push("--build");

  const ipfs = upOpts.IPFS ?? upOpts.ipfs;
  if (ipfs === true) flags.push("--ipfs");

  const quietPull = upOpts.QuietPull ?? upOpts.quietPull;
  if (quietPull === true) flags.push("--quiet-pull");

  const forceRecreate = upOpts.ForceRecreate ?? upOpts.forceRecreate;
  if (forceRecreate === true) flags.push("--force-recreate");

  const noRecreate = upOpts.NoRecreate ?? upOpts.noRecreate;
  if (noRecreate === true) flags.push("--no-recreate");

  const pull = upOpts.Pull ?? upOpts.pull;
  if (typeof pull === "string") flags.push("--pull", pull);

  const scale = upOpts.Scale ?? upOpts.scale;
  if (scale && typeof scale === "object") {
    for (const [srv, val] of Object.entries(scale)) {
      flags.push("--scale", `${srv}=${val}`);
    }
  }

  return flags;
}

export function containerComposeUp(
  args: string[] = [],
  options: ContainerComposeUpOptions = {},
): string {
  if (isComposeImagePullEnabled()) {
    autoPullComposeImagesSync(options);
  }
  const bin = options.binary ?? whichContainerCompose();
  const upFlags = formatUpOptionsFlags(options.upOptions);

  // Combine upFlags and args, avoiding duplicates for boolean flags already in args
  const combinedArgs = [...upFlags];
  for (const arg of args) {
    if (!combinedArgs.includes(arg)) {
      combinedArgs.push(arg);
    }
  }

  return runContainerCmd(bin, ["up", ...combinedArgs], options);
}

export function containerComposeDown(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["down", ...args], options);
}

export function containerComposeStop(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["stop", ...args], options);
}

export function containerComposeStart(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["start", ...args], options);
}

export function containerComposeRestart(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["restart", ...args], options);
}

export function containerComposeLogs(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["logs", ...args], options);
}

export function containerComposePs(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["ps", ...args], options);
}

export function containerComposeBuild(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["build", ...args], options);
}

export function containerComposeExec(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["exec", ...args], options);
}

export function containerComposeRun(
  args: string[] = [],
  options: ContainerExecOptions = {},
): string {
  const bin = options.binary ?? whichContainerCompose();
  return runContainerCmd(bin, ["run", ...args], options);
}

/**
 * Creates a container client instance bound to optional default options.
 */
export function containerCreate(defaultOptions: ContainerExecOptions = {}) {
  return {
    exec: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerExec(args, { ...defaultOptions, ...opts }),
    run: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerRun(args, { ...defaultOptions, ...opts }),
    image: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerImage(args, { ...defaultOptions, ...opts }),
    ps: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerPs(args, { ...defaultOptions, ...opts }),
    start: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerStart(args, { ...defaultOptions, ...opts }),
    stop: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerStop(args, { ...defaultOptions, ...opts }),
    rm: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerRm(args, { ...defaultOptions, ...opts }),
    logs: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerLogs(args, { ...defaultOptions, ...opts }),
    build: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerBuild(args, { ...defaultOptions, ...opts }),
    composeUp: (args: string[] = [], opts: ContainerComposeUpOptions = {}) =>
      containerComposeUp(args, { ...defaultOptions, ...opts }),
    composeDown: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeDown(args, { ...defaultOptions, ...opts }),
    composeStop: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeStop(args, { ...defaultOptions, ...opts }),
    composeStart: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeStart(args, { ...defaultOptions, ...opts }),
    composeRestart: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeRestart(args, { ...defaultOptions, ...opts }),
    composeLogs: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeLogs(args, { ...defaultOptions, ...opts }),
    composePs: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposePs(args, { ...defaultOptions, ...opts }),
    composeBuild: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeBuild(args, { ...defaultOptions, ...opts }),
    composeExec: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeExec(args, { ...defaultOptions, ...opts }),
    composeRun: (args: string[] = [], opts: ContainerExecOptions = {}) =>
      containerComposeRun(args, { ...defaultOptions, ...opts }),
  };
}

export const containerFactory = containerCreate;
