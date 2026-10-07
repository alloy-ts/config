use napi::bindgen_prelude::Either;
use napi_derive::napi;

use crate::config::Config;
use crate::file::{File, FileFormat};
use crate::value::json_to_config_value;

#[derive(Clone, Debug, Default)]
pub struct DefaultState;

#[derive(Clone, Debug, Default)]
pub struct AsyncState;

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
    pub fn default() -> Self {
        Self {
            prefix: None,
            separator: None,
            ignore_empty: false,
            keep_prefix: false,
        }
    }

    #[napi(factory, js_name = "withPrefix")]
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

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.ignore_empty = ignore;
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.keep_prefix = keep;
        self
    }
}

impl config::Source for Environment {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        let mut env = config::Environment::default();
        if let Some(prefix) = &self.prefix {
            env = env.prefix(prefix);
        }
        if let Some(separator) = &self.separator {
            env = env.separator(separator);
        }
        if self.ignore_empty {
            env = env.ignore_empty(true);
        }
        if self.keep_prefix {
            env = env.keep_prefix(true);
        }
        env.collect()
    }
}

/// A configuration builder
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigBuilder {
    pub(crate) inner: config::ConfigBuilder<config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: config::ConfigBuilder::default(),
        }
    }

    #[napi(js_name = "setDefault")]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
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
            let val = json_to_config_value(v)?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> napi::Result<&Self> {
        match source {
            Either::A(file) => {
                self.inner = self.inner.clone().add_source((*file).clone());
            }
            Either::B(env) => {
                self.inner = self.inner.clone().add_source((*env).clone());
            }
        }
        Ok(self)
    }

    #[napi(js_name = "addFile")]
    pub fn add_file(&mut self, file_path: String, format: Option<FileFormat>) -> napi::Result<&Self> {
        let file = File::new(file_path, format);
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
