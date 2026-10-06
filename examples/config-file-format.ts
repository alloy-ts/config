import { ConfigBuilder, File, FileFormat } from "../dist/main.mjs";

// Demonstration of supported FileFormat types using File.fromStr

// 1. JSON
const jsonSource = File.fromStr(
  JSON.stringify({ format: "JSON", port: 8080 }),
  FileFormat.Json
);

// 2. TOML
const tomlSource = File.fromStr(
  `
format = "TOML"
port = 8081
`,
  FileFormat.Toml
);

// 3. YAML
const yamlSource = File.fromStr(
  `
format: YAML
port: 8082
`,
  FileFormat.Yaml
);

// 4. INI
const iniSource = File.fromStr(
  `
format = INI
port = 8083
`,
  FileFormat.Ini
);

// 5. RON
const ronSource = File.fromStr(
  `
(
    format: "RON",
    port: 8084,
)
`,
  FileFormat.Ron
);

// 6. JSON5
const json5Source = File.fromStr(
  `
{
  // JSON5 comments supported
  format: 'JSON5',
  port: 8085,
}
`,
  FileFormat.Json5
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
