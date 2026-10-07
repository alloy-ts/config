import console from "node:console";
import { ConfigBuilder, File, FileFormat } from "../src/main.ts";

// Demonstration of supported FileFormat types using File.fromStr

// 1. JSON
const jsonSource = File.from_str(JSON.stringify({ format: "JSON", port: 8080 }), FileFormat.Json);

// 2. TOML
const tomlSource = File.from_str(
  `
format = "TOML"
port = 8081
`,
  FileFormat.Toml,
);

// 3. YAML
const yamlSource = File.from_str(
  `
format: YAML
port: 8082
`,
  FileFormat.Yaml,
);

// 4. INI
const iniSource = File.from_str(
  `
format = INI
port = 8083
`,
  FileFormat.Ini,
);

// 5. RON
const ronSource = File.from_str(
  `
(
    format: "RON",
    port: 8084,
)
`,
  FileFormat.Ron,
);

// 6. JSON5
const json5Source = File.from_str(
  `
{
  // JSON5 comments supported
  format: 'JSON5',
  port: 8085,
}
`,
  FileFormat.Json5,
);

const formats = [
  { name: "JSON", source: jsonSource },
  { name: "TOML", source: tomlSource },
  { name: "YAML", source: yamlSource },
  { name: "INI", source: iniSource },
  { name: "RON", source: ronSource },
  { name: "JSON5", source: json5Source },
];

for (const { name, source } of formats) {
  const config = new ConfigBuilder().addSource(source).build();
  console.log(`[${name}] format: ${config.getString("format")}, port: ${config.getInt("port")}`);
}
