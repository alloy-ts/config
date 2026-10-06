use std::collections::HashMap;
use std::fmt;
use napi_derive::napi;
use serde::de::{Deserialize, Deserializer, Visitor};

/// A configuration value.
#[napi]
#[derive(Clone, Debug, PartialEq, Default)]
pub struct Value {
    pub(crate) inner: ::config::Value,
}

#[napi]
impl Value {
    /// Create a new value instance that will remember its source uri.
    #[napi(factory, ts_args_type = "value: any, origin?: string")]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Value> {
        let config_val: ::config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let inner = if let Some(orig) = origin {
            ::config::Value::new(Some(&orig), config_val.kind)
        } else {
            config_val
        };
        Ok(Value { inner })
    }

    /// Get the description of the original location of the value.
    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    /// Attempt to deserialize this value into the requested type.
    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        self.inner
            .clone()
            .try_deserialize::<serde_json::Value>()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self as a bool, if possible.
    #[napi(js_name = "intoBool")]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner
            .clone()
            .into_bool()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an i64, if possible.
    #[napi(js_name = "intoInt")]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an i128, if possible.
    #[napi(js_name = "intoInt128")]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map(|v| v as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an u64, if possible.
    #[napi(js_name = "intoUint")]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map(|v| v as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an u128, if possible.
    #[napi(js_name = "intoUint128")]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map(|v| v as i64)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into a f64, if possible.
    #[napi(js_name = "intoFloat")]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner
            .clone()
            .into_float()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into a string, if possible.
    #[napi(js_name = "intoString")]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_string()
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Returns self into an array, if possible.
    #[napi(js_name = "intoArray")]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let array = self
            .inner
            .clone()
            .into_array()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    /// If the Value is a Table, returns the associated HashMap.
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

    /// Serialize to JSON
    #[napi(js_name = "toJSON")]
    pub fn to_json(&self) -> napi::Result<serde_json::Value> {
        self.try_deserialize()
    }
}

impl From<::config::Value> for Value {
    fn from(inner: ::config::Value) -> Self {
        Self { inner }
    }
}

impl From<Value> for ::config::Value {
    fn from(v: Value) -> Self {
        v.inner
    }
}

impl fmt::Display for Value {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.inner)
    }
}

impl<'de> Deserialize<'de> for Value {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        ::config::Value::deserialize(deserializer).map(|inner| Value { inner })
    }
}

impl<'de> Deserializer<'de> for Value {
    type Error = ::config::ConfigError;

    fn deserialize_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_any(visitor)
    }

    fn deserialize_bool<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_bool(visitor)
    }

    fn deserialize_i8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_i8(visitor)
    }

    fn deserialize_i16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_i16(visitor)
    }

    fn deserialize_i32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_i32(visitor)
    }

    fn deserialize_i64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_i64(visitor)
    }

    fn deserialize_u8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_u8(visitor)
    }

    fn deserialize_u16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_u16(visitor)
    }

    fn deserialize_u32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_u32(visitor)
    }

    fn deserialize_u64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_u64(visitor)
    }

    fn deserialize_f32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_f32(visitor)
    }

    fn deserialize_f64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_f64(visitor)
    }

    fn deserialize_char<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_char(visitor)
    }

    fn deserialize_str<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_str(visitor)
    }

    fn deserialize_string<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_string(visitor)
    }

    fn deserialize_bytes<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_bytes(visitor)
    }

    fn deserialize_byte_buf<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_byte_buf(visitor)
    }

    fn deserialize_option<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_option(visitor)
    }

    fn deserialize_unit<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_unit(visitor)
    }

    fn deserialize_unit_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_unit_struct(name, visitor)
    }

    fn deserialize_newtype_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_newtype_struct(name, visitor)
    }

    fn deserialize_seq<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_seq(visitor)
    }

    fn deserialize_tuple<V: Visitor<'de>>(
        self,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_tuple(len, visitor)
    }

    fn deserialize_tuple_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_tuple_struct(name, len, visitor)
    }

    fn deserialize_map<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_map(visitor)
    }

    fn deserialize_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        fields: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_struct(name, fields, visitor)
    }

    fn deserialize_enum<V: Visitor<'de>>(
        self,
        name: &'static str,
        variants: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_enum(name, variants, visitor)
    }

    fn deserialize_identifier<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
        self.inner.deserialize_identifier(visitor)
    }

    fn deserialize_ignored_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, Self::Error> {
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

pub(crate) fn to_napi_err(err: ::config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
