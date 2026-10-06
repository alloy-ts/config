# @alloy-ts/config (`alloy_config`)

Hierarchical or layered configuration management library for Rust and TypeScript applications.

## Usage Example

```typescript
import { ConfigBuilder, File, FileFormat } from "@alloy-ts/config";

const file = File.fromStr('{"env": "development"}', FileFormat.Json);

const config = new ConfigBuilder()
  .setDefault("default", "1")
  .addSource(file)
  .setOverride("override", "1")
  .build();

console.log(config.getString("default")); // "1"
console.log(config.getString("env"));     // "development"
console.log(config.getString("override"));// "1"
```

## Running Examples

```bash
vp exec node examples/config-builder.ts
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

- Run the locally:

```bash
npm run dev
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
