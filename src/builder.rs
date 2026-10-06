use ::config::builder::DefaultState as InnerDefaultState;
use ::config::ConfigBuilder as InnerConfigBuilder;
use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::config::Config;
use crate::file::File;
use crate::value::{json_to_config_value, to_napi_err};

/// A configuration builder.
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

    #[napi(ts_return_type = "ConfigBuilder")]
    pub fn set_default(
        &mut self,
        key: String,
        value: serde_json::Value,
    ) -> napi::Result<()> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(to_napi_err)?;
        Ok(())
    }

    #[napi(ts_return_type = "ConfigBuilder")]
    pub fn set_override(
        &mut self,
        key: String,
        value: serde_json::Value,
    ) -> napi::Result<()> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(to_napi_err)?;
        Ok(())
    }

    #[napi(ts_return_type = "ConfigBuilder")]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<()> {
        if let Some(v) = value {
            let val = json_to_config_value(v)?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(to_napi_err)?;
        }
        Ok(())
    }

    #[napi(ts_return_type = "ConfigBuilder")]
    pub fn add_source(
        &mut self,
        source: Either<&File, &Environment>,
    ) -> napi::Result<()> {
        match source {
            Either::A(file) => {
                self.inner = self.inner.clone().add_source(file.clone());
            }
            Either::B(env) => {
                self.inner = self.inner.clone().add_source(env.to_config_env());
            }
        }
        Ok(())
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
    pub(crate) prefix: Option<String>,
    pub(crate) separator: Option<String>,
    pub(crate) ignore_empty: bool,
    pub(crate) keep_prefix: bool,
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
            prefix: Some(prefix),
            separator: None,
            ignore_empty: false,
            keep_prefix: false,
        }
    }

    #[napi(factory)]
    pub fn default_env() -> Self {
        Self::default()
    }

    #[napi(ts_return_type = "Environment")]
    pub fn prefix(&mut self, prefix: String) {
        self.prefix = Some(prefix);
    }

    #[napi(ts_return_type = "Environment")]
    pub fn separator(&mut self, separator: String) {
        self.separator = Some(separator);
    }

    #[napi(ts_return_type = "Environment")]
    pub fn ignore_empty(&mut self, ignore_empty: bool) {
        self.ignore_empty = ignore_empty;
    }

    #[napi(ts_return_type = "Environment")]
    pub fn keep_prefix(&mut self, keep_prefix: bool) {
        self.keep_prefix = keep_prefix;
    }

    pub(crate) fn to_config_env(&self) -> ::config::Environment {
        let mut env = ::config::Environment::default();
        if let Some(p) = &self.prefix {
            env = env.prefix(p);
        }
        if let Some(s) = &self.separator {
            env = env.separator(s);
        }
        env = env.ignore_empty(self.ignore_empty);
        env = env.keep_prefix(self.keep_prefix);
        env
    }
}
