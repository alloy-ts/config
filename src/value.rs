use std::collections::HashMap;
use napi::bindgen_prelude::*;
use napi_derive::napi;

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
#[derive(Clone, Debug, Default)]
pub struct Value {
  pub(crate) inner: config::Value,
}

impl From<config::Value> for Value {
  fn from(inner: config::Value) -> Self {
    Value { inner }
  }
}

impl From<Value> for config::Value {
  fn from(val: Value) -> Self {
    val.inner
  }
}

#[napi]
impl Value {
  #[napi(constructor, ts_args_type = "val: any, origin?: string | null")]
  pub fn new(val: serde_json::Value, origin: Option<String>) -> Result<Self> {
    let config_val: config::Value = serde_json::from_value(val)
      .map_err(|e| Error::new(Status::InvalidArg, e.to_string()))?;
    if let Some(orig) = origin {
      let v = config_val;
      Ok(Value {
        inner: config::Value::new(Some(&orig), v.kind),
      })
    } else {
      Ok(Value { inner: config_val })
    }
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

  #[napi]
  pub fn try_deserialize(&self) -> Result<serde_json::Value> {
    self.inner.clone().try_deserialize::<serde_json::Value>()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_bool(&self) -> Result<bool> {
    self.inner.clone().into_bool()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_int(&self) -> Result<i64> {
    self.inner.clone().into_int()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_int128(&self) -> Result<String> {
    self.inner.clone().into_int128()
      .map(|i| i.to_string())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_uint(&self) -> Result<i64> {
    self.inner.clone().into_uint()
      .map(|u| u as i64)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_uint128(&self) -> Result<String> {
    self.inner.clone().into_uint128()
      .map(|u| u.to_string())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_float(&self) -> Result<f64> {
    self.inner.clone().into_float()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_string(&self) -> Result<String> {
    self.inner.clone().into_string()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_array(&self) -> Result<Vec<Value>> {
    self.inner.clone().into_array()
      .map(|arr| arr.into_iter().map(Value::from).collect())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn into_table(&self) -> Result<HashMap<String, Value>> {
    self.inner.clone().into_table()
      .map(|map| map.into_iter().map(|(k, v)| (k, Value::from(v))).collect())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn to_string(&self) -> String {
    self.inner.to_string()
  }
}
