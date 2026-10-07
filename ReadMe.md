# @alloy-ts/config

TypeScript/JavaScript bindings for Rust configuration management via NAPI-RS.

## Usage

```typescript
import { Config, FileFormat } from "@alloy-ts/config";

// Build configuration using builder pattern with Config.File
const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

// Retrieve configuration values
const defaultValue = config.getString("default");
const overrideValue = config.getString("override");
```

### File Sources

Configuration files can be loaded using `new Config.File(...)` or `Config.File.fromStr(...)`:

```typescript
import { Config, File, FileFormat } from "@alloy-ts/config";

// Load from file path with format enum or format string
const fileSource = new File("config/settings", FileFormat.Json);

// Load from string content
const strSource = File.fromStr('{"port": 8080}', FileFormat.Json);

// Extension-less discovery
const autoSource = File.withName("config/settings");
autoSource.required(false); // Make missing file optional

const config = Config.builder()
  .addSource(fileSource)
  .addSource(strSource)
  .addSource(autoSource)
  .build();
```

### Examples

Check out the `examples` directory for runnable examples:

- `examples/config-file.ts`: Demonstrates using `Config.File` with builder pattern.
- `examples/load-npm-package-json.ts`: Demonstrates loading `package.json`, nested property access, environment variable overrides, and optional file sources.

Run examples using `@oxc-node/core`:

```bash
node --import @oxc-node/core examples/config-file.ts
node --import @oxc-node/core examples/load-npm-package-json.ts
```

## Development

- Install dependencies:

```bash
npm install
```

- Run unit tests:

```bash
npm test
```

- Build native bindings:

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
