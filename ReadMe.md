# @alloy-ts/config

TypeScript NAPI-RS bindings for Rust's `config` crate. Organises hierarchical or layered configuration for TypeScript and Rust applications.

## Installation

```bash
npm install @alloy-ts/config
```

## Quick Start

```typescript
import { Config } from "@alloy-ts/config";

const config = Config.builder()
  .setDefault("default", "1")
  .addSource(new Config.File("config/settings", Config.File.Format.Json))
  .setOverride("override", "1")
  .build();

console.log(config.getString("default")); // "1"
console.log(config.getString("override")); // "1"
```

## Features

- **Hierarchical Layering**: Combine defaults, external configuration files (JSON, TOML, YAML, RON, INI, JSON5), and explicit overrides.
- **Strong Types**: Conversion between JavaScript types and Rust `Value` structures.
- **Native Performance**: Powered by NAPI-RS and Rust's `config` crate.

## Running Examples

```bash
node --import @oxc-node/core examples/config-file.ts
```
