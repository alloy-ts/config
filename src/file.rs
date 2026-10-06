use ::config::{
    ConfigError, File as InnerFile, FileFormat as InnerFileFormat, FileSourceFile,
    FileSourceString, Map, Source, Value as ConfigValue,
};
use napi::bindgen_prelude::Either;
use napi_derive::napi;
use std::path::{Path, PathBuf};

#[napi]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileFormat {
    Toml,
    Json,
    Yaml,
    Ini,
    Ron,
    Json5,
}

impl From<FileFormat> for InnerFileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Toml => InnerFileFormat::Toml,
            FileFormat::Json => InnerFileFormat::Json,
            FileFormat::Yaml => InnerFileFormat::Yaml,
            FileFormat::Ini => InnerFileFormat::Ini,
            FileFormat::Ron => InnerFileFormat::Ron,
            FileFormat::Json5 => InnerFileFormat::Json5,
        }
    }
}

impl TryFrom<&str> for FileFormat {
    type Error = napi::Error;
    fn try_from(s: &str) -> std::result::Result<Self, Self::Error> {
        match s.to_lowercase().as_str() {
            "json" => Ok(FileFormat::Json),
            "toml" => Ok(FileFormat::Toml),
            "yaml" | "yml" => Ok(FileFormat::Yaml),
            "ini" => Ok(FileFormat::Ini),
            "ron" => Ok(FileFormat::Ron),
            "json5" => Ok(FileFormat::Json5),
            other => Err(napi::Error::from_reason(format!(
                "Unsupported file format: {other}"
            ))),
        }
    }
}

pub(crate) fn parse_format(either: Either<FileFormat, String>) -> napi::Result<InnerFileFormat> {
    match either {
        Either::A(ff) => Ok(ff.into()),
        Either::B(s) => FileFormat::try_from(s.as_str()).map(Into::into),
    }
}

#[derive(Clone, Debug)]
pub(crate) enum InnerFileKind {
    File(InnerFile<FileSourceFile, InnerFileFormat>),
    Str(InnerFile<FileSourceString, InnerFileFormat>),
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) inner: Option<InnerFileKind>,
}

#[napi]
impl File {
    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(s: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::from_str(&s, file_format);
        Ok(File {
            inner: Some(InnerFileKind::Str(inner)),
        })
    }

    #[napi(constructor)]
    pub fn new(name: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::new(&name, file_format);
        Ok(File {
            inner: Some(InnerFileKind::File(inner)),
        })
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name(base_name: String) -> File {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner: Some(InnerFileKind::File(inner)),
        }
    }

    #[napi(ts_return_type = "File")]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<()> {
        let file_format = parse_format(format)?;
        match self.inner.take() {
            Some(InnerFileKind::File(f)) => self.inner = Some(InnerFileKind::File(f.format(file_format))),
            Some(InnerFileKind::Str(f)) => self.inner = Some(InnerFileKind::Str(f.format(file_format))),
            None => {}
        }
        Ok(())
    }

    #[napi(ts_return_type = "File")]
    pub fn required(&mut self, required: bool) {
        match self.inner.take() {
            Some(InnerFileKind::File(f)) => self.inner = Some(InnerFileKind::File(f.required(required))),
            Some(InnerFileKind::Str(f)) => self.inner = Some(InnerFileKind::Str(f.required(required))),
            None => {}
        }
    }
}

impl From<&Path> for File {
    fn from(path: &Path) -> Self {
        File {
            inner: Some(InnerFileKind::File(InnerFile::from(path))),
        }
    }
}

impl From<PathBuf> for File {
    fn from(path: PathBuf) -> Self {
        File {
            inner: Some(InnerFileKind::File(InnerFile::from(path))),
        }
    }
}

impl Source for File {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> std::result::Result<Map<String, ConfigValue>, ConfigError> {
        match &self.inner {
            Some(InnerFileKind::File(f)) => f.collect(),
            Some(InnerFileKind::Str(f)) => f.collect(),
            None => Ok(Map::new()),
        }
    }

    fn collect_to(&self, cache: &mut ConfigValue) -> std::result::Result<(), ConfigError> {
        match &self.inner {
            Some(InnerFileKind::File(f)) => f.collect_to(cache),
            Some(InnerFileKind::Str(f)) => f.collect_to(cache),
            None => Ok(()),
        }
    }
}
