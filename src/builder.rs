use config::builder::DefaultState as InnerDefaultState;
use config::ConfigBuilder as InnerConfigBuilder;
use napi::Either;
use napi_derive::napi;

use crate::config::Config;
use crate::file::File;
use crate::json_to_config_value;
use crate::to_napi_err;
use crate::BoxedSource;

/// A configuration builder.
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
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_default(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi(js_name = "setDefault")]
    pub fn set_default_camel(
        &mut self,
        key: String,
        value: serde_json::Value,
    ) -> napi::Result<&Self> {
        self.set_default(key, value)
    }

    #[napi]
    pub fn set_override(&mut self, key: String, value: serde_json::Value) -> napi::Result<&Self> {
        let val = json_to_config_value(value)?;
        self.inner = self
            .inner
            .clone()
            .set_override(&key, val)
            .map_err(to_napi_err)?;
        Ok(self)
    }

    #[napi(js_name = "setOverride")]
    pub fn set_override_camel(
        &mut self,
        key: String,
        value: serde_json::Value,
    ) -> napi::Result<&Self> {
        self.set_override(key, value)
    }

    #[napi]
    pub fn set_override_option(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        if let Some(v) = value {
            let val = json_to_config_value(v)?;
            self.inner = self
                .inner
                .clone()
                .set_override_option(&key, Some(val))
                .map_err(to_napi_err)?;
        }
        Ok(self)
    }

    #[napi(js_name = "setOverrideOption")]
    pub fn set_override_option_camel(
        &mut self,
        key: String,
        value: Option<serde_json::Value>,
    ) -> napi::Result<&Self> {
        self.set_override_option(key, value)
    }

    #[napi]
    pub fn add_source(
        &mut self,
        source: Either<Either<&File, &Environment>, &Config>,
    ) -> napi::Result<&Self> {
        let boxed = match source {
            Either::A(Either::A(file)) => file.into_config_source()?,
            Either::A(Either::B(env)) => env.into_config_source(),
            Either::B(config) => BoxedSource(Box::new(config.inner.clone())),
        };
        self.inner = self.inner.clone().add_source(boxed);
        Ok(self)
    }

    #[napi(js_name = "addSource")]
    pub fn add_source_camel(
        &mut self,
        source: Either<Either<&File, &Environment>, &Config>,
    ) -> napi::Result<&Self> {
        self.add_source(source)
    }

    #[napi]
    pub fn build(&self) -> napi::Result<Config> {
        let inner = self.inner.clone().build_cloned().map_err(to_napi_err)?;
        Ok(Config::new(inner))
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<Config> {
        let inner = self.inner.clone().build_cloned().map_err(to_napi_err)?;
        Ok(Config::new(inner))
    }

    #[napi(js_name = "buildCloned")]
    pub fn build_cloned_camel(&self) -> napi::Result<Config> {
        self.build_cloned()
    }
}

/// An environment-variable configuration source.
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
            separator: None,
            ignore_empty: false,
            keep_prefix: false,
        }
    }

    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix_camel(prefix: String) -> Self {
        Self::with_prefix(prefix)
    }

    #[napi(factory)]
    pub fn default_env() -> Self {
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

    #[napi]
    pub fn ignore_empty(&mut self, ignore_empty: bool) -> &Self {
        self.ignore_empty = ignore_empty;
        self
    }

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty_camel(&mut self, ignore_empty: bool) -> &Self {
        self.ignore_empty(ignore_empty)
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep_prefix: bool) -> &Self {
        self.keep_prefix = keep_prefix;
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix_camel(&mut self, keep_prefix: bool) -> &Self {
        self.keep_prefix(keep_prefix)
    }

    pub(crate) fn into_config_source(&self) -> BoxedSource {
        let mut env = config::Environment::default();
        if let Some(p) = &self.prefix {
            env = env.prefix(p);
        }
        if let Some(s) = &self.separator {
            env = env.separator(s);
        }
        env = env.ignore_empty(self.ignore_empty);
        env = env.keep_prefix(self.keep_prefix);
        BoxedSource(Box::new(env))
    }
}
