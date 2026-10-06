# @alloy-ts/config

Hierarchical configuration management for TypeScript and Rust applications, powered by NAPI-RS bindings around the Rust `config` crate.

## Usage Example

```typescript
import { Config, File } from "@alloy-ts/config";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(File.fromStr('{"settings": {"theme": "dark"}}', "json"))
  .setOverride("override", "1")
  .build();

console.log(config.getString("default")); // "1"
console.log(config.getTable("settings")); // { theme: "dark" }
```

## Development

- Install dependencies:

```bash
npm install
```

- Build NAPI bindings and TypeScript exports:

```bash
npm run build:napi
```

- Run unit tests:

```bash
npm test
```

- Run examples:

```bash
npx @oxc-node/cli examples/config-builder.ts
npx @oxc-node/cli examples/config-file.ts
```
