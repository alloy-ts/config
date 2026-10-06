use napi_derive::napi;
use serde_json::Value as JsonValue;

#[allow(dead_code)]
pub(crate) fn config_value_to_json(val: &config::Value) -> JsonValue {
    match &val.kind {
        config::ValueKind::Nil => JsonValue::Null,
        config::ValueKind::Boolean(b) => JsonValue::Bool(*b),
        config::ValueKind::I64(i) => JsonValue::Number((*i).into()),
        config::ValueKind::I128(i) => JsonValue::String(i.to_string()),
        config::ValueKind::U64(u) => JsonValue::Number((*u).into()),
        config::ValueKind::U128(u) => JsonValue::String(u.to_string()),
        config::ValueKind::Float(f) => serde_json::Number::from_f64(*f)
            .map(JsonValue::Number)
            .unwrap_or(JsonValue::Null),
        config::ValueKind::String(s) => JsonValue::String(s.clone()),
        config::ValueKind::Table(t) => {
            let map: serde_json::Map<String, JsonValue> = t
                .iter()
                .map(|(k, v)| (k.clone(), config_value_to_json(v)))
                .collect();
            JsonValue::Object(map)
        }
        config::ValueKind::Array(a) => {
            let arr: Vec<JsonValue> = a.iter().map(config_value_to_json).collect();
            JsonValue::Array(arr)
        }
    }
}

/// Convert a `serde_json::Value` into a `config::Value`.
pub(crate) fn json_to_config_value(value: JsonValue) -> napi::Result<config::Value> {
    serde_json::from_value(value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

pub(crate) fn to_napi_err(err: config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
