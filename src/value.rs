use napi_derive::napi;
use serde_json::Value as JsonValue;
use std::collections::HashMap;

pub(crate) fn json_to_config_value(value: JsonValue) -> napi::Result<::config::Value> {
    serde_json::from_value(value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

pub(crate) fn to_napi_err(err: ::config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Value {
    pub(crate) inner: ::config::Value,
}

#[napi]
impl Value {
    #[napi(factory, ts_args_type = "value: any, origin?: string")]
    pub fn new(value: JsonValue, origin: Option<String>) -> napi::Result<Value> {
        let config_val = json_to_config_value(value)?;
        let inner = ::config::Value::new(origin.as_ref(), config_val.kind);
        Ok(Value { inner })
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        self.inner
            .clone()
            .try_deserialize::<JsonValue>()
            .map_err(to_napi_err)
    }

    #[napi(js_name = "toJSON")]
    pub fn to_json(&self) -> JsonValue {
        self.inner
            .clone()
            .try_deserialize::<JsonValue>()
            .unwrap_or(JsonValue::Null)
    }

    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner.clone().into_bool().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner.clone().into_int().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map_err(to_napi_err)
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("i128 overflow")))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map_err(to_napi_err)
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u64 overflow")))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(to_napi_err)
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u128 overflow")))
    }

    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner.clone().into_float().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner.clone().into_string().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let array = self.inner.clone().into_array().map_err(to_napi_err)?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self.inner.clone().into_table().map_err(to_napi_err)?;
        let mut map = HashMap::new();
        for (k, v) in table {
            map.insert(k, Value { inner: v });
        }
        Ok(map)
    }
}
