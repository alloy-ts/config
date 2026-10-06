use config::{AsyncSource, ConfigError, Source, Value};

use crate::config::Config;

pub use config::builder::{AsyncState, ConfigBuilder as InnerConfigBuilder, DefaultState};

/// Represents [`ConfigBuilder`] state.
pub trait BuilderState: config::builder::BuilderState {}

impl BuilderState for DefaultState {}
impl BuilderState for AsyncState {}

/// A configuration builder
#[derive(Debug, Clone, Default)]
#[must_use]
pub struct ConfigBuilder<St: BuilderState> {
    inner: InnerConfigBuilder<St>,
}

/// Operations allowed in any state
impl<St: BuilderState> ConfigBuilder<St> {
    pub fn set_default<S, T>(self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
    {
        Ok(Self {
            inner: self.inner.set_default(key, value)?,
        })
    }

    pub fn set_override<S, T>(self, key: S, value: T) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
    {
        Ok(Self {
            inner: self.inner.set_override(key, value)?,
        })
    }

    pub fn set_override_option<S, T>(self, key: S, value: Option<T>) -> Result<Self, ConfigError>
    where
        S: AsRef<str>,
        T: Into<Value>,
    {
        Ok(Self {
            inner: self.inner.set_override_option(key, value)?,
        })
    }
}

/// Operations allowed in sync state
impl ConfigBuilder<DefaultState> {
    pub fn add_source<T>(self, source: T) -> Self
    where
        T: Source + Send + Sync + 'static,
    {
        Self {
            inner: self.inner.add_source(source),
        }
    }

    pub fn add_async_source<T>(self, source: T) -> ConfigBuilder<AsyncState>
    where
        T: AsyncSource + Send + Sync + 'static,
    {
        ConfigBuilder {
            inner: self.inner.add_async_source(source),
        }
    }

    pub fn build(self) -> Result<Config, ConfigError> {
        let inner_config = self.inner.build()?;
        let cache = inner_config.cache.clone();
        Ok(Config::new(cache, inner_config))
    }

    pub fn build_cloned(&self) -> Result<Config, ConfigError> {
        let inner_config = self.inner.build_cloned()?;
        let cache = inner_config.cache.clone();
        Ok(Config::new(cache, inner_config))
    }
}

/// Operations allowed in async state
impl ConfigBuilder<AsyncState> {
    pub fn add_source<T>(self, source: T) -> Self
    where
        T: Source + Send + Sync + 'static,
    {
        Self {
            inner: self.inner.add_source(source),
        }
    }

    pub fn add_async_source<T>(self, source: T) -> Self
    where
        T: AsyncSource + Send + Sync + 'static,
    {
        Self {
            inner: self.inner.add_async_source(source),
        }
    }

    pub async fn build(self) -> Result<Config, ConfigError> {
        let inner_config = self.inner.build().await?;
        let cache = inner_config.cache.clone();
        Ok(Config::new(cache, inner_config))
    }

    pub async fn build_cloned(&self) -> Result<Config, ConfigError> {
        let inner_config = self.inner.build_cloned().await?;
        let cache = inner_config.cache.clone();
        Ok(Config::new(cache, inner_config))
    }
}
