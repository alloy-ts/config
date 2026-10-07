use config::{
    builder::DefaultState as InnerDefaultState,
    ConfigBuilder as InnerConfigBuilder, ConfigError, Source, Value as InnerValue,
};
use napi::Either;
use napi_derive::napi;

use crate::config::Config;

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

pub(crate) fn parse_file_format(fmt: Either<FileFormat, String>) -> napi::Result<::config::FileFormat> {
    match fmt {
        Either::A(f) => Ok(f.into()),
        Either::B(s) => match s.to_lowercase().as_str() {
            "json" => Ok(::config::FileFormat::Json),
            "toml" => Ok(::config::FileFormat::Toml),
            "yaml" | "yml" => Ok(::config::FileFormat::Yaml),
            "ini" => Ok(::config::FileFormat::Ini),
            "ron" => Ok(::config::FileFormat::Ron),
            "json5" => Ok(::config::FileFormat::Json5),
            other => Err(napi::Error::from_reason(format!("Unsupported file format: {}", other))),
        },
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) inner_name: Option<::config::File<::config::FileSourceFile, ::config::FileFormat>>,
    pub(crate) inner_str: Option<::config::File<::config::FileSourceString, ::config::FileFormat>>,
}

#[napi]
impl File {
    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(content: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        let inner = ::config::File::from_str(&content, fmt);
        Ok(Self {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory)]
    pub fn new(name: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        let inner = ::config::File::new(&name, fmt);
        Ok(Self {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name(name: String) -> Self {
        let inner = ::config::File::with_name(&name);
        Self {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.required(required));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.required(required));
        }
        self
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let fmt = parse_file_format(format)?;
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.format(fmt));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.format(fmt));
        }
        Ok(self)
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct Environment {
    pub(crate) inner: ::config::Environment,
}

#[napi]
impl Environment {
    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: ::config::Environment::with_prefix(&prefix),
        }
    }

    #[napi(factory)]
    pub fn default() -> Self {
        Self {
            inner: ::config::Environment::default(),
        }
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner.separator(&separator);
        self
    }

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner.ignore_empty(ignore);
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner.keep_prefix(keep);
        self
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

    #[napi(js_name = "setDefault")]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: InnerValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: InnerValue = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
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
            let val: InnerValue = serde_json::from_value(v)
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi(js_name = "addFile")]
    pub fn add_file(&mut self, file_path: String, format: Option<Either<FileFormat, String>>) -> napi::Result<&Self> {
        let file = if let Some(fmt) = format {
            File::new(file_path, fmt)?
        } else {
            File::with_name(file_path)
        };
        self.add_file_source(&file);
        Ok(self)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source(
        &mut self,
        source: Either<&File, &Environment>,
    ) -> napi::Result<&Self> {
        match source {
            Either::A(f) => {
                self.add_file_source(f);
            }
            Either::B(e) => {
                self.inner = self.inner.clone().add_source(e.inner.clone());
            }
        }
        Ok(self)
    }

    fn add_file_source(&mut self, file: &File) {
        if let Some(ref inner_file) = file.inner_name {
            self.inner = self.inner.clone().add_source(inner_file.clone());
        } else if let Some(ref inner_str) = file.inner_str {
            self.inner = self.inner.clone().add_source(inner_str.clone());
        }
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let inner_config = self
            .inner
            .clone()
            .build()
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

impl ConfigBuilder {
    pub fn set_default_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<InnerValue>,
    {
        self.inner = self.inner.set_default(key, value)?;
        Ok(self)
    }

    pub fn set_override_rust<S, T>(mut self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<InnerValue>,
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
