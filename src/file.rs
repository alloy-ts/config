use config::{
    ConfigError, File as InnerFile, FileFormat as InnerFileFormat, FileSourceFile,
    FileSourceString, Map, Source, Value as ConfigValue,
};
use napi_derive::napi;
use std::path::{Path, PathBuf};

#[napi(string_enum)]
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

pub fn parse_format(s: &str) -> napi::Result<FileFormat> {
    match s.to_lowercase().as_str() {
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
    }
}

pub fn parse_format_value(val: &serde_json::Value) -> napi::Result<FileFormat> {
    match val {
        serde_json::Value::String(s) => parse_format(s),
        serde_json::Value::Number(n) => {
            if let Some(i) = n.as_u64() {
                match i {
                    0 => Ok(FileFormat::Toml),
                    1 => Ok(FileFormat::Json),
                    2 => Ok(FileFormat::Yaml),
                    3 => Ok(FileFormat::Ini),
                    4 => Ok(FileFormat::Ron),
                    5 => Ok(FileFormat::Json5),
                    _ => Err(napi::Error::from_reason("Invalid FileFormat enum value")),
                }
            } else {
                Err(napi::Error::from_reason("Invalid FileFormat number"))
            }
        }
        _ => Err(napi::Error::from_reason("Invalid file format")),
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
    pub fn new(name: String, format: Option<serde_json::Value>) -> napi::Result<File> {
        if let Some(fmt_val) = format {
            if !fmt_val.is_null() {
                let file_format = parse_format_value(&fmt_val)?;
                let inner = InnerFile::new(&name, file_format.into());
                return Ok(File {
                    inner_name: Some(inner),
                    inner_str: None,
                });
            }
        }
        let inner = InnerFile::with_name(&name);
        Ok(File {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn new_factory(name: String, format: Option<serde_json::Value>) -> napi::Result<File> {
        Self::new(name, format)
    }

    #[napi(factory, js_name = "from_str")]
    pub fn from_str(s: String, format: serde_json::Value) -> napi::Result<File> {
        let file_format = parse_format_value(&format)?;
        let inner = InnerFile::from_str(&s, file_format.into());
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str_camel(s: String, format: serde_json::Value) -> napi::Result<File> {
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
    pub fn format(&mut self, format: serde_json::Value) -> napi::Result<&Self> {
        let file_format = parse_format_value(&format)?;
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.format(file_format.into()));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.format(file_format.into()));
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
