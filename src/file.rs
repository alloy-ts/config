use config::{
    ConfigError, File as InnerFile, FileFormat, FileSourceFile, FileSourceString, Map, Source, Value as ConfigValue,
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use std::path::{Path, PathBuf};

use crate::builder::FileFormat as NapiFileFormat;

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) inner_name: Option<InnerFile<FileSourceFile, FileFormat>>,
    pub(crate) inner_str: Option<InnerFile<FileSourceString, FileFormat>>,
}

#[napi]
impl File {
    #[napi(factory)]
    pub fn from_str(s: String, format: Either<String, NapiFileFormat>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::from_str(&s, file_format);
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory)]
    pub fn new(name: String, format: Either<String, NapiFileFormat>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::new(&name, file_format);
        Ok(File {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(factory)]
    pub fn with_name(base_name: String) -> File {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi]
    pub fn format(&mut self, format: Either<String, NapiFileFormat>) -> napi::Result<&Self> {
        let file_format = parse_format(format)?;
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

fn parse_format(format: Either<String, NapiFileFormat>) -> napi::Result<FileFormat> {
    match format {
        Either::A(str_format) => match str_format.to_lowercase().as_str() {
            "json" => Ok(FileFormat::Json),
            "toml" => Ok(FileFormat::Toml),
            "yaml" | "yml" => Ok(FileFormat::Yaml),
            "ini" => Ok(FileFormat::Ini),
            "ron" => Ok(FileFormat::Ron),
            "json5" => Ok(FileFormat::Json5),
            other => Err(napi::Error::from_reason(format!(
                "Unsupported file format: {}",
                other
            ))),
        },
        Either::B(enum_format) => Ok(enum_format.into()),
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

    fn collect(&self) -> std::result::Result<Map<String, ConfigValue>, ConfigError> {
        if let Some(ref inner) = self.inner_name {
            inner.collect()
        } else if let Some(ref inner) = self.inner_str {
            inner.collect()
        } else {
            Ok(Map::new())
        }
    }

    fn collect_to(&self, cache: &mut ConfigValue) -> std::result::Result<(), ConfigError> {
        if let Some(ref inner) = self.inner_name {
            inner.collect_to(cache)
        } else if let Some(ref inner) = self.inner_str {
            inner.collect_to(cache)
        } else {
            Ok(())
        }
    }
}