use config_crate::Config as InnerConfig;
use napi::Either;
use napi_derive::napi;
use serde::Deserialize;
use serde_json::Value as JsonValue;

use crate::builder::{ConfigBuilder, Environment};
use crate::file::File;
use crate::to_napi_err;

/// A prioritized configuration repository.
///
/// It maintains a set of configuration sources, fetches values to populate those, and provides
/// them according to the source's priority.
///
/// A NAPI factory always constructs an instance of the class it is declared on, so
/// `Config.builder()` returns a `Config` that carries an in-progress builder; the chainable
/// `setDefault` / `addSource` / `setOverride` methods feed it and `build()` materializes the
/// final configuration.
#[napi]
#[derive(Clone, Debug, Default)]
pub struct Config {
    pub(crate) inner: InnerConfig,
    /// Present only while this `Config` is acting as a builder.
    pending: Option<ConfigBuilder>,
}

#[napi]
impl Config {
    /// Creates a new configuration builder.
    #[napi(factory)]
    pub fn builder() -> Config {
        Config {
            inner: InnerConfig::default(),
            pending: Some(ConfigBuilder::new()),
        }
    }

    // ----- builder-mode chainable methods (only effective on `Config.builder()`) -----

    #[napi]
    pub fn set_default(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        if let Some(b) = self.pending.as_mut() {
            b.set_default(key, value)?;
        }
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        if let Some(b) = self.pending.as_mut() {
            b.set_override(key, value)?;
        }
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<JsonValue>,
    ) -> napi::Result<&Self> {
        if let Some(b) = self.pending.as_mut() {
            b.set_override_option(key, value)?;
        }
        Ok(self)
    }

    #[napi]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> napi::Result<&Self> {
        if let Some(b) = self.pending.as_mut() {
            b.add_source(source)?;
        }
        Ok(self)
    }

    /// Materialize the configuration from the in-progress builder.
    #[napi]
    pub fn build(&mut self) -> napi::Result<Config> {
        let b = self.pending.take().unwrap_or_default();
        b.build()
    }

    #[napi]
    pub fn build_cloned(&mut self) -> napi::Result<Config> {
        let b = self.pending.clone().unwrap_or_default();
        b.build_cloned()
    }

    // ----- value accessors -----

    /// Root of the cached configuration.
    #[napi(getter)]
    pub fn cache(&self) -> napi::Result<JsonValue> {
        JsonValue::deserialize(self.inner.cache.clone())
            .map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    /// Get a raw value by key as a JSON value.
    #[napi]
    pub fn get(&self, key: String) -> napi::Result<JsonValue> {
        self.inner.get::<JsonValue>(&key).map_err(to_napi_err)
    }

    /// Get a string value by key.
    #[napi]
    pub fn get_string(&self, key: String) -> napi::Result<String> {
        self.inner.get_string(&key).map_err(to_napi_err)
    }

    /// Get an integer value by key.
    #[napi]
    pub fn get_int(&self, key: String) -> napi::Result<i64> {
        self.inner.get_int(&key).map_err(to_napi_err)
    }

    /// Get a float value by key.
    #[napi]
    pub fn get_float(&self, key: String) -> napi::Result<f64> {
        self.inner.get_float(&key).map_err(to_napi_err)
    }

    /// Get a boolean value by key.
    #[napi]
    pub fn get_bool(&self, key: String) -> napi::Result<bool> {
        self.inner.get_bool(&key).map_err(to_napi_err)
    }

    /// Get a table value by key as a JSON object.
    #[napi]
    pub fn get_table(&self, key: String) -> napi::Result<JsonValue> {
        self.inner.get::<JsonValue>(&key).map_err(to_napi_err)
    }

    /// Get an array value by key as a JSON array.
    #[napi]
    pub fn get_array(&self, key: String) -> napi::Result<JsonValue> {
        self.inner.get::<JsonValue>(&key).map_err(to_napi_err)
    }

    /// Attempt to deserialize the entire configuration into a JSON value.
    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        self.inner
            .clone()
            .try_deserialize::<JsonValue>()
            .map_err(to_napi_err)
    }

    /// Attempt to serialize the entire configuration from the given JSON value.
    #[napi(factory, js_name = "tryFrom")]
    pub fn try_from(from: JsonValue) -> napi::Result<Config> {
        let inner = InnerConfig::try_from(&from).map_err(to_napi_err)?;
        Ok(Self {
            inner,
            pending: None,
        })
    }
}

impl Config {
    pub(crate) fn new(inner: InnerConfig) -> Self {
        Self {
            inner,
            pending: None,
        }
    }
}
