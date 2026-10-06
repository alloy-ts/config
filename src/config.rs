use config::{Config as InnerConfig, ConfigError, Map, Source, Value};
use serde::de::{Deserializer, Visitor};
use serde::{Deserialize, Serialize};

use crate::builder::{ConfigBuilder, DefaultState};

/// A prioritized configuration repository.
///
/// It maintains a set of configuration sources, fetches values to populate those, and provides
/// them according to the source's priority.
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub cache: Value,
    inner: InnerConfig,
}

impl Config {
    pub(crate) fn new(cache: Value, inner: InnerConfig) -> Self {
        Self { cache, inner }
    }

    /// Creates new [`ConfigBuilder`] instance
    pub fn builder() -> ConfigBuilder<DefaultState> {
        ConfigBuilder::<DefaultState>::default()
    }

    pub fn get<'de, T: Deserialize<'de>>(&self, key: &str) -> Result<T, ConfigError> {
        self.inner.get(key)
    }

    pub fn get_string(&self, key: &str) -> Result<String, ConfigError> {
        self.inner.get_string(key)
    }

    pub fn get_int(&self, key: &str) -> Result<i64, ConfigError> {
        self.inner.get_int(key)
    }

    pub fn get_float(&self, key: &str) -> Result<f64, ConfigError> {
        self.inner.get_float(key)
    }

    pub fn get_bool(&self, key: &str) -> Result<bool, ConfigError> {
        self.inner.get_bool(key)
    }

    pub fn get_table(&self, key: &str) -> Result<Map<String, Value>, ConfigError> {
        self.inner.get_table(key)
    }

    pub fn get_array(&self, key: &str) -> Result<Vec<Value>, ConfigError> {
        self.inner.get_array(key)
    }

    /// Attempt to deserialize the entire configuration into the requested type.
    pub fn try_deserialize<'de, T: Deserialize<'de>>(self) -> Result<T, ConfigError> {
        self.inner.try_deserialize()
    }

    /// Attempt to serialize the entire configuration from the given type.
    pub fn try_from<T: Serialize>(from: &T) -> Result<Self, ConfigError> {
        let inner = InnerConfig::try_from(from)?;
        let cache = inner.cache.clone();
        Ok(Self { cache, inner })
    }
}

impl<'de> Deserializer<'de> for Config {
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

impl Source for Config {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<Map<String, Value>, ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut Value) -> Result<(), ConfigError> {
        self.inner.collect_to(cache)
    }
}
