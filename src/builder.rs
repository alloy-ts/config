use config::{
    builder::DefaultState as InnerDefaultState,
    ConfigBuilder as InnerConfigBuilder, Value,
};
use napi::bindgen_prelude::Either;
use napi_derive::napi;

use crate::config::Config;
use crate::file::{File, FileFormat};

/// Represents data specific to builder in default state.
#[napi]
pub struct DefaultState;

/// Represents data specific to builder in asynchronous state.
#[napi]
pub struct AsyncState;

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Environment {
    pub(crate) inner: config::Environment,
}

#[napi]
impl Environment {
    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: config::Environment::with_prefix(&prefix),
        }
    }

    #[napi(factory)]
    pub fn default() -> Self {
        Self {
            inner: config::Environment::default(),
        }
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        self.inner = self.inner.clone().separator(&separator);
        self
    }

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.inner = self.inner.clone().ignore_empty(ignore);
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep);
        self
    }
}

impl config::Source for Environment {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<config::Map<String, Value>, config::ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut Value) -> Result<(), config::ConfigError> {
        self.inner.collect_to(cache)
    }
}

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

    #[napi(js_name = "setDefault")]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "setOverrideOption")]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        if let Some(v) = value {
            let val: Value = serde_json::from_value(v)
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> &Self {
        match source {
            Either::A(file) => {
                self.inner = self.inner.clone().add_source(file.clone());
            }
            Either::B(env) => {
                self.inner = self.inner.clone().add_source(env.clone());
            }
        }
        self
    }

    #[napi(js_name = "addFile")]
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
    pub fn build(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }

    #[napi(js_name = "buildCloned")]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }
}
