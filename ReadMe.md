# Config

High-performance NAPI-RS JavaScript/TypeScript bindings for Rust's `config` library that organizes hierarchical or layered configurations for Rust and TypeScript applications.

## Installation

```bash
npm install @alloy-ts/config
```

## Quick Start

```typescript
import { ConfigBuilder, File, FileFormat } from "@alloy-ts/config";

const config = new ConfigBuilder()
  .setDefault("server.port", 8080)
  .addSource(new File("config/settings", FileFormat.Json))
  .setOverride("server.host", "127.0.0.1")
  .build();

console.log(config.getString("server.host")); // "127.0.0.1"
console.log(config.getInt("server.port")); // 8080
```

## Usage Examples

### Loading Configuration Files

```typescript
import { Config, File, FileFormat } from "@alloy-ts/config";

// From inline content string
const jsonSource = File.fromStr(
  JSON.stringify({ database: { host: "localhost", port: 5432 } }),
  FileFormat.Json,
);

// From a file path with extension discovery
const fileSource = File.withName("config/settings", FileFormat.Json);
fileSource.required(false); // Make file optional

const config = new ConfigBuilder().addSource(jsonSource).addSource(fileSource).build();

console.log(config.getString("database.host")); // "localhost"
```

### Environment Variables

```typescript
import { Config, Environment } from "@alloy-ts/config";

const envSource = Environment.withPrefix("APP").separator("__").ignoreEmpty(true);

const config = new ConfigBuilder().addSource(envSource).build();
```

### JS Object Deserialization

```typescript
import { Config } from "@alloy-ts/config";

const config = Config.tryFrom({
  app: "alloy-service",
  version: 1,
});

const plainObject = config.tryDeserialize();
console.log(plainObject); // { app: "alloy-service", version: 1 }
```

## API Reference

### `Config`

- `static tryFrom(from: any): Config` - Creates a `Config` from a JavaScript object.
- `get(key: string): any` - Gets a raw value at key.
- `getString(key: string): string` - Gets string value at key.
- `getInt(key: string): number` - Gets integer value at key.
- `getFloat(key: string): number` - Gets float value at key.
- `getBool(key: string): boolean` - Gets boolean value at key.
- `getTable(key: string): any` - Gets table value at key as a plain object.
- `getArray(key: string): any` - Gets array value at key as a plain array.
- `tryDeserialize(): any` - Deserializes the configuration into a plain JS object.
- `cache: any` - Getter returning root cached configuration value.

### `ConfigBuilder`

- `new ConfigBuilder()` - Creates a new configuration builder.
- `setDefault(key: string, value: any): this` - Sets default value.
- `setOverride(key: string, value: any): this` - Sets override value.
- `setOverrideOption(key: string, value?: any): this` - Sets override value if non-null.
- `addSource(source: File | Environment): this` - Adds file or environment source.
- `build(): Config` - Builds configuration.
- `buildCloned(): Config` - Builds configuration cloned.

### `File`

- `new File(name: string, format?: FileFormat)` - Constructs a File source.
- `static withName(name: string, format?: FileFormat): File` - Factory for file by basename.
- `static fromStr(text: string, format: FileFormat): File` - Factory from string content.
- `format(format: FileFormat): this` - Sets file format.
- `required(required: boolean): this` - Sets whether file is required.

### `Environment`

- `static withPrefix(prefix: string): Environment` - Factory with environment variable prefix.
- `static default(): Environment` - Factory for default environment.
- `prefix(prefix: string): this` - Sets environment variable prefix.
- `separator(separator: string): this` - Sets nested key separator (e.g., `__`).
- `ignoreEmpty(ignore: boolean): this` - Sets whether empty environment variables are ignored.

### `Value`

- `new Value(value: any, origin?: string)` - Creates a new configuration value.
- `origin(): string | null` - Gets location origin.
- Typed accessors: `intoBool()`, `intoInt()`, `intoFloat()`, `intoString()`, `intoArray()`, `intoTable()`, `tryDeserialize()`.

### `FileFormat`

- String enum values: `Toml`, `Json`, `Yaml`, `Ini`, `Ron`, `Json5`.

## Running Examples

```bash
node --import @oxc-node/core examples/config-builder.ts
node --import @oxc-node/core examples/config-file.ts
```

## Development

- Install dependencies:

```bash
npm install
```

- Build NAPI native binary and TypeScript definitions:

```bash
npm run build:napi
```

- Run unit tests:

```bash
npm test
```

- Code formatting & linting:

```bash
npm run fmt
npm run check
```
