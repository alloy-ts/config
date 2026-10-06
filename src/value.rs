use std::collections::HashMap;
use napi_derive::napi;
use serde::Deserialize;

#[napi]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

#[napi]
#[derive(Clone, Debug)]
pub struct Value {
    pub(crate) inner: config::Value,
}

impl From<config::Value> for Value {
    fn from(inner: config::Value) -> Self {
        Self { inner }
    }
}

impl From<Value> for config::Value {
    fn from(val: Value) -> Self {
        val.inner
    }
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(#[napi(ts_arg_type = "any")] val: serde_json::Value, origin: Option<String>) -> napi::Result<Self> {
        let config_val: config::Value = serde_json::from_value(val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let mut inner = config_val;
        if let Some(orig) = origin {
            inner = config::Value::new(Some(&orig), inner.kind);
        }
        Ok(Self { inner })
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
    pub fn into_int128(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_int128()
            .map(|v| v.to_string())
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map(|v| v as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_uint128()
            .map(|v| v.to_string())
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
            .map(|arr| arr.into_iter().map(Value::from).collect())
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        self.inner
            .clone()
            .into_table()
            .map(|table| {
                table
                    .into_iter()
                    .map(|(k, v)| (k, Value::from(v)))
                    .collect()
            })
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        serde_json::Value::deserialize(self.inner.clone())
            .map_err(|e: config::ConfigError| napi::Error::from_reason(e.to_string()))
    }
}
