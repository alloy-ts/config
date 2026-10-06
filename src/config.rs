use std::collections::HashMap;
use napi_derive::napi;

use crate::builder::ConfigBuilder;
use crate::config_to_json_value;

/// A prioritized configuration repository.
#[napi]
#[derive(Clone)]
pub struct Config {
  pub(crate) inner: ::config::Config,
}

#[napi]
impl Config {
  /// Creates new [`ConfigBuilder`] instance
  #[napi]
  pub fn builder() -> ConfigBuilder {
    ConfigBuilder::new()
  }

  /// Attempt to serialize the entire configuration from the given JS value.
  #[napi(factory)]
  pub fn try_from(from: serde_json::Value) -> napi::Result<Config> {
    let config = ::config::Config::try_from(&from)
      .map_err(|e| napi::Error::from_reason(e.to_string()))?;
    Ok(Config { inner: config })
  }

  #[napi]
  pub fn get(&self, key: String) -> napi::Result<serde_json::Value> {
    self.inner
      .get::<serde_json::Value>(&key)
      .map_err(|e| napi::Error::from_reason(e.to_string()))
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
  pub fn get_table(&self, key: String) -> napi::Result<HashMap<String, serde_json::Value>> {
    let table = self.inner
      .get_table(&key)
      .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let mut map = HashMap::new();
    for (k, v) in table {
      let json_val = config_to_json_value(&v)?;
      map.insert(k, json_val);
    }
    Ok(map)
  }

  #[napi]
  pub fn get_array(&self, key: String) -> napi::Result<Vec<serde_json::Value>> {
    let array = self.inner
      .get_array(&key)
      .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let mut vec = Vec::with_capacity(array.len());
    for v in array {
      vec.push(config_to_json_value(&v)?);
    }
    Ok(vec)
  }

  /// Attempt to deserialize the entire configuration into the requested JS type.
  #[napi]
  pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
    self.inner
      .clone()
      .try_deserialize::<serde_json::Value>()
      .map_err(|e| napi::Error::from_reason(e.to_string()))
  }
}
