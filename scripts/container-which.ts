import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { getConfig } from "../src/config.ts";
import {
  DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS,
  DEFAULT_CONTAINER_EXEC_PATHS,
} from "../src/models/config/std.ts";

/**
 * Resolve an executable name or path to an absolute path if found in PATH or filesystem.
 */
export function findExecutablePath(cmd: string): string | undefined {
  if (existsSync(cmd)) {
    try {
      const stat = statSync(cmd);
      if (stat.isFile()) return resolve(cmd);
    } catch {
      // ignore
    }
  }

  if (process.platform === "win32") {
    try {
      const output = execSync(`where ${cmd}`, {
        stdio: ["pipe", "pipe", "ignore"],
        encoding: "utf8",
      });
      const firstLine = output.split(/\r?\n/)[0]?.trim();
      if (firstLine && existsSync(firstLine)) return firstLine;
    } catch {
      return undefined;
    }
  }

  const pathEnv = process.env.PATH ?? "";
  const pathDirs = pathEnv.split(":");
  for (const dir of pathDirs) {
    if (!dir) continue;
    const fullPath = resolve(dir, cmd);
    if (existsSync(fullPath)) {
      try {
        const stat = statSync(fullPath);
        if (stat.isFile()) {
          return fullPath;
        }
      } catch {
        // ignore error
      }
    }
  }
  return undefined;
}

/**
 * Check if a command/executable exists in PATH or system.
 */
export function isExecutableInPath(cmd: string): boolean {
  return findExecutablePath(cmd) !== undefined;
}

/**
 * Identifies which container executable to use based on config `container.execPaths`,
 * returning the absolute path of the first existing binary found, or the first item name as fallback.
 */
export function whichContainer(customList?: string[]): string {
  let list = customList;
  if (!list || list.length === 0) {
    const containerCfg = getConfig<
      { execPaths?: string[]; execWhich?: string[] }
    >("container");
    list = containerCfg?.execPaths ?? containerCfg?.execWhich ??
      DEFAULT_CONTAINER_EXEC_PATHS;
  }

  for (const item of list) {
    const resolvedPath = findExecutablePath(item);
    if (resolvedPath) {
      return resolvedPath;
    }
  }

  return list[0] ?? "docker";
}

/**
 * Identifies which container compose executable to use based on config `container.compose.execPaths`,
 * returning the absolute path of the first existing binary found, or the first item name as fallback.
 */
export function whichContainerCompose(customList?: string[]): string {
  let list = customList;
  if (!list || list.length === 0) {
    const containerCfg = getConfig<{
      compose?: { execPaths?: string[] };
      composeWhich?: string[];
    }>("container");
    list = containerCfg?.compose?.execPaths ?? containerCfg?.composeWhich ??
      DEFAULT_CONTAINER_COMPOSE_EXEC_PATHS;
  }

  for (const item of list) {
    const resolvedPath = findExecutablePath(item);
    if (resolvedPath) {
      return resolvedPath;
    }
  }

  return list[0] ?? "docker-compose";
}
