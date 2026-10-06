use napi_derive::napi;

use crate::file::File;

#[napi]
#[derive(Default)]
pub struct ConfigBuilder {
    inner: config::ConfigBuilder<config::builder::DefaultState>,
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
    pub fn set_default(&mut self, env: napi::Env, key: String, value: napi::Unknown) -> napi::Result<&Self> {
        let serde_val: serde_json::Value = env.from_js_value(value)?;
        let val: config::Value = serde_json::from_value(serde_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder.set_default(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override(&mut self, env: napi::Env, key: String, value: napi::Unknown) -> napi::Result<&Self> {
        let serde_val: serde_json::Value = env.from_js_value(value)?;
        let val: config::Value = serde_json::from_value(serde_val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder.set_override(&key, val)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn set_override_option(&mut self, env: napi::Env, key: String, value: Option<napi::Unknown>) -> napi::Result<&Self> {
        let val_opt = match value {
            Some(val) => {
                let serde_val: serde_json::Value = env.from_js_value(val)?;
                let v: config::Value = serde_json::from_value(serde_val)
                    .map_err(|e| napi::Error::from_reason(e.to_string()))?;
                Some(v)
            }
            None => None,
        };
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder.set_override_option(&key, val_opt)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(self)
    }

    #[napi]
    pub fn add_source(&mut self, file: &File) -> &Self {
        let builder = std::mem::take(&mut self.inner);
        self.inner = builder.add_source(file.clone());
        self
    }

    #[napi]
    pub fn build(&mut self) -> napi::Result<crate::config::Config> {
        let builder = std::mem::take(&mut self.inner);
        let cfg = builder.build().map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(crate::config::Config { inner: cfg })
    }

    #[napi]
    pub fn build_cloned(&self) -> napi::Result<crate::config::Config> {
        let cfg = self.inner.build_cloned().map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(crate::config::Config { inner: cfg })
    }
}
