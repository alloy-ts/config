use config::{ConfigError, Value as InnerValue};
use napi_derive::napi;
use serde::de::{Deserializer, Visitor};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;

/// A configuration value.
#[napi]
#[derive(Default, Debug, Clone, PartialEq)]
pub struct Value {
    pub(crate) inner: InnerValue,
}

#[napi]
impl Value {
    #[napi(factory, ts_args_type = "value: any, origin?: string")]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Value> {
        let config_val: InnerValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let inner = InnerValue::new(origin.as_ref(), config_val.kind);
        Ok(Value { inner })
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoBool")]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoInt")]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoInt128")]
    pub fn into_int128(&self) -> napi::Result<i64> {
        let val = self.inner
            .clone()
            .into_int128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        val.try_into().map_err(|_| napi::Error::from_reason("i128 overflow"))
    }

    #[napi(js_name = "intoUint")]
    pub fn into_uint(&self) -> napi::Result<i64> {
        let val = self.inner
            .clone()
            .into_uint()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        val.try_into().map_err(|_| napi::Error::from_reason("u64 overflow"))
    }

    #[napi(js_name = "intoUint128")]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        let val = self.inner
            .clone()
            .into_uint128()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        val.try_into().map_err(|_| napi::Error::from_reason("u128 overflow"))
    }

    #[napi(js_name = "intoFloat")]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoString")]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoArray")]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(js_name = "intoTable", ts_return_type = "Record<string, Value>")]
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
}

impl Value {
    pub(crate) fn from_inner(inner: InnerValue) -> Self {
        Self { inner }
    }
}

impl fmt::Display for Value {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.inner)
    }
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

impl<'de> Deserialize<'de> for Value {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        InnerValue::deserialize(deserializer).map(|inner| Value { inner })
    }
}

impl Serialize for Value {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let json_val = serde_json::Value::deserialize(self.inner.clone())
            .map_err(serde::ser::Error::custom)?;
        json_val.serialize(serializer)
    }
}

impl<'de> Deserializer<'de> for Value {
    type Error = ConfigError;

    fn deserialize_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_any(visitor)
    }

    fn deserialize_bool<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_bool(visitor)
    }

    fn deserialize_i8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_i8(visitor)
    }

    fn deserialize_i16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_i16(visitor)
    }

    fn deserialize_i32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_i32(visitor)
    }

    fn deserialize_i64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_i64(visitor)
    }

    fn deserialize_u8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_u8(visitor)
    }

    fn deserialize_u16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_u16(visitor)
    }

    fn deserialize_u32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_u32(visitor)
    }

    fn deserialize_u64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_u64(visitor)
    }

    fn deserialize_f32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_f32(visitor)
    }

    fn deserialize_f64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_f64(visitor)
    }

    fn deserialize_char<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_char(visitor)
    }

    fn deserialize_str<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_str(visitor)
    }

    fn deserialize_string<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_string(visitor)
    }

    fn deserialize_bytes<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_bytes(visitor)
    }

    fn deserialize_byte_buf<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_byte_buf(visitor)
    }

    fn deserialize_option<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_option(visitor)
    }

    fn deserialize_unit<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_unit(visitor)
    }

    fn deserialize_unit_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_unit_struct(name, visitor)
    }

    fn deserialize_newtype_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_newtype_struct(name, visitor)
    }

    fn deserialize_seq<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_seq(visitor)
    }

    fn deserialize_tuple<V: Visitor<'de>>(
        self,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_tuple(len, visitor)
    }

    fn deserialize_tuple_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_tuple_struct(name, len, visitor)
    }

    fn deserialize_map<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_map(visitor)
    }

    fn deserialize_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        fields: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_struct(name, fields, visitor)
    }

    fn deserialize_enum<V: Visitor<'de>>(
        self,
        name: &'static str,
        variants: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_enum(name, variants, visitor)
    }

    fn deserialize_identifier<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_identifier(visitor)
    }

    fn deserialize_ignored_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, ConfigError> {
        self.inner.deserialize_ignored_any(visitor)
    }

    fn deserialize_i128<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_i128(visitor)
    }

    fn deserialize_u128<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_u128(visitor)
    }

    fn is_human_readable(&self) -> bool {
        self.inner.is_human_readable()
    }
}
