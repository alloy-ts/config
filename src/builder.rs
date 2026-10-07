use napi_derive::napi;
use napi::bindgen_prelude::*;
use config::Source;

use crate::config::Config;
use crate::file::{File, FileFormat};
use crate::value::json_to_config_value;

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

    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            prefix: Some(prefix),
            ..Default::default()
        }
    }

    #[napi(factory, js_name = "default")]
    pub fn default_factory() -> Self {
        Self::default()
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

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.ignore_empty = ignore;
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.keep_prefix = keep;
        self
    }
}

impl Source for Environment {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> std::result::Result<config::Map<String, config::Value>, config::ConfigError> {
        let mut env_src = config::Environment::default();
        if let Some(prefix) = &self.prefix {
            env_src = env_src.prefix(prefix);
        }
        if let Some(sep) = &self.separator {
            env_src = env_src.separator(sep);
        }
        env_src = env_src.ignore_empty(self.ignore_empty);
        env_src = env_src.keep_prefix(self.keep_prefix);
        env_src.collect()
    }
}

#[derive(Debug, Clone)]
enum SourceType {
    File(File),
    Environment(Environment),
}

/// A configuration builder
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigBuilder {
    defaults: Vec<(String, config::Value)>,
    overrides: Vec<(String, config::Value)>,
    sources: Vec<SourceType>,
}

#[napi]
impl ConfigBuilder {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    #[napi(js_name = "setDefault")]
    pub fn set_default(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(&value)?;
        self.defaults.push((key, val));
        Ok(self)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(&value)?;
        self.overrides.push((key, val));
        Ok(self)
    }

    #[napi(js_name = "setOverrideOption")]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        if let Some(v) = value {
            let val = json_to_config_value(&v)?;
            self.overrides.push((key, val));
        }
        Ok(self)
    }

    #[napi(js_name = "addFile")]
    pub fn add_file(&mut self, file_path: String, format: Option<String>) -> napi::Result<&Self> {
        let fmt = format.map(FileFormat::from);
        let file = File::new(file_path, fmt);
        self.sources.push(SourceType::File(file));
        Ok(self)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source(&mut self, source: Either<&File, &Environment>) -> napi::Result<&Self> {
        match source {
            Either::A(file) => self.sources.push(SourceType::File(file.clone())),
            Either::B(env) => self.sources.push(SourceType::Environment(env.clone())),
        }
        Ok(self)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        self.build_cloned()
    }

    #[napi(js_name = "buildCloned")]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let mut builder = config::Config::builder();
        for (k, v) in &self.defaults {
            builder = builder
                .set_default(k, v.clone())
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        for source in &self.sources {
            match source {
                SourceType::File(f) => {
                    builder = builder.add_source(f.clone());
                }
                SourceType::Environment(e) => {
                    builder = builder.add_source(e.clone());
                }
            }
        }
        for (k, v) in &self.overrides {
            builder = builder
                .set_override(k, v.clone())
                .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        }
        let inner_config = builder
            .build()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Config::new(inner_config))
    }
}
