use std::collections::HashMap;
use napi_derive::napi;

#[napi]
#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum ValueKind {
    Nil,
    Boolean,
    I64,
    I128,
    U64,
    U128,
    Float,
    String,
    Table,
    Array,
}

pub(crate) fn js_value_to_config_value(val: serde_json::Value) -> config::Value {
    match val {
        serde_json::Value::Null => config::Value::new(None, config::ValueKind::Nil),
        serde_json::Value::Bool(b) => config::Value::new(None, b),
        serde_json::Value::Number(n) => {
            if let Some(i) = n.as_i64() {
                config::Value::new(None, i)
            } else if let Some(u) = n.as_u64() {
                config::Value::new(None, u)
            } else if let Some(f) = n.as_f64() {
                config::Value::new(None, f)
            } else {
                config::Value::new(None, config::ValueKind::Nil)
            }
        }
        serde_json::Value::String(s) => config::Value::new(None, s),
        serde_json::Value::Array(arr) => {
            let vec: Vec<config::Value> = arr.into_iter().map(js_value_to_config_value).collect();
            config::Value::new(None, vec)
        }
        serde_json::Value::Object(obj) => {
            let map: config::Map<String, config::Value> = obj
                .into_iter()
                .map(|(k, v)| (k, js_value_to_config_value(v)))
                .collect();
            config::Value::new(None, map)
        }
    }
}

#[napi]
#[derive(Clone, Debug, PartialEq)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(value: Option<serde_json::Value>, origin: Option<String>) -> Self {
        let val = value.unwrap_or(serde_json::Value::Null);
        let cfg_val = js_value_to_config_value(val);
        let inner = config::Value::new(origin.as_ref(), cfg_val.kind);
        Self { inner }
    }

    #[napi(getter)]
    pub fn kind(&self) -> ValueKind {
        match &self.inner.kind {
            config::ValueKind::Nil => ValueKind::Nil,
            config::ValueKind::Boolean(_) => ValueKind::Boolean,
            config::ValueKind::I64(_) => ValueKind::I64,
            config::ValueKind::I128(_) => ValueKind::I128,
            config::ValueKind::U64(_) => ValueKind::U64,
            config::ValueKind::U128(_) => ValueKind::U128,
            config::ValueKind::Float(_) => ValueKind::Float,
            config::ValueKind::String(_) => ValueKind::String,
            config::ValueKind::Table(_) => ValueKind::Table,
            config::ValueKind::Array(_) => ValueKind::Array,
        }
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi(ts_return_type = "any")]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
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
        self.inner
            .clone()
            .into_int128()
            .map(|i| i as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map(|u| u as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map(|u| u as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
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
        self.inner
            .clone()
            .into_array()
            .map(|arr| arr.into_iter().map(|inner| Value { inner }).collect())
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        self.inner
            .clone()
            .into_table()
            .map(|tbl| {
                tbl.into_iter()
                    .map(|(k, v)| (k, Value { inner: v }))
                    .collect()
            })
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }
}
