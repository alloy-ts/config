use std::collections::HashMap;
use napi_derive::napi;
use serde_json::Value as JsonValue;

use crate::json_to_config_value;

#[napi]
#[derive(Clone, Debug, PartialEq)]
pub struct Value {
    pub(crate) inner: ::config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(
        value: Option<JsonValue>,
        origin: Option<String>,
    ) -> napi::Result<Self> {
        let val = if let Some(v) = value {
            json_to_config_value(v)?
        } else {
            ::config::Value::new(None, ::config::ValueKind::Nil)
        };
        Ok(Self {
            inner: ::config::Value::new(origin.as_ref(), val.kind),
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn new_factory(
        value: Option<JsonValue>,
        origin: Option<String>,
    ) -> napi::Result<Self> {
        Self::new(value, origin)
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        self.inner
            .clone()
            .try_deserialize::<JsonValue>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoBool")]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "into_bool")]
    pub fn into_bool_alias(&self) -> napi::Result<bool> {
        self.into_bool()
    }

    #[napi(js_name = "intoInt")]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "into_int")]
    pub fn into_int_alias(&self) -> napi::Result<i64> {
        self.into_int()
    }

    #[napi(js_name = "intoInt128")]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("i128 overflow")))
    }

    #[napi(js_name = "into_int128")]
    pub fn into_int128_alias(&self) -> napi::Result<i64> {
        self.into_int128()
    }

    #[napi(js_name = "intoUint")]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u64 overflow")))
    }

    #[napi(js_name = "into_uint")]
    pub fn into_uint_alias(&self) -> napi::Result<i64> {
        self.into_uint()
    }

    #[napi(js_name = "intoUint128")]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u128 overflow")))
    }

    #[napi(js_name = "into_uint128")]
    pub fn into_uint128_alias(&self) -> napi::Result<i64> {
        self.into_uint128()
    }

    #[napi(js_name = "intoFloat")]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "into_float")]
    pub fn into_float_alias(&self) -> napi::Result<f64> {
        self.into_float()
    }

    #[napi(js_name = "intoString")]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "into_string")]
    pub fn into_string_alias(&self) -> napi::Result<String> {
        self.into_string()
    }

    #[napi(js_name = "intoArray")]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let array = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(js_name = "into_array")]
    pub fn into_array_alias(&self) -> napi::Result<Vec<Value>> {
        self.into_array()
    }

    #[napi(js_name = "intoTable")]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self
            .inner
            .clone()
            .into_table()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let mut map = HashMap::new();
        for (k, v) in table {
            map.insert(k, Value { inner: v });
        }
        Ok(map)
    }

    #[napi(js_name = "into_table")]
    pub fn into_table_alias(&self) -> napi::Result<HashMap<String, Value>> {
        self.into_table()
    }
}
