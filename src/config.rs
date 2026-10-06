use std::collections::HashMap;

use napi::bindgen_prelude::*;
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
        Self {
            inner: config::Config::default(),
        }
    }

    #[napi(ts_return_type = "ConfigBuilder")]
    pub fn builder() -> ConfigBuilder {
        ConfigBuilder::new()
    }

    #[napi(getter, ts_return_type = "Value")]
    pub fn cache(&self) -> Value {
        Value {
            inner: self.inner.cache.clone(),
        }
    }

    #[napi(ts_return_type = "any")]
    pub fn get(&self, key: String) -> Result<serde_json::Value> {
        self.inner
            .get::<serde_json::Value>(&key)
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_string(&self, key: String) -> Result<String> {
        self.inner
            .get_string(&key)
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_int(&self, key: String) -> Result<i64> {
        self.inner
            .get_int(&key)
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_float(&self, key: String) -> Result<f64> {
        self.inner
            .get_float(&key)
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn get_bool(&self, key: String) -> Result<bool> {
        self.inner
            .get_bool(&key)
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi(ts_return_type = "Record<string, Value>")]
    pub fn get_table(&self, key: String) -> Result<HashMap<String, Value>> {
        let table = self
            .inner
            .get_table(&key)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(table
            .into_iter()
            .map(|(k, v)| (k, Value { inner: v }))
            .collect())
    }

    #[napi(ts_return_type = "Array<Value>")]
    pub fn get_array(&self, key: String) -> Result<Vec<Value>> {
        let arr = self
            .inner
            .get_array(&key)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(ts_return_type = "any")]
    pub fn try_deserialize(&self) -> Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| Error::from_reason(e.to_string()))
    }

    #[napi(factory, ts_args_type = "from: any")]
    pub fn try_from(from: serde_json::Value) -> Result<Config> {
        let cfg = config::Config::try_from(&from)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(Config { inner: cfg })
    }
}
