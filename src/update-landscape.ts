import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { execFileSync, execSync } from "node:child_process";
import { tmpdir } from "node:os";
import {
  Document,
  Pair,
  parse as parseYaml,
  parseDocument,
  YAMLMap,
  YAMLSeq,
} from "yaml";
import type { Project } from "./models/config/project.ts";

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */

export interface FieldEdit {
  key: string;
  newValue: string;
  isExtra: boolean;
  exists: boolean;
}

export type UpdateStatus = "no_match" | "no_changes" | "updated";

export interface UpdateLandscapeResult {
  output: string;
  status: UpdateStatus;
}

export interface ProcessProjectOptions {
  createPr?: boolean;
  dryRun?: boolean;
  landscapeRepo?: string;
}

/* -------------------------------------------------------------------------- */
/*                           YAML Helper Functions                            */
/* -------------------------------------------------------------------------- */

export function yamlQuoteIfNeeded(value: string): string {
  if (!value) return "''";
  let needsQuoting = false;
  if (value.includes(": ") || value.includes(" #")) {
    needsQuoting = true;
  }
  const specialStarts = "&*!|>'\"%@`{}[],?";
  if (specialStarts.includes(value[0])) {
    needsQuoting = true;
  }
  if (!needsQuoting) return value;
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}"`;
}

export function getItemLineRange(
  lines: string[],
  startLine: number,
): { start: number; end: number } {
  const start = startLine;
  let dashPos = lines[start]?.indexOf("- ");
  if (dashPos === undefined || dashPos < 0) dashPos = 0;

  for (let i = start + 1; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (!trimmed || trimmed === "\r") continue;
    const indent = lines[i].length - trimmed.length;
    if (indent <= dashPos) {
      return { start, end: i };
    }
  }
  return { start, end: lines.length };
}

export function detectFieldIndent(
  lines: string[],
  start: number,
  end: number,
): number {
  for (let i = start + 1; i < end && i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (!trimmed) continue;
    return lines[i].length - trimmed.length;
  }
  const trimmed = lines[start]?.trimStart() || "";
  return (lines[start]?.length || 0) - trimmed.length + 2;
}

export function findFieldLine(
  lines: string[],
  start: number,
  end: number,
  key: string,
  indent: number,
): number {
  const prefix = " ".repeat(indent) + key + ":";
  for (let i = start; i < end && i < lines.length; i++) {
    if (lines[i].startsWith(prefix)) {
      const rest = lines[i].slice(prefix.length);
      if (!rest || rest[0] === " " || rest[0] === "\r" || rest[0] === "\n") {
        return i;
      }
    }
  }
  return -1;
}

export function findExtraBlockEnd(
  lines: string[],
  extraKeyLine: number,
  itemEnd: number,
  extraIndent: number,
): number {
  let last = extraKeyLine;
  for (let i = extraKeyLine + 1; i < itemEnd && i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (!trimmed) continue;
    const lineIndent = lines[i].length - trimmed.length;
    if (lineIndent >= extraIndent) {
      last = i;
    } else {
      break;
    }
  }
  return last + 1;
}

export function findLastFieldLine(
  lines: string[],
  start: number,
  end: number,
  fieldIndent: number,
): number {
  let last = start;
  for (let i = start; i < end && i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (!trimmed) continue;
    const lineIndent = lines[i].length - trimmed.length;
    if (lineIndent >= fieldIndent) {
      last = i;
    }
  }
  return last;
}

export function replaceFieldInLines(
  lines: string[],
  start: number,
  end: number,
  key: string,
  newValue: string,
  indent: number,
): { lines: string[]; end: number } {
  const lineIdx = findFieldLine(lines, start, end, key, indent);
  if (lineIdx < 0) return { lines, end };

  const prefix = " ".repeat(indent) + key + ":";
  const valuePart = lines[lineIdx].slice(prefix.length).trim();
  const isBlockScalar = [">", ">-", "|", "|-"].includes(valuePart);

  lines[lineIdx] = " ".repeat(indent) + key + ": " +
    yamlQuoteIfNeeded(newValue);

  if (isBlockScalar) {
    const contStart = lineIdx + 1;
    let contEnd = contStart;
    while (contEnd < end && contEnd < lines.length) {
      const trimmed = lines[contEnd].trimStart();
      if (!trimmed) break;
      const lineIndent = lines[contEnd].length - trimmed.length;
      if (lineIndent > indent) {
        contEnd++;
      } else {
        break;
      }
    }
    if (contEnd > contStart) {
      lines.splice(contStart, contEnd - contStart);
      end -= contEnd - contStart;
    }
  }

  return { lines, end };
}

export function insertFieldInLines(
  lines: string[],
  start: number,
  end: number,
  key: string,
  newValue: string,
  indent: number,
  isExtra: boolean,
  fieldIndent: number,
): { lines: string[]; end: number } {
  const newLine = " ".repeat(indent) + key + ": " + yamlQuoteIfNeeded(newValue);
  let insertAt = start;

  if (isExtra) {
    const extraLine = findFieldLine(lines, start, end, "extra", fieldIndent);
    if (extraLine >= 0) {
      insertAt = findExtraBlockEnd(lines, extraLine, end, fieldIndent + 2);
    } else {
      const extraKeyLine = " ".repeat(fieldIndent) + "extra:";
      const insertPos = findLastFieldLine(lines, start, end, fieldIndent) + 1;
      lines.splice(insertPos, 0, extraKeyLine);
      end++;
      insertAt = insertPos + 1;
    }
  } else {
    const extraLine = findFieldLine(lines, start, end, "extra", fieldIndent);
    if (extraLine >= 0) {
      insertAt = extraLine;
    } else {
      insertAt = findLastFieldLine(lines, start, end, fieldIndent) + 1;
    }
  }

  lines.splice(insertAt, 0, newLine);
  end++;

  return { lines, end };
}

export function applyItemEdits(
  lines: string[],
  edits: FieldEdit[],
  startLine: number,
): string[] {
  const result = [...lines];
  let { start, end } = getItemLineRange(result, startLine);
  const fieldIndent = detectFieldIndent(result, start, end);
  const extraIndent = fieldIndent + 2;

  // Replace existing
  for (const edit of edits) {
    if (!edit.exists) continue;
    const indent = edit.isExtra ? extraIndent : fieldIndent;
    const res = replaceFieldInLines(
      result,
      start,
      end,
      edit.key,
      edit.newValue,
      indent,
    );
    end = res.end;
  }

  // Insert missing
  for (const edit of edits) {
    if (edit.exists) continue;
    const indent = edit.isExtra ? extraIndent : fieldIndent;
    const res = insertFieldInLines(
      result,
      start,
      end,
      edit.key,
      edit.newValue,
      indent,
      edit.isExtra,
      fieldIndent,
    );
    end = res.end;
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/*                                Core Logic                                  */
/* -------------------------------------------------------------------------- */

export function detectChanges(
  itemObj: Record<string, unknown>,
  project: Partial<Project>,
): FieldEdit[] {
  const edits: FieldEdit[] = [];

  const checkField = (
    key: string,
    newValue: string | undefined,
    isExtra: boolean,
    sourceObj: Record<string, unknown>,
  ) => {
    if (!newValue) return;
    const existing = sourceObj[key];
    if (existing !== undefined) {
      if (String(existing) !== newValue) {
        edits.push({ key, newValue, isExtra, exists: true });
      }
    } else {
      edits.push({ key, newValue, isExtra, exists: false });
    }
  };

  checkField("homepage_url", project.website, false, itemObj);
  checkField("description", project.description, false, itemObj);

  if (project.social && project.social.twitter) {
    checkField("twitter", project.social.twitter, false, itemObj);
  }

  const extraMappings: Record<string, string> = {
    slack: "slack_url",
    linkedin: "linkedin_url",
    youtube: "youtube_url",
  };

  const extraObj = (itemObj.extra as Record<string, unknown>) || {};
  if (project.social) {
    for (const [socialKey, landscapeKey] of Object.entries(extraMappings)) {
      const val = project.social[socialKey];
      if (val) {
        checkField(landscapeKey, val, true, extraObj);
      }
    }
  }

  return edits;
}

export function updateLandscape(
  landscapeContent: string,
  project: Partial<Project>,
): UpdateLandscapeResult {
  const doc = parseDocument(landscapeContent);
  const rawLines = landscapeContent.split("\n");

  const landscapeSeq = doc.get("landscape") as YAMLSeq;
  if (!landscapeSeq || !landscapeSeq.items) {
    return { output: landscapeContent, status: "no_match" };
  }

  let matchedAny = false;

  for (const catNode of landscapeSeq.items) {
    if (!(catNode instanceof YAMLMap)) continue;
    const subcatSeq = catNode.get("subcategories") as YAMLSeq;
    if (!subcatSeq || !subcatSeq.items) continue;

    for (const subcatNode of subcatSeq.items) {
      if (!(subcatNode instanceof YAMLMap)) continue;
      const itemsSeq = subcatNode.get("items") as YAMLSeq;
      if (!itemsSeq || !itemsSeq.items) continue;

      for (const itemNode of itemsSeq.items) {
        if (!(itemNode instanceof YAMLMap)) continue;
        const nameVal = itemNode.get("name") as string;
        const repoUrlVal = itemNode.get("repo_url") as string;

        if (!nameVal || !repoUrlVal) continue;

        const nameMatch =
          nameVal.toLowerCase() === (project.name || "").toLowerCase();
        let repoMatch = false;

        if (project.repositories) {
          for (const repoEntry of project.repositories) {
            const url = typeof repoEntry === "string"
              ? repoEntry
              : repoEntry.url;
            if (url.toLowerCase() === repoUrlVal.toLowerCase()) {
              repoMatch = true;
              break;
            }
          }
        }

        if (nameMatch && repoMatch) {
          matchedAny = true;
          const itemObj = itemNode.toJSON() as Record<string, unknown>;
          const edits = detectChanges(itemObj, project);

          if (edits.length === 0) {
            return { output: landscapeContent, status: "no_changes" };
          }

          const startLine = itemNode.range ? itemNode.range[0] : 0;
          // Convert line range from character offset
          let lineNum = 0;
          let offsetCount = 0;
          for (let i = 0; i < rawLines.length; i++) {
            offsetCount += rawLines[i].length + 1;
            if (offsetCount >= startLine) {
              lineNum = i;
              break;
            }
          }

          const newLines = applyItemEdits(rawLines, edits, lineNum);
          return { output: newLines.join("\n"), status: "updated" };
        }
      }
    }
  }

  return {
    output: landscapeContent,
    status: matchedAny ? "no_changes" : "no_match",
  };
}

/* -------------------------------------------------------------------------- */
/*                               Process & PR                                 */
/* -------------------------------------------------------------------------- */

export function createPullRequest(
  landscapePath: string,
  landscapeRepo: string,
  projectName: string,
): void {
  const absPath = resolve(landscapePath);
  const dir = dirname(absPath);
  const fileName = basename(absPath);

  const safeName = projectName.toLowerCase().replace(/ /g, "-");
  const branchName = `update-${safeName}-${Date.now()}`;

  const runGit = (args: string[]) => {
    execFileSync("git", args, { cwd: dir, stdio: "inherit" });
  };

  runGit(["checkout", "-b", branchName]);
  runGit(["add", fileName]);
  runGit(["commit", "-s", "-m", `Update ${projectName} metadata`]);
  runGit(["push", "origin", branchName]);

  const prBody = `Automated update for ${projectName} from cncf/automation`;
  execFileSync(
    "gh",
    [
      "pr",
      "create",
      "--title",
      `Update ${projectName} metadata`,
      "--body",
      prBody,
      "--head",
      branchName,
      "--repo",
      landscapeRepo,
    ],
    { cwd: dir, stdio: "inherit" },
  );
}

export function processProject(
  projectPath: string,
  landscapePath: string,
  options: ProcessProjectOptions = {},
): UpdateStatus {
  if (!existsSync(projectPath)) {
    throw new Error(`Project file not found: ${projectPath}`);
  }
  if (!existsSync(landscapePath)) {
    throw new Error(`Landscape file not found: ${landscapePath}`);
  }

  const projectYaml = readFileSync(projectPath, "utf8");
  const project = parseYaml(projectYaml) as Project;

  const landscapeContent = readFileSync(landscapePath, "utf8");
  const { output, status } = updateLandscape(landscapeContent, project);

  if (status === "no_match") {
    console.warn(
      `::warning::No landscape entry matched project "${project.name}".`,
    );
    return status;
  }
  if (status === "no_changes") {
    console.log(`Landscape entry for ${project.name} is already up to date.`);
    return status;
  }

  if (options.dryRun) {
    console.log("--- Dry Run Output ---");
    console.log(`Title: Update ${project.name} metadata`);
    console.log(`Target Repo: ${options.landscapeRepo || "cncf/landscape"}`);
    return status;
  }

  writeFileSync(landscapePath, output, "utf8");
  console.log(
    `Successfully updated ${landscapePath} for project ${project.name}`,
  );

  if (options.createPr) {
    createPullRequest(
      landscapePath,
      options.landscapeRepo || "cncf/landscape",
      project.name,
    );
  }

  return status;
}
