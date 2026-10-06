use config::{
    builder::DefaultState as InnerDefaultState,
    ConfigBuilder as InnerConfigBuilder, Value as InnerValue,
};
use napi::bindgen_prelude::{Either, Either3};
use napi_derive::napi;

use crate::config::Config;
use crate::file::{Environment, File, FileFormat};

/// Represents data specific to builder in default state.
#[napi]
#[derive(Debug, Clone, Default)]
pub struct DefaultState;

/// Represents data specific to builder in asynchronous state.
#[napi]
#[derive(Debug, Clone, Default)]
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

    #[napi]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: InnerValue = serde_json::from_value(value)
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
        let val: InnerValue = serde_json::from_value(value)
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
            let val: InnerValue = serde_json::from_value(v)
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
        format: Option<Either<FileFormat, String>>,
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
    pub fn add_source(&mut self, source: Either3<&File, &Environment, &Config>) -> &Self {
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
