use config::{
    builder::DefaultState as InnerDefaultState, ConfigBuilder as InnerConfigBuilder, ConfigError,
    Source, Value as ConfigValue,
};
use napi::bindgen_prelude::Either3;
use napi_derive::napi;
use serde_json::Value as JsonValue;

use crate::config::Config;
use crate::file::{Environment, File};

/// Represents data specific to builder in default state.
#[napi]
pub struct DefaultState;

/// Represents data specific to builder in asynchronous state.
#[napi]
pub struct AsyncState;

/// A configuration builder
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigBuilder {
    pub(crate) inner: InnerConfigBuilder<InnerDefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi(js_name = "setDefault")]
    pub fn set_default(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val: ConfigValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "set_default")]
    pub fn set_default_alias(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        self.set_default(key, value)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val: ConfigValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "set_override")]
    pub fn set_override_alias(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        self.set_override(key, value)
    }

    #[napi(js_name = "setOverrideOption")]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<JsonValue>,
    ) -> napi::Result<&Self> {
        if let Some(v) = value {
            let val: ConfigValue = serde_json::from_value(v)
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi(js_name = "set_override_option")]
    pub fn set_override_option_alias(
        &mut self,
        key: String,
        value: Option<JsonValue>,
    ) -> napi::Result<&Self> {
        self.set_override_option(key, value)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source(
        &mut self,
        source: Either3<&File, &Environment, &Config>,
    ) -> &Self {
        match source {
            Either3::A(f) => {
                self.inner = self.inner.clone().add_source(f.clone());
            }
            Either3::B(e) => {
                self.inner = self.inner.clone().add_source(e.clone());
            }
            Either3::C(c) => {
                self.inner = self.inner.clone().add_source(c.clone());
            }
        }
        self
    }

    #[napi(js_name = "add_source")]
    pub fn add_source_alias(
        &mut self,
        source: Either3<&File, &Environment, &Config>,
    ) -> &Self {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }

    #[napi(js_name = "buildCloned")]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        self.build()
    }

    #[napi(js_name = "build_cloned")]
    pub fn build_cloned_alias(&self) -> napi::Result<Config> {
        self.build()
    }
}

impl ConfigBuilder {
    pub fn set_default_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<ConfigValue>,
    {
        self.inner = self.inner.set_default(key, value)?;
        Ok(self)
    }

    pub fn set_override_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<ConfigValue>,
    {
        self.inner = self.inner.set_override(key, value)?;
        Ok(self)
    }

    pub fn add_source_rust<T>(mut self, source: T) -> Self
    where
        T: Source + Send + Sync + 'static,
    {
        self.inner = self.inner.add_source(source);
        self
    }
}
