use std::collections::HashMap;
use napi_derive::napi;

use crate::builder::ConfigBuilder;
use crate::value::Value;

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub(crate) inner: config::Config,
}

#[napi]
impl Config {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi]
    pub fn builder() -> ConfigBuilder {
        ConfigBuilder::new()
    }

    #[napi(factory)]
    pub fn try_from(from: serde_json::Value) -> napi::Result<Config> {
        let cfg = config::Config::try_from(&from)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config { inner: cfg })
    }

    #[napi(getter)]
    pub fn cache(&self) -> Value {
        Value::from(self.inner.cache.clone())
    }

    #[napi]
    pub fn get(&self, key: String) -> napi::Result<serde_json::Value> {
        let val: serde_json::Value = self
            .inner
            .get(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(val)
    }

    #[napi]
    pub fn get_string(&self, key: String) -> napi::Result<String> {
        self.inner
            .get_string(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_int(&self, key: String) -> napi::Result<i64> {
        self.inner
            .get_int(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_float(&self, key: String) -> napi::Result<f64> {
        self.inner
            .get_float(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_bool(&self, key: String) -> napi::Result<bool> {
        self.inner
            .get_bool(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_table(&self, key: String) -> napi::Result<HashMap<String, Value>> {
        self.inner
            .get_table(&key)
            .map(|table| {
                table
                    .into_iter()
                    .map(|(k, v)| (k, Value::from(v)))
                    .collect()
            })
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_array(&self, key: String) -> napi::Result<Vec<Value>> {
        self.inner
            .get_array(&key)
            .map(|arr| arr.into_iter().map(Value::from).collect())
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }
}
