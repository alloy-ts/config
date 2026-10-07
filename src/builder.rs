use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::Deserialize;

use crate::config::Config;
use crate::file::{Environment, File, FileSourceInner};
use crate::value::Value;

pub(crate) fn js_to_config_value(
    env: Env,
    val: Either<&Value, Unknown>,
) -> napi::Result<config::Value> {
    match val {
        Either::A(v) => Ok(v.inner.clone()),
        Either::B(u) => {
            let serde_val: serde_json::Value = env.from_js_value(u)?;
            config::Value::deserialize(serde_val)
                .map_err(|e| napi::Error::from_reason(e.to_string()))
        }
    }
}

#[napi]
pub struct ConfigBuilder {
    pub(crate) inner: config::ConfigBuilder<config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: config::Config::builder(),
        }
    }

    #[napi]
    pub fn set_default(
        &mut self,
        env: Env,
        key: String,
        value: Either<&Value, Unknown>,
    ) -> napi::Result<&Self> {
        let cfg_val = js_to_config_value(env, value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, cfg_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(
        &mut self,
        env: Env,
        key: String,
        value: Either<&Value, Unknown>,
    ) -> napi::Result<&Self> {
        let cfg_val = js_to_config_value(env, value)?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, cfg_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        env: Env,
        key: String,
        value: Option<Either<&Value, Unknown>>,
    ) -> napi::Result<&Self> {
        if let Some(val) = value {
            let cfg_val = js_to_config_value(env, val)?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(cfg_val))
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi]
    pub fn add_source(
        &mut self,
        source: Either3<&File, &Environment, &Config>,
    ) -> napi::Result<&Self> {
        match source {
            Either3::A(file) => match &file.inner {
                FileSourceInner::File(f) => {
                    self.inner = self.inner.clone().add_source(f.clone());
                }
                FileSourceInner::String(f) => {
                    self.inner = self.inner.clone().add_source(f.clone());
                }
            },
            Either3::B(env) => {
                self.inner = self.inner.clone().add_source(env.inner.clone());
            }
            Either3::C(cfg) => {
                self.inner = self.inner.clone().add_source(cfg.inner.clone());
            }
        }
        Ok(self)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config { inner: config })
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        self.build()
    }
}
