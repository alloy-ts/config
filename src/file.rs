use ::config::File as InnerFile;
use ::config::FileFormat as InnerFileFormat;
use napi::bindgen_prelude::Either;
use napi_derive::napi;
use std::str::FromStr;

use crate::BoxedSource;

#[napi]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileFormat {
    Ini,
    Json,
    Json5,
    Ron,
    Toml,
    Yaml,
}

impl From<FileFormat> for InnerFileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Ini => InnerFileFormat::Ini,
            FileFormat::Json => InnerFileFormat::Json,
            FileFormat::Json5 => InnerFileFormat::Json5,
            FileFormat::Ron => InnerFileFormat::Ron,
            FileFormat::Toml => InnerFileFormat::Toml,
            FileFormat::Yaml => InnerFileFormat::Yaml,
        }
    }
}

impl FromStr for FileFormat {
    type Err = napi::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "ini" => Ok(FileFormat::Ini),
            "json" => Ok(FileFormat::Json),
            "json5" => Ok(FileFormat::Json5),
            "ron" => Ok(FileFormat::Ron),
            "toml" => Ok(FileFormat::Toml),
            "yaml" | "yml" => Ok(FileFormat::Yaml),
            _ => Err(napi::Error::from_reason(format!("Unknown file format: {}", s))),
        }
    }
}

fn parse_format(fmt: Either<FileFormat, String>) -> napi::Result<FileFormat> {
    match fmt {
        Either::A(f) => Ok(f),
        Either::B(s) => s.parse::<FileFormat>(),
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) name: Option<String>,
    pub(crate) text: Option<String>,
    pub(crate) format: Option<FileFormat>,
    pub(crate) required: bool,
}

#[napi]
impl File {
    #[napi(factory, js_name = "withName")]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(text: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_format(format)?;
        Ok(Self {
            name: None,
            text: Some(text),
            format: Some(fmt),
            required: true,
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn new_file(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi(constructor)]
    pub fn new(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        let fmt = match format {
            Some(f) => Some(parse_format(f)?),
            None => None,
        };
        Ok(Self {
            name: Some(name),
            text: None,
            format: fmt,
            required: true,
        })
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let fmt = parse_format(format)?;
        self.format = Some(fmt);
        Ok(self)
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        self.required = required;
        self
    }

    /// Build a `config::File` source from this wrapper.
    pub(crate) fn into_config_source(&self) -> napi::Result<BoxedSource> {
        match (&self.name, &self.text) {
            (Some(name), _) => {
                let base = InnerFile::with_name(name).required(self.required);
                let source = match self.format {
                    Some(fmt) => {
                        BoxedSource(Box::new(base.format(InnerFileFormat::from(fmt))))
                    }
                    None => BoxedSource(Box::new(base)),
                };
                Ok(source)
            }
            (None, Some(text)) => {
                let fmt = self
                    .format
                    .ok_or_else(|| napi::Error::from_reason("format is required for string content"))?;
                let file = InnerFile::from_str(text, InnerFileFormat::from(fmt)).required(self.required);
                Ok(BoxedSource(Box::new(file)))
            }
            (None, None) => Err(napi::Error::from_reason(
                "File requires a name or content",
            )),
        }
    }
}

impl ::config::Source for File {
    fn clone_into_box(&self) -> Box<dyn ::config::Source + Send + Sync> {
        match self.into_config_source() {
            Ok(src) => src.clone_into_box(),
            Err(_) => Box::new(InnerFile::with_name("").required(false)),
        }
    }

    fn collect(&self) -> Result<::config::Map<String, ::config::Value>, ::config::ConfigError> {
        self.into_config_source()
            .map_err(|e| ::config::ConfigError::Message(e.to_string()))?
            .collect()
    }

    fn collect_to(&self, cache: &mut ::config::Value) -> Result<(), ::config::ConfigError> {
        self.into_config_source()
            .map_err(|e| ::config::ConfigError::Message(e.to_string()))?
            .collect_to(cache)
    }
}
