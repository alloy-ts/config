# @alloy-ts/config

TypeScript/JavaScript bindings for Rust configuration management (`config` crate) via NAPI-RS.

## Features

- Layered and hierarchical configuration management
- Multiple configuration sources (`Config.File`, `Environment`, defaults, overrides)
- Support for JSON, TOML, YAML, INI, RON, and JSON5 formats
- Strong TypeScript type definitions generated automatically

## Usage

```typescript
import { Config } from "@alloy-ts/config";

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

## Running Examples

Execute the config-file example:

```bash
npx vp exec node examples/config-file.ts
```

## Development

- Configure local hooks:

```bash
npm run prepare
```

- Install dependencies:

```bash
npm install
```

- Run the unit tests:

```bash
vp test
```

- Build the native bindings:

```bash
npx napi build --platform --esm --output-dir ./dist
```
