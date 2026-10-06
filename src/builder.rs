use napi::bindgen_prelude::*;
use napi_derive::napi;

#[napi]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileFormat {
    Ini,
    Json,
    Json5,
    Ron,
    Toml,
    Yaml,
}

impl From<FileFormat> for config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Ini => config::FileFormat::Ini,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Json5 => config::FileFormat::Json5,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Yaml => config::FileFormat::Yaml,
        }
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) name: Option<String>,
    pub(crate) text: Option<String>,
    pub(crate) format: Option<FileFormat>,
    pub(crate) required: bool,
}

#[napi]
impl File {
    #[napi(factory)]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi(factory)]
    pub fn from_str(text: String, format: FileFormat) -> Self {
        Self {
            name: None,
            text: Some(text),
            format: Some(format),
            required: true,
        }
    }

    #[napi(constructor)]
    pub fn new(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name_or_text),
            text: None,
            format,
            required: true,
        }
    }

    #[napi]
    pub fn format(&mut self, format: FileFormat) -> Self {
        let mut c = self.clone();
        c.format = Some(format);
        c
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> Self {
        let mut c = self.clone();
        c.required = required;
        c
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
    pub fn prefix(&mut self, prefix: String) -> Self {
        let mut c = self.clone();
        c.prefix = Some(prefix);
        c
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> Self {
        let mut c = self.clone();
        c.separator = Some(separator);
        c
    }

    #[napi]
    pub fn ignore_empty(&mut self, ignore: bool) -> Self {
        let mut c = self.clone();
        c.ignore_empty = ignore;
        c
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> Self {
        let mut c = self.clone();
        c.keep_prefix = keep;
        c
    }
}

impl Environment {
    pub fn build_source(&self) -> config::Environment {
        let mut env = config::Environment::default();
        if let Some(prefix) = &self.prefix {
            env = env.prefix(prefix);
        }
        if let Some(sep) = &self.separator {
            env = env.separator(sep);
        }
        env = env.ignore_empty(self.ignore_empty);
        env = env.keep_prefix(self.keep_prefix);
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
        Self {
            inner: config::Config::builder(),
        }
    }

    #[napi]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner
            .set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val: config::Value = serde_json::from_value(value)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner
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
        let val_opt: Option<config::Value> = match value {
            Some(v) => Some(serde_json::from_value(v).map_err(|e| napi::Error::from_reason(e.to_string()))?),
            None => None,
        };
        let inner = std::mem::take(&mut self.inner);
        self.inner = inner
            .set_override_option(&key, val_opt)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn add_source(
        &mut self,
        source: Either<&File, &Environment>,
    ) -> napi::Result<&Self> {
        let inner = std::mem::take(&mut self.inner);
        match source {
            Either::A(file) => {
                if let Some(text) = &file.text {
                    let fmt = file.format.map(Into::into).unwrap_or(config::FileFormat::Json);
                    let f = config::File::from_str(text, fmt).required(file.required);
                    self.inner = inner.add_source(f);
                } else if let Some(name) = &file.name {
                    let mut f = config::File::with_name(name).required(file.required);
                    if let Some(fmt) = file.format {
                        f = f.format(fmt.into());
                    }
                    self.inner = inner.add_source(f);
                } else {
                    let f = config::File::from_str("", config::FileFormat::Json);
                    self.inner = inner.add_source(f);
                }
            }
            Either::B(env_src) => {
                let src = env_src.build_source();
                self.inner = inner.add_source(src);
            }
        }
        Ok(self)
    }

    #[napi]
    pub fn add_async_source(
        &mut self,
        source: Either<&File, &Environment>,
    ) -> napi::Result<&Self> {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&mut self) -> napi::Result<crate::config::Config> {
        let inner = std::mem::take(&mut self.inner);
        let config = inner.build().map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(crate::config::Config { inner: config })
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<crate::config::Config> {
        let config = self.inner
            .build_cloned()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(crate::config::Config { inner: config })
    }
}
