use config::{builder::DefaultState as InnerDefaultState, ConfigBuilder as InnerConfigBuilder};
use napi::bindgen_prelude::Either3;
use napi_derive::napi;

use crate::config::Config;
use crate::file::{File, FileFormat};

#[derive(Debug)]
struct BoxSource(Box<dyn config::Source + Send + Sync>);

impl config::Source for BoxSource {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        self.0.clone_into_box()
    }
    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        self.0.collect()
    }
    fn collect_to(&self, cache: &mut config::Value) -> Result<(), config::ConfigError> {
        self.0.collect_to(cache)
    }
}

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

    #[napi]
    pub fn default() -> Self {
        Self::new()
    }

    #[napi]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            prefix: Some(prefix),
            ..Default::default()
        }
    }

    #[napi]
    pub fn prefix(&mut self, prefix: String) -> &Self {
        self.prefix = Some(prefix);
        self
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        self.separator = Some(separator);
        self
    }

    #[napi]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.ignore_empty = ignore;
        self
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.keep_prefix = keep;
        self
    }
}

impl Environment {
    pub(crate) fn to_config_source(&self) -> Box<dyn config::Source + Send + Sync> {
        let mut env = if let Some(prefix) = &self.prefix {
            config::Environment::with_prefix(prefix)
        } else {
            config::Environment::default()
        };
        if let Some(sep) = &self.separator {
            env = env.separator(sep);
        }
        env = env.ignore_empty(self.ignore_empty);
        env = env.keep_prefix(self.keep_prefix);
        Box::new(env)
    }
}

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
        let val: config::Value = serde_json::from_value(value)
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
        let val: config::Value = serde_json::from_value(value)
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
            let val: config::Value = serde_json::from_value(v)
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
            self.inner = self
                .inner
                .clone()
                .set_override(&key, val)
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
            Either3::A(f) => {
                self.inner = self.inner.clone().add_source(BoxSource(f.to_config_source()));
            }
            Either3::B(e) => {
                self.inner = self.inner.clone().add_source(BoxSource(e.to_config_source()));
            }
            Either3::C(c) => {
                self.inner = self.inner.clone().add_source(c.inner.clone());
            }
        }
        Ok(self)
    }

    #[napi]
    pub fn add_file(&mut self, file_path: String, format: Option<FileFormat>) -> napi::Result<&Self> {
        let file = File::new(file_path, format);
        self.inner = self.inner.clone().add_source(BoxSource(file.to_config_source()));
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

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }
}
