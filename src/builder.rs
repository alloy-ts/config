use config::{
    builder::DefaultState as InnerDefaultState, ConfigBuilder as InnerConfigBuilder, ConfigError,
    Environment as InnerEnvironment, Source, Value,
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
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileFormat {
    Toml,
    Json,
    Yaml,
    Ini,
    Ron,
    Json5,
}

impl From<FileFormat> for ::config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Toml => ::config::FileFormat::Toml,
            FileFormat::Json => ::config::FileFormat::Json,
            FileFormat::Yaml => ::config::FileFormat::Yaml,
            FileFormat::Ini => ::config::FileFormat::Ini,
            FileFormat::Ron => ::config::FileFormat::Ron,
            FileFormat::Json5 => ::config::FileFormat::Json5,
        }
    }
}

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Environment {
    pub(crate) inner: InnerEnvironment,
}

#[napi]
impl Environment {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi(factory, js_name = "with_prefix")]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: InnerEnvironment::with_prefix(&prefix),
        }
    }

    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix_camel(prefix: String) -> Self {
        Self::with_prefix(prefix)
    }

    #[napi(factory)]
    pub fn default() -> Self {
        Self {
            inner: InnerEnvironment::default(),
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

impl Source for Environment {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> std::result::Result<config::Map<String, Value>, ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut Value) -> std::result::Result<(), ConfigError> {
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

    #[napi]
    pub fn add_file_source(&mut self, file: &File) -> &Self {
        self.inner = self.inner.clone().add_source(file.clone());
        self
    }

    #[napi]
    pub fn add_env_source(&mut self, env: &Environment) -> &Self {
        self.inner = self.inner.clone().add_source(env.clone());
        self
    }

    #[napi]
    pub fn add_config_source(&mut self, cfg: &Config) -> &Self {
        self.inner = self.inner.clone().add_source(cfg.clone());
        self
    }

    #[napi(ts_args_type = "source: File | Environment | Config")]
    pub fn add_source(&mut self, file: &File) -> &Self {
        self.add_file_source(file)
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

impl ConfigBuilder {
    pub fn set_default_rust<S, T>(mut self, key: S, value: T) -> std::result::Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
    {
        self.inner = self.inner.set_default(key, value)?;
        Ok(self)
    }

    pub fn set_override_rust<S, T>(mut self, key: S, value: T) -> std::result::Result<Self, ConfigError>
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
