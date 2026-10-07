use config::{
    ConfigError, File as InnerFile, FileFormat as InnerFileFormat, FileSourceFile, FileSourceString,
    Map, Source, Value as ConfigValue, Environment as InnerEnvironment,
};
use napi::bindgen_prelude::Either;
use napi_derive::napi;
use std::path::{Path, PathBuf};

#[napi(string_enum = "lowercase")]
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

pub(crate) fn parse_format(format: Either<FileFormat, String>) -> napi::Result<InnerFileFormat> {
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
    #[napi(js_name = "fromStr", factory, ts_args_type = "s: string, format: FileFormat | string")]
    pub fn from_str(s: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::from_str(&s, file_format);
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory, ts_args_type = "name: string, format: FileFormat | string")]
    pub fn new(name: String, format: Either<FileFormat, String>) -> napi::Result<File> {
        let file_format = parse_format(format)?;
        let inner = InnerFile::new(&name, file_format);
        Ok(File {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(js_name = "withName", factory)]
    pub fn with_name(base_name: String) -> File {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi(ts_args_type = "format: FileFormat | string")]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
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

#[napi]
#[derive(Clone, Debug)]
pub struct Environment {
    pub(crate) inner: InnerEnvironment,
}

#[napi]
impl Environment {
    #[napi(js_name = "withPrefix", factory)]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: InnerEnvironment::with_prefix(&prefix),
        }
    }

    #[napi(factory)]
    pub fn default() -> Self {
        Self {
            inner: InnerEnvironment::default(),
        }
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        self.inner = self.inner.clone().separator(&separator);
        self
    }

    #[napi(js_name = "ignoreEmpty")]
    pub fn ignore_empty(&mut self, ignore: bool) -> &Self {
        self.inner = self.inner.clone().ignore_empty(ignore);
        self
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep);
        self
    }
}

impl Source for Environment {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<Map<String, ConfigValue>, ConfigError> {
        self.inner.collect()
    }

    fn collect_to(&self, cache: &mut ConfigValue) -> Result<(), ConfigError> {
        self.inner.collect_to(cache)
    }
}
