#[path = "builder.rs"]
pub(crate) mod builder;

#[path = "config.rs"]
pub(crate) mod config;

#[path = "file.rs"]
pub(crate) mod file;

#[path = "value.rs"]
pub(crate) mod value;

pub use builder::ConfigBuilder;
pub use config::Config;
pub use file::{Environment, File};
pub use value::Value;

pub(crate) fn json_to_config_value(
    value: serde_json::Value,
) -> Result<::config::Value, napi::Error> {
    serde_json::from_value(value).map_err(|e| napi::Error::from_reason(e.to_string()))
}
