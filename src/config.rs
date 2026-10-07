use std::collections::HashMap;
use napi_derive::napi;
use serde::de::{Deserializer, Visitor};

use crate::builder::ConfigBuilder;
use crate::value::{config_value_to_json, Value};

/// A prioritized configuration repository.
///
/// It maintains a set of configuration sources, fetches values to populate those, and provides
/// them according to the source's priority.
#[napi]
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub(crate) inner: config::Config,
}

#[napi]
impl Config {
    /// Creates new [`ConfigBuilder`] instance
    #[napi]
    pub fn builder() -> ConfigBuilder {
        ConfigBuilder::default()
    }

    #[napi(getter)]
    pub fn cache(&self) -> Value {
        Value {
            inner: self.inner.cache.clone(),
        }
    }

    #[napi(js_name = "getString")]
    pub fn get_string(&self, key: String) -> napi::Result<String> {
        self.inner
            .get_string(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "getInt")]
    pub fn get_int(&self, key: String) -> napi::Result<i64> {
        self.inner
            .get_int(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "getFloat")]
    pub fn get_float(&self, key: String) -> napi::Result<f64> {
        self.inner
            .get_float(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "getBool")]
    pub fn get_bool(&self, key: String) -> napi::Result<bool> {
        self.inner
            .get_bool(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "getTable")]
    pub fn get_table(&self, key: String) -> napi::Result<HashMap<String, Value>> {
        let table = self
            .inner
            .get_table(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let mut map = HashMap::new();
        for (k, v) in table {
            map.insert(k, Value { inner: v });
        }
        Ok(map)
    }

    #[napi(js_name = "getArray")]
    pub fn get_array(&self, key: String) -> napi::Result<Vec<Value>> {
        let array = self
            .inner
            .get_array(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(array.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn get(&self, key: String) -> napi::Result<serde_json::Value> {
        let val: config::Value = self
            .inner
            .get(&key)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(config_value_to_json(&val))
    }

    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        let val: config::Value = self
            .inner
            .clone()
            .try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(config_value_to_json(&val))
    }

    #[napi(js_name = "tryFrom")]
    pub fn try_from(from: serde_json::Value) -> napi::Result<Config> {
        let inner = config::Config::try_from(&from)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Self { inner })
    }
}

impl Config {
    pub(crate) fn new(inner: config::Config) -> Self {
        Self { inner }
    }
}

impl<'de> Deserializer<'de> for Config {
    type Error = config::ConfigError;

    fn deserialize_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_any(visitor)
    }

    fn deserialize_bool<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_bool(visitor)
    }

    fn deserialize_i8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_i8(visitor)
    }

    fn deserialize_i16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_i16(visitor)
    }

    fn deserialize_i32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_i32(visitor)
    }

    fn deserialize_i64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_i64(visitor)
    }

    fn deserialize_u8<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_u8(visitor)
    }

    fn deserialize_u16<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_u16(visitor)
    }

    fn deserialize_u32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_u32(visitor)
    }

    fn deserialize_u64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_u64(visitor)
    }

    fn deserialize_f32<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_f32(visitor)
    }

    fn deserialize_f64<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_f64(visitor)
    }

    fn deserialize_char<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_char(visitor)
    }

    fn deserialize_str<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_str(visitor)
    }

    fn deserialize_string<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_string(visitor)
    }

    fn deserialize_bytes<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_bytes(visitor)
    }

    fn deserialize_byte_buf<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_byte_buf(visitor)
    }

    fn deserialize_option<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_option(visitor)
    }

    fn deserialize_unit<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_unit(visitor)
    }

    fn deserialize_unit_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_unit_struct(name, visitor)
    }

    fn deserialize_newtype_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_newtype_struct(name, visitor)
    }

    fn deserialize_seq<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_seq(visitor)
    }

    fn deserialize_tuple<V: Visitor<'de>>(
        self,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_tuple(len, visitor)
    }

    fn deserialize_tuple_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        len: usize,
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_tuple_struct(name, len, visitor)
    }

    fn deserialize_map<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_map(visitor)
    }

    fn deserialize_struct<V: Visitor<'de>>(
        self,
        name: &'static str,
        fields: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_struct(name, fields, visitor)
    }

    fn deserialize_enum<V: Visitor<'de>>(
        self,
        name: &'static str,
        variants: &'static [&'static str],
        visitor: V,
    ) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_enum(name, variants, visitor)
    }

    fn deserialize_identifier<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
        self.inner.deserialize_identifier(visitor)
    }

    fn deserialize_ignored_any<V: Visitor<'de>>(self, visitor: V) -> Result<V::Value, config::ConfigError> {
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

impl config::Source for Config {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut config::Value) -> Result<(), config::ConfigError> {
        self.inner.collect_to(cache)
    }
}
