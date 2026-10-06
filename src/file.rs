use config::{
    ConfigError, File as InnerFile, FileSourceFile, FileSourceString, Map, Source,
    Value as ConfigValue,
};
use napi_derive::napi;
use std::path::{Path, PathBuf};

#[napi]
#[derive(Debug, Clone, Copy)]
pub enum FileFormat {
    Toml,
    Json,
    Yaml,
    Ini,
    Ron,
    Json5,
}

impl From<FileFormat> for config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Yaml => config::FileFormat::Yaml,
            FileFormat::Ini => config::FileFormat::Ini,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Json5 => config::FileFormat::Json5,
        }
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
    #[napi(getter, js_name = "Format")]
    pub fn format_enum(&self) -> FileFormat {
        FileFormat::Json
    }

    #[napi(constructor)]
    pub fn new(name: String, format: FileFormat) -> File {
        let inner = InnerFile::new(&name, format.into());
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi(factory)]
    pub fn from_str(s: String, format: FileFormat) -> File {
        let inner = InnerFile::from_str(&s, format.into());
        File {
            inner_name: None,
            inner_str: Some(inner),
        }
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
    pub fn format(&mut self, format: FileFormat) -> &Self {
        let file_format: config::FileFormat = format.into();
        if let Some(inner) = self.inner_name.take() {
            self.inner_name = Some(inner.format(file_format));
        } else if let Some(inner) = self.inner_str.take() {
            self.inner_str = Some(inner.format(file_format));
        }
        self
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
