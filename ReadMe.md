# @alloy-ts/config

TypeScript/JavaScript bindings for Rust configuration management via NAPI-RS.

## Usage

```typescript
import { Config, File } from "@alloy-ts/config";

// Build configuration using builder pattern
const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.new("config/settings", "json"))
  .setOverride("override", "1")
  .build();

// Retrieve configuration values
const defaultValue = config.getString("default");
const overrideValue = config.getString("override");
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
