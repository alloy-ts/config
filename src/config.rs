use napi::bindgen_prelude::*;
use napi_derive::napi;
use std::collections::HashMap;

use crate::builder::ConfigBuilder;
use crate::value::Value;

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub(crate) inner: config::Config,
}

#[napi]
impl Config {
    #[napi]
    pub fn builder() -> ConfigBuilder {
        ConfigBuilder::new()
    }

    #[napi(factory, js_name = "try_from")]
    pub fn try_from(env: Env, from: Unknown) -> napi::Result<Config> {
        let serde_val: serde_json::Value = env.from_js_value(from)?;
        let cfg = config::Config::try_from(&serde_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config { inner: cfg })
    }

    #[napi]
    pub fn get(&self, env: Env, key: String) -> napi::Result<Unknown<'_>> {
        let val: config::Value = self
            .inner
            .get(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let serde_val: serde_json::Value = val
            .try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        env.to_js_value(&serde_val)
    }

    #[napi(js_name = "get_string")]
    pub fn get_string(&self, key: String) -> napi::Result<String> {
        self.inner
            .get_string(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "get_int")]
    pub fn get_int(&self, key: String) -> napi::Result<i64> {
        self.inner
            .get_int(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "get_float")]
    pub fn get_float(&self, key: String) -> napi::Result<f64> {
        self.inner
            .get_float(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "get_bool")]
    pub fn get_bool(&self, key: String) -> napi::Result<bool> {
        self.inner
            .get_bool(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "get_table")]
    pub fn get_table(&self, key: String) -> napi::Result<HashMap<String, Value>> {
        let table = self
            .inner
            .get_table(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(table
            .into_iter()
            .map(|(k, v)| (k, Value { inner: v }))
            .collect())
    }

    #[napi(js_name = "get_array")]
    pub fn get_array(&self, key: String) -> napi::Result<Vec<Value>> {
        let arr = self
            .inner
            .get_array(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(js_name = "try_deserialize")]
    pub fn try_deserialize(&self, env: Env) -> napi::Result<Unknown<'_>> {
        let serde_val: serde_json::Value = self
            .inner
            .clone()
            .try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        env.to_js_value(&serde_val)
    }
}
