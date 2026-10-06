use config::{
    builder::DefaultState as InnerDefaultState,
    ConfigBuilder as InnerConfigBuilder, ConfigError, Source, Value as ConfigValue,
};
use napi::bindgen_prelude::Either3;
use napi_derive::napi;

use crate::config::Config;
use crate::file::{Environment, File, FileFormat};

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
    inner: InnerConfigBuilder<InnerDefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: ConfigValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: ConfigValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
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

    #[napi]
    pub fn add_file(
        &mut self,
        file_path: String,
        format: Option<napi::Either<FileFormat, String>>,
    ) -> napi::Result<&Self> {
        let file = if let Some(fmt) = format {
            File::new(file_path, fmt)?
        } else {
            File::with_name(file_path)
        };
        self.inner = self.inner.clone().add_source(file);
        Ok(self)
    }

    #[napi]
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
                self.inner = self.inner.clone().add_source(c.inner.clone());
            }
        }
        self
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
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
