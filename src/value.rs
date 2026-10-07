use std::collections::HashMap;
use napi_derive::napi;
use serde_json::Value as JsonValue;

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

#[napi]
#[derive(Clone, Debug)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Self> {
        let config_val: config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Self {
            inner: config::Value::new(origin.as_ref(), config_val.kind),
        })
    }

    #[napi(constructor)]
    pub fn js_constructor(value: Option<serde_json::Value>, origin: Option<String>) -> napi::Result<Self> {
        if let Some(val) = value {
            Self::new(val, origin)
        } else {
            Ok(Self {
                inner: config::Value::default(),
            })
        }
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        Ok(config_value_to_json(&self.inner))
    }

    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int128(&self) -> napi::Result<i64> {
        let val = self
            .inner
            .clone()
            .into_int128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        i64::try_from(val).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        let val = self
            .inner
            .clone()
            .into_uint()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        i64::try_from(val).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        let val = self
            .inner
            .clone()
            .into_uint128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        i64::try_from(val).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self
            .inner
            .clone()
            .into_table()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(table.into_iter().map(|(k, v)| (k, Value { inner: v })).collect())
    }
}
