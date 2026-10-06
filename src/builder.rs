use config_crate::{ConfigBuilder as InnerConfigBuilder, Environment as InnerEnvironment};
use napi::Either;
use napi_derive::napi;
use serde_json::Value as JsonValue;

use crate::config::Config;
use crate::file::File;
use crate::to_napi_err;
use crate::value::json_to_config_value;

/// A configuration builder.
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigBuilder {
    inner: InnerConfigBuilder<config_crate::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<JsonValue>,
    ) -> napi::Result<&Self> {
        if let Some(v) = value {
            let val = json_to_config_value(v)?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(to_napi_err)?;
        }
        Ok(self)
    }

    #[napi]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> napi::Result<&Self> {
        self.inner = match source {
            Either::A(file) => self.inner.clone().add_source(file.clone()),
            Either::B(env) => self.inner.clone().add_source(env.clone()),
        };
        Ok(self)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let inner = self.inner.clone().build_cloned().map_err(to_napi_err)?;
        Ok(Config::new(inner))
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let inner = self.inner.clone().build_cloned().map_err(to_napi_err)?;
        Ok(Config::new(inner))
    }
}

/// An environment-variable configuration source.
#[napi]
#[derive(Clone, Debug, Default)]
pub struct Environment {
    inner: InnerEnvironment,
}

#[napi]
impl Environment {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi(factory)]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: InnerEnvironment::with_prefix(&prefix),
        }
    }

    #[napi(factory, js_name = "default")]
    pub fn default_env() -> Self {
        Self::default()
    }

    #[napi]
    pub fn prefix(&mut self, prefix: String) -> &Self {
        self.inner = self.inner.clone().prefix(&prefix);
        self
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        self.inner = self.inner.clone().separator(&separator);
        self
    }

    #[napi]
    pub fn ignore_empty(&mut self, ignore_empty: bool) -> &Self {
        self.inner = self.inner.clone().ignore_empty(ignore_empty);
        self
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep_prefix: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep_prefix);
        self
    }
}

impl config_crate::Source for Environment {
    fn clone_into_box(&self) -> Box<dyn config_crate::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(
        &self,
    ) -> Result<config_crate::Map<String, config_crate::Value>, config_crate::ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut config_crate::Value) -> Result<(), config_crate::ConfigError> {
        self.inner.collect_to(cache)
    }
}
