use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::Deserialize;
use std::collections::HashMap;

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

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(origin: Option<String>, value: Option<Unknown>, env: Env) -> napi::Result<Self> {
        let cfg_val = match value {
            Some(u) => {
                let serde_val: serde_json::Value = env.from_js_value(u)?;
                let mut v = config::Value::deserialize(serde_val)
                    .map_err(|e| napi::Error::from_reason(e.to_string()))?;
                if let Some(orig) = origin {
                    v = config::Value::new(Some(&orig), v.kind);
                }
                v
            }
            None => config::Value::new(origin.as_ref(), config::ValueKind::Nil),
        };
        Ok(Self { inner: cfg_val })
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
    pub fn into_int128(&self) -> napi::Result<i64> {
        let val = self
            .inner
            .clone()
            .into_int128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        val.try_into().map_err(|e: std::num::TryFromIntError| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        let u = self
            .inner
            .clone()
            .into_uint()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(u as i64)
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        let val = self
            .inner
            .clone()
            .into_uint128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        val.try_into().map_err(|e: std::num::TryFromIntError| napi::Error::from_reason(e.to_string()))
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
        Ok(table
            .into_iter()
            .map(|(k, v)| (k, Value { inner: v }))
            .collect())
    }

    #[napi]
    pub fn try_deserialize(&self, env: Env) -> napi::Result<Unknown<'_>> {
        let serde_val: serde_json::Value = self
            .inner
            .clone()
            .try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        env.to_js_value(&serde_val)
    }
}
