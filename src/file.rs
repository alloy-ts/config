use config::File as InnerFile;
use config::FileFormat as InnerFileFormat;
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
    pub fn from_str(text: String, format: FileFormat) -> Self {
        Self {
            name: None,
            text: Some(text),
            format: Some(format),
            required: true,
        }
    }

    #[napi(constructor)]
    pub fn new(name: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name),
            text: None,
            format,
            required: true,
        }
    }

    #[napi]
    pub fn format(&mut self, format: FileFormat) -> &Self {
        self.format = Some(format);
        self
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
