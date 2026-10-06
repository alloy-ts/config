use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::config::Config;
use crate::json_to_config_value;

/// Represents data specific to builder in default state.
#[napi]
pub struct DefaultState;

/// Represents data specific to builder in asynchronous state.
#[napi]
pub struct AsyncState;

#[napi]
#[derive(Debug, Clone, Copy)]
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
#[derive(Clone)]
pub struct File {
  pub(crate) name: Option<String>,
  pub(crate) content: Option<String>,
  pub(crate) format: Option<FileFormat>,
  pub(crate) required: bool,
}

#[napi]
impl File {
  #[napi(factory)]
  pub fn with_name(name: String) -> Self {
    Self {
      name: Some(name),
      content: None,
      format: None,
      required: true,
    }
  }

  #[napi(factory)]
  pub fn from_str(content: String, format: FileFormat) -> Self {
    Self {
      name: None,
      content: Some(content),
      format: Some(format),
      required: true,
    }
  }

  #[napi]
  pub fn required(&mut self, required: bool) -> &Self {
    self.required = required;
    self
  }

  #[napi]
  pub fn format(&mut self, format: FileFormat) -> &Self {
    self.format = Some(format);
    self
  }
}

#[napi]
#[derive(Clone)]
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

/// A configuration builder
#[napi]
pub struct ConfigBuilder {
  pub(crate) inner: Option<::config::ConfigBuilder<::config::builder::DefaultState>>,
}

#[napi]
impl ConfigBuilder {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Some(::config::Config::builder()),
    }
  }

  #[napi]
  pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
    if let Some(builder) = self.inner.take() {
      let config_val = json_to_config_value(value)?;
      let updated = builder
        .set_default(&key, config_val)
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
      self.inner = Some(updated);
      Ok(self)
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }

  #[napi]
  pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
    if let Some(builder) = self.inner.take() {
      let config_val = json_to_config_value(value)?;
      let updated = builder
        .set_override(&key, config_val)
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
      self.inner = Some(updated);
      Ok(self)
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }

  #[napi]
  pub fn set_override_option(&mut self, key: String, value: Option<serde_json::Value>) -> napi::Result<&Self> {
    if let Some(builder) = self.inner.take() {
      let config_val = match value {
        Some(v) => Some(json_to_config_value(v)?),
        None => None,
      };
      let updated = builder
        .set_override_option(&key, config_val)
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
      self.inner = Some(updated);
      Ok(self)
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }

  #[napi]
  pub fn add_source(&mut self, source: Either3<&File, &Environment, String>) -> napi::Result<&Self> {
    if let Some(builder) = self.inner.take() {
      let updated = match source {
        Either3::A(file) => {
          if let Some(ref name) = file.name {
            let mut config_file = ::config::File::with_name(name).required(file.required);
            if let Some(fmt) = file.format {
              let file_fmt: ::config::FileFormat = fmt.into();
              config_file = config_file.format(file_fmt);
            }
            builder.add_source(config_file)
          } else if let Some(ref content) = file.content {
            let fmt = file.format.unwrap_or(FileFormat::Json);
            let file_fmt: ::config::FileFormat = fmt.into();
            let config_file = ::config::File::from_str(content, file_fmt).required(file.required);
            builder.add_source(config_file)
          } else {
            builder
          }
        }
        Either3::B(env) => {
          let mut config_env = if let Some(ref prefix) = env.prefix {
            ::config::Environment::with_prefix(prefix)
          } else {
            ::config::Environment::default()
          };
          if let Some(ref sep) = env.separator {
            config_env = config_env.separator(sep);
          }
          config_env = config_env.ignore_empty(env.ignore_empty);
          config_env = config_env.keep_prefix(env.keep_prefix);
          builder.add_source(config_env)
        }
        Either3::C(name) => {
          builder.add_source(::config::File::with_name(&name))
        }
      };
      self.inner = Some(updated);
      Ok(self)
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }

  #[napi]
  pub fn add_async_source(&mut self, source: Either3<&File, &Environment, String>) -> napi::Result<&Self> {
    self.add_source(source)
  }

  #[napi]
  pub fn build(&mut self) -> napi::Result<Config> {
    if let Some(builder) = self.inner.take() {
      let config = builder
        .build()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
      Ok(Config { inner: config })
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }

  #[napi]
  pub fn build_cloned(&self) -> napi::Result<Config> {
    if let Some(ref builder) = self.inner {
      let config = builder
        .build_cloned()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
      Ok(Config { inner: config })
    } else {
      Err(napi::Error::from_reason("ConfigBuilder has already been consumed"))
    }
  }
}
