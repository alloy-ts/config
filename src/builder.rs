use napi_derive::napi;
use serde_json::Value as JsonValue;

#[path = "file.rs"]
pub(crate) mod file;

pub use file::*;

use crate::config::Config;
use crate::value::{to_napi_err, Value};

#[derive(Clone, Debug)]
pub struct ValueSource(pub config::Value);

impl config::Source for ValueSource {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        self.0.clone().into_table()
    }
}

#[napi]
#[derive(Clone, Debug, Default)]
pub struct Environment {
    pub(crate) inner: config::Environment,
}

#[napi]
impl Environment {
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

    #[napi(factory)]
    pub fn with_prefix_and_default(prefix: String, default: String) -> Self {
        let mut env = config::Environment::with_prefix(&prefix);
        if !default.is_empty() {
            env = env.separator(&default);
        }
        Self { inner: env }
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

    #[napi]
    pub fn try_parsing(&mut self, try_parse: bool) -> &Self {
        self.inner = self.inner.clone().try_parsing(try_parse);
        self
    }

    #[napi]
    pub fn list_separator(&mut self, separator: String) -> &Self {
        self.inner = self.inner.clone().list_separator(&separator);
        self
    }
}

#[napi]
#[derive(Default, Debug, Clone)]
pub struct ConfigBuilder {
    pub(crate) inner: config::ConfigBuilder<config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val: config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: JsonValue) -> napi::Result<&Self> {
        let val: config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<JsonValue>,
    ) -> napi::Result<&Self> {
        let val_opt: Option<config::Value> = match value {
            Some(v) => Some(
                serde_json::from_value(v)
                    .map_err(|e| napi::Error::from_reason(e.to_string()))?,
            ),
            None => None,
        };
        self.inner = self
            .inner
            .clone()
            .set_override_option(&key, val_opt)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi]
    pub fn add_source(
        &mut self,
        source: napi::bindgen_prelude::Either3<&File, &Environment, &Value>,
    ) -> napi::Result<&Self> {
        match source {
            napi::bindgen_prelude::Either3::A(file) => match &file.source_type {
                FileSourceType::Name(name, fmt_opt) => {
                    let mut f = config::File::with_name(name).required(file.required);
                    if let Some(fmt) = fmt_opt {
                        let fmt_config: config::FileFormat = (*fmt).into();
                        f = f.format(fmt_config);
                    }
                    self.inner = self.inner.clone().add_source(f);
                }
                FileSourceType::New(name, fmt) => {
                    let fmt_config: config::FileFormat = (*fmt).into();
                    let f = config::File::new(name, fmt_config).required(file.required);
                    self.inner = self.inner.clone().add_source(f);
                }
                FileSourceType::String(str_data, fmt) => {
                    let fmt_config: config::FileFormat = (*fmt).into();
                    let f = config::File::from_str(str_data, fmt_config).required(file.required);
                    self.inner = self.inner.clone().add_source(f);
                }
            },
            napi::bindgen_prelude::Either3::B(env) => {
                self.inner = self.inner.clone().add_source(env.inner.clone());
            }
            napi::bindgen_prelude::Either3::C(val) => {
                self.inner = self.inner.clone().add_source(ValueSource(val.inner.clone()));
            }
        }
        Ok(self)
    }

    #[napi]
    pub fn add_async_source(
        &mut self,
        source: napi::bindgen_prelude::Either3<&File, &Environment, &Value>,
    ) -> napi::Result<&Self> {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&mut self) -> napi::Result<Config> {
        let cfg = self.inner.clone().build().map_err(to_napi_err)?;
        Ok(Config { inner: cfg })
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let cfg = self.inner.build_cloned().map_err(to_napi_err)?;
        Ok(Config { inner: cfg })
    }
}
