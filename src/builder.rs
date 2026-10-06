use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::Deserialize;

use crate::config::Config;
use crate::file::File;

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Environment {
    pub(crate) inner: config::Environment,
}

#[napi]
impl Environment {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: config::Environment::default(),
        }
    }

    #[napi(factory)]
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
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.inner = self.inner.clone().ignore_empty(ignore);
        self
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep);
        self
    }
}

fn js_to_config_value(val: serde_json::Value) -> Result<config::Value> {
    config::Value::deserialize(val).map_err(|e| Error::from_reason(e.to_string()))
}

#[napi]
#[derive(Default)]
pub struct ConfigBuilder {
    pub(crate) inner: Option<config::ConfigBuilder<config::builder::DefaultState>>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: Some(config::Config::builder()),
        }
    }

    #[napi]
    pub fn set_default(
        &mut self,
        key: String,
        #[napi(ts_arg_type = "any")] value: serde_json::Value,
    ) -> Result<&Self> {
        let config_val = js_to_config_value(value)?;
        let builder = self.inner.take().unwrap_or_default();
        let builder = builder
            .set_default(&key, config_val)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        self.inner = Some(builder);
        Ok(self)
    }

    #[napi]
    pub fn set_override(
        &mut self,
        key: String,
        #[napi(ts_arg_type = "any")] value: serde_json::Value,
    ) -> Result<&Self> {
        let config_val = js_to_config_value(value)?;
        let builder = self.inner.take().unwrap_or_default();
        let builder = builder
            .set_override(&key, config_val)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        self.inner = Some(builder);
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        #[napi(ts_arg_type = "any")] value: Option<serde_json::Value>,
    ) -> Result<&Self> {
        let config_val = match value {
            Some(v) => Some(js_to_config_value(v)?),
            None => None,
        };
        let builder = self.inner.take().unwrap_or_default();
        let builder = builder
            .set_override_option(&key, config_val)
            .map_err(|e| Error::from_reason(e.to_string()))?;
        self.inner = Some(builder);
        Ok(self)
    }

    #[napi]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> Result<&Self> {
        let builder = self.inner.take().unwrap_or_default();
        let builder = match source {
            Either::A(file) => builder.add_source(file.inner.clone()),
            Either::B(env) => builder.add_source(env.inner.clone()),
        };
        self.inner = Some(builder);
        Ok(self)
    }

    #[napi]
    pub fn add_async_source(&mut self, source: Either<&File, &Environment>) -> Result<&Self> {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&self) -> Result<Config> {
        let builder = self
            .inner
            .as_ref()
            .ok_or_else(|| Error::from_reason("ConfigBuilder has already been consumed"))?;
        let cfg = builder
            .build_cloned()
            .map_err(|e| Error::from_reason(e.to_string()))?;
        Ok(Config { inner: cfg })
    }

    #[napi]
    pub fn build_cloned(&self) -> Result<Config> {
        self.build()
    }
}
