use config_crate::Value as InnerValue;
use napi_derive::napi;
use std::collections::HashMap;

/// A configuration value.
#[napi]
#[derive(Default, Debug, Clone, PartialEq)]
pub struct Value {
    pub(crate) inner: InnerValue,
}

#[napi]
impl Value {
    /// Create a new value instance that will remember its source uri.
    #[napi(factory, js_name = "new", ts_args_type = "value: any, origin?: string | null")]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Value> {
        let inner: InnerValue = json_to_config_value(value)?;
        let inner = match origin {
            Some(o) => InnerValue::new(Some(&o), inner.kind),
            None => inner,
        };
        Ok(Value { inner })
    }

    /// Get the description of the original location of the value.
    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    /// Attempt to deserialize this value into a JSON value.
    #[napi(ts_return_type = "JsonValue")]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner.clone().into_bool().map_err(to_err)
    }

    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner.clone().into_int().map_err(to_err)
    }

    #[napi]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map_err(to_err)
            .and_then(|v| v.try_into().map_err(|_| napi::Error::from_reason("i128 overflow")))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map_err(to_err)
            .and_then(|v| v.try_into().map_err(|_| napi::Error::from_reason("u64 overflow")))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(to_err)
            .and_then(|v| v.try_into().map_err(|_| napi::Error::from_reason("u128 overflow")))
    }

    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner.clone().into_float().map_err(to_err)
    }

    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner.clone().into_string().map_err(to_err)
    }

    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self.inner.clone().into_array().map_err(to_err)?;
        Ok(arr.into_iter().map(Value::from).collect())
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self.inner.clone().into_table().map_err(to_err)?;
        Ok(table.into_iter().map(|(k, v)| (k, Value::from(v))).collect())
    }
}

impl Value {
    #[allow(dead_code)]
    pub(crate) fn from_inner(inner: InnerValue) -> Self {
        Self { inner }
    }
}

fn to_err(e: config_crate::ConfigError) -> napi::Error {
    napi::Error::from_reason(e.to_string())
}

/// Convert a `serde_json::Value` into a `config::Value`.
pub(crate) fn json_to_config_value(v: serde_json::Value) -> napi::Result<InnerValue> {
    serde_json::from_value(v).map_err(|e| napi::Error::from_reason(e.to_string()))
}

impl From<InnerValue> for Value {
    fn from(inner: InnerValue) -> Self {
        Self { inner }
    }
}

impl From<Value> for InnerValue {
    fn from(val: Value) -> Self {
        val.inner
    }
}
