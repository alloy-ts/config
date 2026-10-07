#[path = "builder.rs"]
pub(crate) mod builder;

#[path = "config.rs"]
pub(crate) mod config;

#[path = "file.rs"]
pub(crate) mod file;

#[path = "value.rs"]
pub(crate) mod value;

pub use builder::{ConfigBuilder, Environment};
pub use config::Config;
pub use file::{File, FileFormat};
pub use value::Value;

use serde_json::Value as JsonValue;

/// Wrapper that erases the concrete `config::Source` type so a `File` or an
/// `Environment` can both be handed to `ConfigBuilder::add_source`.
pub(crate) struct BoxedSource(pub(crate) Box<dyn ::config::Source + Send + Sync>);

impl std::fmt::Debug for BoxedSource {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_tuple("BoxedSource").finish()
    }
}

impl ::config::Source for BoxedSource {
    fn clone_into_box(&self) -> Box<dyn ::config::Source + Send + Sync> {
        self.0.clone_into_box()
    }

    fn collect(
        &self,
    ) -> std::result::Result<::config::Map<String, ::config::Value>, ::config::ConfigError> {
        self.0.collect()
    }
}

#[allow(dead_code)]
pub(crate) fn config_value_to_json(val: &::config::Value) -> JsonValue {
    match &val.kind {
        ::config::ValueKind::Nil => JsonValue::Null,
        ::config::ValueKind::Boolean(b) => JsonValue::Bool(*b),
        ::config::ValueKind::I64(i) => JsonValue::Number((*i).into()),
        ::config::ValueKind::I128(i) => JsonValue::String(i.to_string()),
        ::config::ValueKind::U64(u) => JsonValue::Number((*u).into()),
        ::config::ValueKind::U128(u) => JsonValue::String(u.to_string()),
        ::config::ValueKind::Float(f) => serde_json::Number::from_f64(*f)
            .map(JsonValue::Number)
            .unwrap_or(JsonValue::Null),
        ::config::ValueKind::String(s) => JsonValue::String(s.clone()),
        ::config::ValueKind::Table(t) => {
            let map: serde_json::Map<String, JsonValue> = t
                .iter()
                .map(|(k, v)| (k.clone(), config_value_to_json(v)))
                .collect();
            JsonValue::Object(map)
        }
        ::config::ValueKind::Array(a) => {
            let arr: Vec<JsonValue> = a.iter().map(config_value_to_json).collect();
            JsonValue::Array(arr)
        }
    }
}

pub(crate) fn json_to_config_value(value: JsonValue) -> napi::Result<::config::Value> {
    serde_json::from_value(value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

pub(crate) fn to_napi_err(err: ::config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
