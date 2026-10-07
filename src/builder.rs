use napi::bindgen_prelude::Either3;
use napi_derive::napi;

use crate::file::{File, FileFormat};
use crate::value::Value;

#[napi]
#[derive(Default, Clone)]
pub struct ConfigBuilder {
    pub(crate) inner: config::ConfigBuilder<config::builder::DefaultState>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: config::Config::builder(),
        }
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let cfg_val = crate::value::js_value_to_config_value(value);
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder
            .set_default(&key, cfg_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let cfg_val = crate::value::js_value_to_config_value(value);
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder
            .set_override(&key, cfg_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        if let Some(val) = value {
            let cfg_val = crate::value::js_value_to_config_value(val);
            let builder = std::mem::take(&mut self.inner);
            self.inner = builder
                .set_override(&key, cfg_val)
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        Ok(self)
    }

    #[napi]
    pub fn add_source(
        &mut self,
        source: Either3<&File, &Environment, &Value>,
    ) -> napi::Result<&Self> {
        match source {
            Either3::A(file) => {
                if let Some(ref content) = file.source_str {
                    let fmt: config::FileFormat = file.format.unwrap_or(FileFormat::Json).into();
                    let f = config::File::from_str(content, fmt).required(file.required);
                    let builder = std::mem::take(&mut self.inner);
                    self.inner = builder.add_source(f);
                } else if let Some(ref name) = file.name {
                    let mut f = config::File::with_name(name).required(file.required);
                    if let Some(fmt) = file.format {
                        f = f.format(fmt.into());
                    }
                    let builder = std::mem::take(&mut self.inner);
                    self.inner = builder.add_source(f);
                }
            }
            Either3::B(env) => {
                let mut e = config::Environment::default();
                if let Some(ref p) = env.prefix {
                    e = e.prefix(p);
                }
                if let Some(ref s) = env.separator {
                    e = e.separator(s);
                }
                e = e.ignore_empty(env.ignore_empty);
                e = e.keep_prefix(env.keep_prefix);
                let builder = std::mem::take(&mut self.inner);
                self.inner = builder.add_source(e);
            }
            Either3::C(val) => {
                if let Ok(json) = val.inner.clone().try_deserialize::<serde_json::Value>() {
                    if let Ok(cfg_source) = config::Config::try_from(&json) {
                        let builder = std::mem::take(&mut self.inner);
                        self.inner = builder.add_source(cfg_source);
                    }
                }
            }
        }
        Ok(self)
    }

    #[napi]
    pub fn add_async_source(
        &mut self,
        source: Either3<&File, &Environment, &Value>,
    ) -> napi::Result<&Self> {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<crate::config::Config> {
        let cfg = self
            .inner
            .clone()
            .build()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(crate::config::Config { inner: cfg })
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<crate::config::Config> {
        self.build()
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

    #[napi(factory)]
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
