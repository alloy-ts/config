use config::File as InnerFile;
use config::FileFormat as InnerFileFormat;
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

fn parse_format(f: Either<String, FileFormat>) -> napi::Result<FileFormat> {
    match f {
        Either::A(s) => match s.to_lowercase().as_str() {
            "ini" => Ok(FileFormat::Ini),
            "json" => Ok(FileFormat::Json),
            "json5" => Ok(FileFormat::Json5),
            "ron" => Ok(FileFormat::Ron),
            "toml" => Ok(FileFormat::Toml),
            "yaml" | "yml" => Ok(FileFormat::Yaml),
            _ => Err(napi::Error::from_reason(format!("Unknown file format: {s}"))),
        },
        Either::B(fmt) => Ok(fmt),
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
    #[napi(constructor)]
    pub fn new(name: String, format: Option<Either<String, FileFormat>>) -> napi::Result<Self> {
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

    #[napi(factory, js_name = "new")]
    pub fn new_factory(name: String, format: Option<Either<String, FileFormat>>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name_js(name: String) -> Self {
        Self::with_name(name)
    }

    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str_js(text: String, format: Either<String, FileFormat>) -> napi::Result<Self> {
        Self::from_str(text, format)
    }

    pub fn from_str(text: String, format: Either<String, FileFormat>) -> napi::Result<Self> {
        let fmt = parse_format(format)?;
        Ok(Self {
            name: None,
            text: Some(text),
            format: Some(fmt),
            required: true,
        })
    }

    #[napi]
    pub fn format(&mut self, format: Either<String, FileFormat>) -> napi::Result<&Self> {
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
                let source = match self.format {
                    Some(fmt) => BoxedSource(Box::new(
                        InnerFile::with_name(name)
                            .format(InnerFileFormat::from(fmt))
                            .required(self.required),
                    )),
                    None => BoxedSource(Box::new(
                        InnerFile::with_name(name).required(self.required),
                    )),
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
