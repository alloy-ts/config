import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { stdConfigs } from "../src/config/std.ts";

export interface CodegenItem {
  src: string;
  dst: string;
  format?: string;
}

export async function generateConfig(items?: CodegenItem[]): Promise<void> {
  const codegenList: CodegenItem[] = items || stdConfigs.codegen || [];

  for (const item of codegenList) {
    const srcPath = path.resolve(process.cwd(), item.src);
    const dstPath = path.resolve(process.cwd(), item.dst);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${item.src}`);
      continue;
    }

    const fileUrl = pathToFileURL(srcPath).href;
    const imported = await import(`${fileUrl}?t=${Date.now()}`);
    const exportData =
      imported.default !== undefined
        ? imported.default
        : (imported.configs ?? imported.value ?? imported);

    let outputContent = "";
    const format = item.format || "json";

    if (format === "json") {
      outputContent = JSON.stringify(exportData, null, 2) + "\n";
    } else {
      outputContent = String(exportData);
    }

    fs.writeFileSync(dstPath, outputContent, "utf-8");
    console.log(`Generated ${item.dst} from ${item.src}`);
  }
}

// Execute if run directly
if (
  import.meta.url === pathToFileURL(process.argv[1] || "").href ||
  process.argv[1]?.endsWith("config-gen.ts")
) {
  generateConfig().catch((err) => {
    console.error("Config generation failed:", err);
    process.exit(1);
  });
}
