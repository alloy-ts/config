use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::Deserialize;

use crate::config::Config;

#[napi(string_enum)]
#[derive(Clone, Debug, Copy)]
pub enum FileFormat {
    Toml,
    Json,
    Yaml,
    Ini,
    Ron,
    Json5,
}

impl From<FileFormat> for config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Yaml => config::FileFormat::Yaml,
            FileFormat::Ini => config::FileFormat::Ini,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Json5 => config::FileFormat::Json5,
        }
    }
}

#[derive(Clone, Debug)]
pub(crate) enum FileSourceKind {
    File(config::File<config::FileSourceFile, config::FileFormat>),
    Str(config::File<config::FileSourceString, config::FileFormat>),
}

impl config::Source for FileSourceKind {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        match self {
            FileSourceKind::File(f) => f.clone_into_box(),
            FileSourceKind::Str(f) => f.clone_into_box(),
        }
    }

    fn collect(&self) -> std::result::Result<config::Map<String, config::Value>, config::ConfigError> {
        match self {
            FileSourceKind::File(f) => f.collect(),
            FileSourceKind::Str(f) => f.collect(),
        }
    }
}

#[napi]
#[derive(Clone)]
pub struct File {
    pub(crate) inner: FileSourceKind,
}

#[napi]
impl File {
    #[napi(factory)]
    pub fn with_name(
        name: String,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: Option<FileFormat>,
    ) -> Self {
        if let Some(fmt) = format {
            let f = config::File::with_name(&name).format(fmt.into());
            Self {
                inner: FileSourceKind::File(f),
            }
        } else {
            let f = config::File::with_name(&name);
            Self {
                inner: FileSourceKind::File(f),
            }
        }
    }

    #[napi(factory)]
    pub fn from_str(
        text: String,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: FileFormat,
    ) -> Self {
        let f: config::File<config::FileSourceString, config::FileFormat> =
            config::File::from_str(&text, format.into());
        Self {
            inner: FileSourceKind::Str(f),
        }
    }

    #[napi(factory)]
    pub fn from_filename(filename: String) -> Self {
        let f = config::File::with_name(&filename);
        Self {
            inner: FileSourceKind::File(f),
        }
    }
}

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
