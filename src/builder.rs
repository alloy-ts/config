use config::{
    builder::DefaultState as InnerDefaultState, ConfigBuilder as InnerConfigBuilder, ConfigError,
    Map, Source, Value as ConfigValue,
};
use napi::bindgen_prelude::Either;
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

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.keep_prefix = keep;
        self
    }
}

impl Source for Environment {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<Map<String, ConfigValue>, ConfigError> {
        let mut env = ::config::Environment::default();
        if let Some(ref prefix) = self.prefix {
            env = env.prefix(prefix);
        }
        if let Some(ref separator) = self.separator {
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

    fn collect_to(&self, cache: &mut ConfigValue) -> Result<(), ConfigError> {
        let mut env = ::config::Environment::default();
        if let Some(ref prefix) = self.prefix {
            env = env.prefix(prefix);
        }
        if let Some(ref separator) = self.separator {
            env = env.separator(separator);
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
        let val: ConfigValue = serde_json::from_value(value)
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
        let val: ConfigValue = serde_json::from_value(value)
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
            let val: ConfigValue = serde_json::from_value(v)
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
    pub fn set_default_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<ConfigValue>,
    {
        self.inner = self.inner.set_default(key, value)?;
        Ok(self)
    }

    pub fn set_override_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<ConfigValue>,
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
