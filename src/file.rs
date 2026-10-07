use config::{
    ConfigError, File as InnerFile, FileFormat as InnerFileFormat, FileSourceFile, FileSourceString,
    Map, Source, Value as ConfigValue,
};
use napi::bindgen_prelude::Either;
use napi_derive::napi;
use std::path::{Path, PathBuf};

use crate::builder::FileFormat;

pub(crate) fn parse_file_format(format: Either<FileFormat, String>) -> napi::Result<InnerFileFormat> {
    match format {
        Either::A(fmt) => Ok(fmt.into()),
        Either::B(s) => match s.to_lowercase().as_str() {
            "json" => Ok(InnerFileFormat::Json),
            "toml" => Ok(InnerFileFormat::Toml),
            "yaml" | "yml" => Ok(InnerFileFormat::Yaml),
            "ini" => Ok(InnerFileFormat::Ini),
            "ron" => Ok(InnerFileFormat::Ron),
            "json5" => Ok(InnerFileFormat::Json5),
            other => Err(napi::Error::from_reason(format!(
                "Unsupported file format: {}",
                other
            ))),
        },
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) inner_name: Option<InnerFile<FileSourceFile, InnerFileFormat>>,
    pub(crate) inner_str: Option<InnerFile<FileSourceString, InnerFileFormat>>,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(name: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        let inner = InnerFile::new(&name, fmt);
        Ok(File {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn create_new(name: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi(factory)]
    pub fn from_str(s: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        let inner = InnerFile::from_str(&s, fmt);
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory)]
    pub fn with_name(base_name: String) -> Self {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let fmt = parse_file_format(format)?;
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.format(fmt));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.format(fmt));
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
