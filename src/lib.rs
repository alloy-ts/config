#![deny(clippy::all)]

use serde::Deserialize;

#[path = "builder.rs"]
pub(crate) mod builder;

#[path = "config.rs"]
pub(crate) mod config;

pub use builder::*;
pub use config::*;

pub(crate) fn json_to_config_value(value: serde_json::Value) -> napi::Result<::config::Value> {
  serde_json::from_value(value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

pub(crate) fn config_to_json_value(value: &::config::Value) -> napi::Result<serde_json::Value> {
  serde_json::Value::deserialize(value.clone()).map_err(|e| napi::Error::from_reason(e.to_string()))
}
