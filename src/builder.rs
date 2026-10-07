use config::{
    builder::DefaultState as InnerDefaultState,
    ConfigBuilder as InnerConfigBuilder, ConfigError, Map, Source, Value as ConfigValue, Value,
};
use napi_derive::napi;

use crate::config::Config;
use crate::file::File;

/// Represents data specific to builder in default state.
#[napi]
pub struct DefaultState;

/// Represents data specific to builder in asynchronous state.
#[napi]
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
    #[napi(factory)]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            prefix: Some(prefix),
            separator: None,
            ignore_empty: false,
            keep_prefix: false,
        }
    }

    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix_camel(prefix: String) -> Self {
        Self::with_prefix(prefix)
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

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty_camel(&mut self, ignore: bool) -> &Self {
        self.ignore_empty(ignore)
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.keep_prefix = keep;
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix_camel(&mut self, keep: bool) -> &Self {
        self.keep_prefix(keep)
    }
}

impl Source for Environment {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<Map<String, ConfigValue>, ConfigError> {
        let mut env = ::config::Environment::default();
        if let Some(ref p) = self.prefix {
            env = env.prefix(p);
        }
        if let Some(ref s) = self.separator {
            env = env.separator(s);
        }
        if self.ignore_empty {
            env = env.ignore_empty(true);
        }
        if self.keep_prefix {
            env = env.keep_prefix(true);
        }
        env.collect()
    }

    fn collect_to(&self, cache: &mut ConfigValue) -> Result<(), ConfigError> {
        let mut env = ::config::Environment::default();
        if let Some(ref p) = self.prefix {
            env = env.prefix(p);
        }
        if let Some(ref s) = self.separator {
            env = env.separator(s);
        }
        if self.ignore_empty {
            env = env.ignore_empty(true);
        }
        if self.keep_prefix {
            env = env.keep_prefix(true);
        }
        env.collect_to(cache)
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

    #[napi]
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

    #[napi(js_name = "setDefault")]
    pub fn set_default_camel(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        self.set_default(key, value)
    }

    #[napi]
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

    #[napi(js_name = "setOverride")]
    pub fn set_override_camel(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        self.set_override(key, value)
    }

    #[napi]
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

    #[napi(js_name = "setOverrideOption")]
    pub fn set_override_option_camel(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        self.set_override_option(key, value)
    }

    #[napi]
    pub fn add_file(&mut self, file_path: String, format: Option<serde_json::Value>) -> napi::Result<&Self> {
        let file = File::new(file_path, format)?;
        self.inner = self.inner.clone().add_source(file);
        Ok(self)
    }

    #[napi(js_name = "addFile")]
    pub fn add_file_camel(&mut self, file_path: String, format: Option<serde_json::Value>) -> napi::Result<&Self> {
        self.add_file(file_path, format)
    }

    #[napi]
    pub fn add_source(&mut self, source: napi::bindgen_prelude::Either<&File, &Environment>) -> &Self {
        match source {
            napi::bindgen_prelude::Either::A(f) => {
                self.inner = self.inner.clone().add_source(f.clone());
            }
            napi::bindgen_prelude::Either::B(e) => {
                self.inner = self.inner.clone().add_source(e.clone());
            }
        }
        self
    }

    #[napi(js_name = "addSource")]
    pub fn add_source_camel(&mut self, source: napi::bindgen_prelude::Either<&File, &Environment>) -> &Self {
        self.add_source(source)
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

    #[napi(js_name = "buildCloned")]
    pub fn build_cloned_camel(&self) -> napi::Result<Config> {
        self.build_cloned()
    }
}

impl ConfigBuilder {
    pub fn set_default_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
    {
        self.inner = self.inner.set_default(key, value)?;
        Ok(self)
    }

    pub fn set_override_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
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
