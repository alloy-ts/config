use std::collections::HashMap;
use napi_derive::napi;
use serde_json::Value as JsonValue;

use crate::builder::ConfigBuilder;
use crate::value::{to_napi_err, Value};

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub(crate) inner: config::Config,
}

#[napi]
impl Config {
    #[napi]
    pub fn builder() -> ConfigBuilder {
        ConfigBuilder::default()
    }

    #[napi(factory)]
    pub fn try_from(from: JsonValue) -> napi::Result<Config> {
        let cfg = config::Config::try_from(&from).map_err(to_napi_err)?;
        Ok(Config { inner: cfg })
    }

    #[napi(getter)]
    pub fn cache(&self) -> Value {
        Value {
            inner: self.inner.cache.clone(),
        }
    }

    #[napi]
    pub fn get(&self, key: String) -> napi::Result<JsonValue> {
        self.inner.get::<JsonValue>(&key).map_err(to_napi_err)
    }

    #[napi]
    pub fn get_string(&self, key: String) -> napi::Result<String> {
        self.inner.get_string(&key).map_err(to_napi_err)
    }

    #[napi]
    pub fn get_int(&self, key: String) -> napi::Result<i64> {
        self.inner.get_int(&key).map_err(to_napi_err)
    }

    #[napi]
    pub fn get_float(&self, key: String) -> napi::Result<f64> {
        self.inner.get_float(&key).map_err(to_napi_err)
    }

    #[napi]
    pub fn get_bool(&self, key: String) -> napi::Result<bool> {
        self.inner.get_bool(&key).map_err(to_napi_err)
    }

    #[napi]
    pub fn get_table(&self, key: String) -> napi::Result<HashMap<String, Value>> {
        let table = self.inner.get_table(&key).map_err(to_napi_err)?;
        Ok(table.into_iter().map(|(k, v)| (k, Value { inner: v })).collect())
    }

    #[napi]
    pub fn get_array(&self, key: String) -> napi::Result<Vec<Value>> {
        let array = self.inner.get_array(&key).map_err(to_napi_err)?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        self.inner.clone().try_deserialize::<JsonValue>().map_err(to_napi_err)
    }
}
