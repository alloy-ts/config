# @alloy-ts/config

Hierarchical and layered configuration management for TypeScript/JavaScript applications, powered by Rust via NAPI-RS.

## Usage

```typescript
import { Config } from "@alloy-ts/config";

// Build configuration using builder pattern
const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

// Retrieve configuration values
const defaultValue = config.getString("default");
const overrideValue = config.getString("override");
```

### Reading from String or File Sources

```typescript
import { Config, FileFormat } from "@alloy-ts/config";

// Load from a string in JSON format
const fileSource = Config.File.from_str(
  JSON.stringify({ host: "localhost", port: 8080 }),
  Config.File.Format.Json,
);

const config = Config.builder()
  .setDefault("port", 3000)
  .addSource(fileSource)
  .setOverride("env", "production")
  .build();

console.log(config.getString("host")); // "localhost"
console.log(config.getInt("port"));   // 8080
```

### Layering Environment Variables and Files

```typescript
import { Config, Environment, File, FileFormat } from "@alloy-ts/config";

process.env["APP_PORT"] = "9000";

const config = Config.builder()
  .setDefault("port", 3000)
  .addSource(new File("config/settings.json", FileFormat.Json))
  .addSource(Environment.withPrefix("APP").separator("_"))
  .setOverride("env", "production")
  .build();

console.log(config.getInt("port")); // 9000 (overridden by environment variable)
```

## Running Examples

Execute example scripts with `@oxc-node/core`:

```bash
node --import @oxc-node/core/register examples/config-file.ts
node --import @oxc-node/core/register examples/load-npm-package-json.ts
```

## Development

- Configure local hooks:

```bash
npm run prepare
```

- Install dependencies:

```bash
vp install
```

- Run the unit tests:

```bash
vp test
```

- Build the library:

```bash
npm run build
```

- Code formatting:

```bash
npm run fmt
```

- Linting:

```bash
npm run lint
```

- Code check:

```bash
npm run check
```
