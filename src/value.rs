use std::collections::HashMap;
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

/// A configuration value.
#[napi]
#[derive(Clone, Debug, Default, PartialEq)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    /// Create a new value instance that will remember its source uri.
    #[napi(factory, ts_args_type = "value: any, origin?: string")]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Value> {
        let config_val = json_to_config_value(value)?;
        Ok(Value {
            inner: config::Value::new(origin.as_ref(), config_val.kind),
        })
    }

    /// Get the description of the original location of the value.
    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    /// Attempt to deserialize this value into the requested type.
    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self as a bool, if possible.
    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an i64, if possible.
    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an i128, if possible.
    #[napi]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("i128 overflow")))
    }

    /// Returns self into an u64, if possible.
    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u64 overflow")))
    }

    /// Returns self into an u128, if possible.
    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u128 overflow")))
    }

    /// Returns self into a f64, if possible.
    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into a string, if possible.
    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an array, if possible.
    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let array = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    /// If the Value is a Table, returns the associated HashMap.
    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self
            .inner
            .clone()
            .into_table()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let mut map = HashMap::new();
        for (k, v) in table {
            map.insert(k, Value { inner: v });
        }
        Ok(map)
    }
}
