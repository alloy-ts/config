use std::collections::HashMap;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::Deserialize;

#[napi(string_enum)]
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

#[napi]
#[derive(Clone, Debug)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(
        origin: Option<String>,
        #[napi(ts_arg_type = "any")] value: serde_json::Value,
    ) -> Result<Self> {
        let parsed: config::Value = config::Value::deserialize(value)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        let config_val = config::Value::new(origin.as_ref(), parsed.kind);
        Ok(Self { inner: config_val })
    }

    #[napi(getter)]
    pub fn kind(&self) -> ValueKind {
        match self.inner.kind {
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
    pub fn try_deserialize(&self) -> Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_bool(&self) -> Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int(&self) -> Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int128(&self) -> Result<String> {
        self.inner
            .clone()
            .into_int128()
            .map(|v| v.to_string())
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> Result<i64> {
        let val = self
            .inner
            .clone()
            .into_uint()
            .map_err(|e| Error::from_reason(e.to_string()))?;
        i64::try_from(val).map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> Result<String> {
        self.inner
            .clone()
            .into_uint128()
            .map(|v| v.to_string())
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_float(&self) -> Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_string(&self) -> Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi(ts_return_type = "Array<Value>")]
    pub fn into_array(&self) -> Result<Vec<Value>> {
        let arr = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(ts_return_type = "Record<string, Value>")]
    pub fn into_table(&self) -> Result<HashMap<String, Value>> {
        let table = self
            .inner
            .clone()
            .into_table()
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(table
            .into_iter()
            .map(|(k, v)| (k, Value { inner: v }))
            .collect())
    }
}
