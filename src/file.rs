use config::{
    ConfigError, File as InnerFile, FileSourceFile, FileSourceString, Map, Source,
    Value as ConfigValue,
};
use napi::bindgen_prelude::Either;
use napi_derive::napi;
use std::path::{Path, PathBuf};

use crate::builder::FileFormat;

pub(crate) fn to_config_format(
    fmt: Either<FileFormat, String>,
) -> napi::Result<config::FileFormat> {
    match fmt {
        Either::A(f) => Ok(f.into()),
        Either::B(s) => parse_format(&s),
    }
}

pub(crate) fn parse_format(format: &str) -> napi::Result<config::FileFormat> {
    match format.to_lowercase().as_str() {
        "json" => Ok(config::FileFormat::Json),
        "toml" => Ok(config::FileFormat::Toml),
        "yaml" | "yml" => Ok(config::FileFormat::Yaml),
        "ini" => Ok(config::FileFormat::Ini),
        "ron" => Ok(config::FileFormat::Ron),
        "json5" => Ok(config::FileFormat::Json5),
        other => Err(napi::Error::from_reason(format!(
            "Unsupported file format: {}",
            other
        ))),
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) inner_name: Option<InnerFile<FileSourceFile, config::FileFormat>>,
    pub(crate) inner_str: Option<InnerFile<FileSourceString, config::FileFormat>>,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn create(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<File> {
        Self::new(name, format)
    }

    #[napi(factory)]
    pub fn new(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<File> {
        if let Some(fmt) = format {
            let file_format = to_config_format(fmt)?;
            let inner = InnerFile::new(&name, file_format);
            Ok(File {
                inner_name: Some(inner),
                inner_str: None,
            })
        } else {
            let inner = InnerFile::with_name(&name);
            Ok(File {
                inner_name: Some(inner),
                inner_str: None,
            })
        }
    }

    #[napi(factory, js_name = "from_str")]
    pub fn from_str(s: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        let file_format = to_config_format(format)?;
        let inner = InnerFile::from_str(&s, file_format);
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str_camel(s: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        Self::from_str(s, format)
    }

    #[napi(factory, js_name = "with_name")]
    pub fn with_name(base_name: String) -> File {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name_camel(base_name: String) -> File {
        Self::with_name(base_name)
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let file_format = to_config_format(format)?;
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.format(file_format));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.format(file_format));
        }
        Ok(self)
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.required(required));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.required(required));
        }
        self
    }
}

impl From<&Path> for File {
    fn from(path: &Path) -> Self {
        File {
            inner_name: Some(InnerFile::from(path)),
            inner_str: None,
        }
    }
}

impl From<PathBuf> for File {
    fn from(path: PathBuf) -> Self {
        File {
            inner_name: Some(InnerFile::from(path)),
            inner_str: None,
        }
    }
}

impl Source for File {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<Map<String, ConfigValue>, ConfigError> {
        if let Some(ref inner) = self.inner_name {
            inner.collect()
        } else if let Some(ref inner) = self.inner_str {
            inner.collect()
        } else {
            Ok(Map::new())
        }
    }

    fn collect_to(&self, cache: &mut ConfigValue) -> Result<(), ConfigError> {
        if let Some(ref inner) = self.inner_name {
            inner.collect_to(cache)
        } else if let Some(ref inner) = self.inner_str {
            inner.collect_to(cache)
        } else {
            Ok(())
        }
    }
}
