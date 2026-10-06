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

impl From<config::Config> for Config {
  fn from(inner: config::Config) -> Self {
    Config { inner }
  }
}

impl From<Config> for config::Config {
  fn from(cfg: Config) -> Self {
    cfg.inner
  }
}

#[napi]
impl Config {
  #[napi]
  pub fn builder() -> ConfigBuilder {
    ConfigBuilder::default()
  }

  #[napi(factory)]
  pub fn try_from(from: serde_json::Value) -> Result<Config> {
    config::Config::try_from(&from)
      .map(|inner| Config { inner })
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get(&self, key: String) -> Result<Value> {
    self.inner
      .get::<config::Value>(&key)
      .map(Value::from)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_string(&self, key: String) -> Result<String> {
    self.inner
      .get_string(&key)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_int(&self, key: String) -> Result<i64> {
    self.inner
      .get_int(&key)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_float(&self, key: String) -> Result<f64> {
    self.inner
      .get_float(&key)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_bool(&self, key: String) -> Result<bool> {
    self.inner
      .get_bool(&key)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_table(&self, key: String) -> Result<HashMap<String, Value>> {
    self.inner
      .get_table(&key)
      .map(|map| {
        map.into_iter()
          .map(|(k, v)| (k, Value::from(v)))
          .collect()
      })
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn get_array(&self, key: String) -> Result<Vec<Value>> {
    self.inner
      .get_array(&key)
      .map(|vec| vec.into_iter().map(Value::from).collect())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn try_deserialize(&self) -> Result<serde_json::Value> {
    self.inner
      .clone()
      .try_deserialize::<serde_json::Value>()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
