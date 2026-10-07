use napi::Either;
use napi_derive::napi;

use crate::config::Config;
use crate::file::File;
use crate::value::{json_to_config_value, to_napi_err};
use crate::BoxedSource;

#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigBuilder {
    pub(crate) inner: ::config::ConfigBuilder<::config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
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
        value: Option<serde_json::Value>,
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
    pub fn add_source(
        &mut self,
        source: Either<&File, Either<&Environment, &Config>>,
    ) -> napi::Result<&Self> {
        let boxed = match source {
            Either::A(file) => file.into_config_source()?,
            Either::B(Either::A(env)) => env.into_config_source(),
            Either::B(Either::B(cfg)) => BoxedSource(Box::new(cfg.inner.clone())),
        };
        self.inner = self.inner.clone().add_source(boxed);
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
    pub(crate) inner: ::config::Environment,
}

#[napi]
impl Environment {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: ::config::Environment::default(),
        }
    }

    #[napi(factory)]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: ::config::Environment::with_prefix(&prefix),
        }
    }

    #[napi(factory)]
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

    pub(crate) fn into_config_source(&self) -> BoxedSource {
        BoxedSource(Box::new(self.inner.clone()))
    }
}
