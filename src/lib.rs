#[path = "builder.rs"]
pub(crate) mod builder;

#[path = "config.rs"]
pub(crate) mod config;

#[path = "file.rs"]
pub(crate) mod file;

#[path = "value.rs"]
pub(crate) mod value;

pub use builder::ConfigBuilder;
pub use builder::Environment;
pub use config::Config;
pub use file::File;
pub use file::FileFormat;
pub use value::Value;

/// Convert a `config` crate `ConfigError` into a NAPI error so that the
/// underlying message is surfaced to JavaScript callers.
pub(crate) fn to_napi_err(e: config::ConfigError) -> napi::Error {
    napi::Error::from_reason(e.to_string())
}
