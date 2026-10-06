use config::{
    ConfigError, Environment as InnerEnvironment, File as InnerFile,
    FileFormat as InnerFileFormat, FileSourceFile, FileSourceString, Map, Source,
    Value as ConfigValue,
};
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

    fn try_from(format: &str) -> Result<Self, Self::Error> {
        match format.to_lowercase().as_str() {
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
}

fn parse_format_or_enum(format: napi::Either<FileFormat, String>) -> napi::Result<InnerFileFormat> {
    match format {
        napi::Either::A(fmt) => Ok(fmt.into()),
        napi::Either::B(str_fmt) => {
            let ff = FileFormat::try_from(str_fmt.as_str())?;
            Ok(ff.into())
        }
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
    pub fn new_constructor(name: String, format: napi::Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_format_or_enum(format)?;
        let inner = InnerFile::new(&name, fmt);
        Ok(File {
            inner_name: Some(inner),
            inner_str: None,
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn new_factory(name: String, format: napi::Either<FileFormat, String>) -> napi::Result<Self> {
        Self::new_constructor(name, format)
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(s: String, format: napi::Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_format_or_enum(format)?;
        let inner = InnerFile::from_str(&s, fmt);
        Ok(File {
            inner_name: None,
            inner_str: Some(inner),
        })
    }

    #[napi(factory, js_name = "from_str")]
    pub fn from_str_alias(s: String, format: napi::Either<FileFormat, String>) -> napi::Result<Self> {
        Self::from_str(s, format)
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name(base_name: String) -> Self {
        let inner = InnerFile::with_name(&base_name);
        File {
            inner_name: Some(inner),
            inner_str: None,
        }
    }

    #[napi(factory, js_name = "with_name")]
    pub fn with_name_alias(base_name: String) -> Self {
        Self::with_name(base_name)
    }

    #[napi]
    pub fn format(&mut self, format: napi::Either<FileFormat, String>) -> napi::Result<&Self> {
        let file_format = parse_format_or_enum(format)?;
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
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: InnerEnvironment::default(),
        }
    }

    #[napi(factory, js_name = "withPrefix")]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: InnerEnvironment::with_prefix(&prefix),
        }
    }

    #[napi(factory, js_name = "with_prefix")]
    pub fn with_prefix_alias(prefix: String) -> Self {
        Self::with_prefix(prefix)
    }

    #[napi(factory)]
    pub fn default() -> Self {
        Self::new()
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

    #[napi(js_name = "ignore_empty")]
    pub fn ignore_empty_alias(&mut self, ignore: bool) -> &Self {
        self.ignore_empty(ignore)
    }

    #[napi(js_name = "keepPrefix")]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep);
        self
    }

    #[napi(js_name = "keep_prefix")]
    pub fn keep_prefix_alias(&mut self, keep: bool) -> &Self {
        self.keep_prefix(keep)
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
