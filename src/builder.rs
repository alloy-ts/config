use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::file::{File, FileFormat};

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
    Environment {
      prefix: Some(prefix),
      separator: None,
      ignore_empty: false,
      keep_prefix: false,
    }
  }

  #[napi(factory)]
  pub fn default() -> Self {
    <Self as Default>::default()
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

impl From<&Environment> for config::Environment {
  fn from(e: &Environment) -> Self {
    let mut env = config::Environment::default();
    if let Some(prefix) = &e.prefix {
      env = env.prefix(prefix);
    }
    if let Some(sep) = &e.separator {
      env = env.separator(sep);
    }
    env = env.ignore_empty(e.ignore_empty);
    env = env.keep_prefix(e.keep_prefix);
    env
  }
}

#[napi]
#[derive(Default)]
pub struct ConfigBuilder {
  pub(crate) inner: config::ConfigBuilder<config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
  #[napi(constructor)]
  pub fn new() -> Self {
    ConfigBuilder {
      inner: config::ConfigBuilder::default(),
    }
  }

  #[napi]
  pub fn set_default(&mut self, key: String, value: serde_json::Value) -> Result<&Self> {
    let config_val: config::Value = serde_json::from_value(value)
      .map_err(|e| Error::new(Status::InvalidArg, e.to_string()))?;
    let inner = std::mem::take(&mut self.inner);
    self.inner = inner
      .set_default(&key, config_val)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(self)
  }

  #[napi]
  pub fn set_override(&mut self, key: String, value: serde_json::Value) -> Result<&Self> {
    let config_val: config::Value = serde_json::from_value(value)
      .map_err(|e| Error::new(Status::InvalidArg, e.to_string()))?;
    let inner = std::mem::take(&mut self.inner);
    self.inner = inner
      .set_override(&key, config_val)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(self)
  }

  #[napi]
  pub fn set_override_option(&mut self, key: String, value: Option<serde_json::Value>) -> Result<&Self> {
    if let Some(v) = value {
      self.set_override(key, v)
    } else {
      Ok(self)
    }
  }

  #[napi]
  pub fn add_file(&mut self, file: &File) -> Result<&Self> {
    let inner = std::mem::take(&mut self.inner);
    if let Some(content) = &file.content {
      let fmt: config::FileFormat = file.format.unwrap_or(FileFormat::Json).into();
      let cfg_file = config::File::from_str(content, fmt).required(file.required);
      self.inner = inner.add_source(cfg_file);
    } else if let Some(name) = &file.name {
      let mut cfg_file = config::File::with_name(name).required(file.required);
      if let Some(fmt) = file.format {
        let cfg_fmt: config::FileFormat = fmt.into();
        cfg_file = cfg_file.format(cfg_fmt);
      }
      self.inner = inner.add_source(cfg_file);
    }
    Ok(self)
  }

  #[napi]
  pub fn add_environment(&mut self, env: &Environment) -> Result<&Self> {
    let cfg_env = config::Environment::from(env);
    let inner = std::mem::take(&mut self.inner);
    self.inner = inner.add_source(cfg_env);
    Ok(self)
  }

  #[napi]
  pub fn add_source(&mut self, source: Either<&File, &Environment>) -> Result<&Self> {
    match source {
      Either::A(file) => self.add_file(file),
      Either::B(env) => self.add_environment(env),
    }
  }

  #[napi]
  pub fn build(&mut self) -> Result<crate::config::Config> {
    let inner = std::mem::take(&mut self.inner);
    let cfg = inner
      .build()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(crate::config::Config { inner: cfg })
  }

  #[napi]
  pub fn build_cloned(&self) -> Result<crate::config::Config> {
    let cfg = self
      .inner
      .build_cloned()
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(crate::config::Config { inner: cfg })
  }
}
