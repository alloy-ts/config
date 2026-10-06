use config::File as InnerFile;
use napi::Either;
use napi_derive::napi;

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

impl From<FileFormat> for config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Ini => config::FileFormat::Ini,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Json5 => config::FileFormat::Json5,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Yaml => config::FileFormat::Yaml,
        }
    }
}

pub(crate) fn parse_file_format(format: Either<i32, String>) -> napi::Result<config::FileFormat> {
    match format {
        Either::A(enum_num) => match enum_num {
            0 => Ok(config::FileFormat::Ini),
            1 => Ok(config::FileFormat::Json),
            2 => Ok(config::FileFormat::Json5),
            3 => Ok(config::FileFormat::Ron),
            4 => Ok(config::FileFormat::Toml),
            5 => Ok(config::FileFormat::Yaml),
            n => Err(napi::Error::from_reason(format!("Unknown file format discriminant: {}", n))),
        },
        Either::B(str_fmt) => match str_fmt.to_lowercase().as_str() {
            "ini" => Ok(config::FileFormat::Ini),
            "json" => Ok(config::FileFormat::Json),
            "json5" => Ok(config::FileFormat::Json5),
            "ron" => Ok(config::FileFormat::Ron),
            "toml" => Ok(config::FileFormat::Toml),
            "yaml" | "yml" => Ok(config::FileFormat::Yaml),
            s => Err(napi::Error::from_reason(format!("Unknown file format: {}", s))),
        },
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) name: Option<String>,
    pub(crate) text: Option<String>,
    pub(crate) format: Option<config::FileFormat>,
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

    #[napi(factory, ts_args_type = "text: string, format: FileFormat | string")]
    pub fn from_str(text: String, format: Either<i32, String>) -> napi::Result<Self> {
        let fmt = parse_file_format(format)?;
        Ok(Self {
            name: None,
            text: Some(text),
            format: Some(fmt),
            required: true,
        })
    }

    #[napi(constructor, ts_args_type = "name: string, format?: FileFormat | string | undefined | null")]
    pub fn new(name: String, format: Option<Either<i32, String>>) -> napi::Result<Self> {
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

    #[napi(factory, js_name = "new", ts_args_type = "name: string, format?: FileFormat | string | undefined | null")]
    pub fn new_factory(name: String, format: Option<Either<i32, String>>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi(ts_args_type = "format: FileFormat | string")]
    pub fn format(&mut self, format: Either<i32, String>) -> napi::Result<&Self> {
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
                    Some(fmt) => BoxedSource(Box::new(base.format(fmt))),
                    None => BoxedSource(Box::new(base)),
                };
                Ok(source)
            }
            (None, Some(text)) => {
                let fmt = self
                    .format
                    .ok_or_else(|| napi::Error::from_reason("format is required for string content"))?;
                let file = InnerFile::from_str(text, fmt).required(self.required);
                Ok(BoxedSource(Box::new(file)))
            }
            (None, None) => Err(napi::Error::from_reason("File requires a name or content")),
        }
    }
}
