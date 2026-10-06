use ::config::File as InnerFile;
use ::config::FileFormat as InnerFileFormat;
use napi::Either;
use napi_derive::napi;

use crate::BoxedSource;

#[napi(string_enum)]
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

pub(crate) fn parse_file_format(fmt: Either<FileFormat, String>) -> napi::Result<FileFormat> {
    match fmt {
        Either::A(f) => Ok(f),
        Either::B(s) => match s.to_lowercase().as_str() {
            "ini" => Ok(FileFormat::Ini),
            "json" => Ok(FileFormat::Json),
            "json5" => Ok(FileFormat::Json5),
            "ron" => Ok(FileFormat::Ron),
            "toml" => Ok(FileFormat::Toml),
            "yaml" | "yml" => Ok(FileFormat::Yaml),
            _ => Err(napi::Error::from_reason(format!("Unknown file format: {}", s))),
        },
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
    #[napi(factory)]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi(factory)]
    pub fn from_str(text: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        Ok(Self {
            name: None,
            text: Some(text),
            format: Some(fmt),
            required: true,
        })
    }

    #[napi(constructor)]
    pub fn new(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        let fmt = match format {
            Some(f) => Some(parse_file_format(f)?),
            None => None,
        };
        Ok(Self {
            name: Some(name),
            text: None,
            format: fmt,
            required: true,
        })
    }

    #[napi(js_name = "new")]
    pub fn new_factory(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let fmt = parse_file_format(format)?;
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
