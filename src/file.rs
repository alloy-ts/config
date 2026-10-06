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

impl From<FileFormat> for ::config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Ini => ::config::FileFormat::Ini,
            FileFormat::Json => ::config::FileFormat::Json,
            FileFormat::Json5 => ::config::FileFormat::Json5,
            FileFormat::Ron => ::config::FileFormat::Ron,
            FileFormat::Toml => ::config::FileFormat::Toml,
            FileFormat::Yaml => ::config::FileFormat::Yaml,
        }
    }
}

pub(crate) fn parse_format(fmt_str: &str) -> napi::Result<FileFormat> {
    match fmt_str.to_lowercase().as_str() {
        "ini" => Ok(FileFormat::Ini),
        "json" => Ok(FileFormat::Json),
        "json5" => Ok(FileFormat::Json5),
        "ron" => Ok(FileFormat::Ron),
        "toml" => Ok(FileFormat::Toml),
        "yaml" | "yml" => Ok(FileFormat::Yaml),
        _ => Err(napi::Error::from_reason(format!("Unknown file format: {fmt_str}"))),
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
            required: false,
        }
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(text: String, format: Either<FileFormat, String>) -> napi::Result<Self> {
        let fmt = match format {
            Either::A(f) => f,
            Either::B(s) => parse_format(&s)?,
        };
        Ok(Self {
            name: None,
            text: Some(text),
            format: Some(fmt),
            required: true,
        })
    }

    #[napi(factory, js_name = "new")]
    pub fn new_factory(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        Self::new(name, format)
    }

    #[napi(constructor)]
    pub fn new(name: String, format: Option<Either<FileFormat, String>>) -> napi::Result<Self> {
        let fmt = match format {
            Some(Either::A(f)) => Some(f),
            Some(Either::B(s)) => Some(parse_format(&s)?),
            None => None,
        };
        Ok(Self {
            name: Some(name),
            text: None,
            format: fmt,
            required: false,
        })
    }

    #[napi]
    pub fn format(&mut self, format: Either<FileFormat, String>) -> napi::Result<&Self> {
        let fmt = match format {
            Either::A(f) => f,
            Either::B(s) => parse_format(&s)?,
        };
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
                let base = ::config::File::with_name(name);
                let source = match self.format {
                    Some(fmt) => BoxedSource(Box::new(
                        base.format(::config::FileFormat::from(fmt)).required(self.required),
                    )),
                    None => BoxedSource(Box::new(base.required(self.required))),
                };
                Ok(source)
            }
            (None, Some(text)) => {
                let fmt = self
                    .format
                    .ok_or_else(|| napi::Error::from_reason("format is required for string content"))?;
                let file = ::config::File::from_str(text, ::config::FileFormat::from(fmt))
                    .required(self.required);
                Ok(BoxedSource(Box::new(file)))
            }
            (None, None) => Err(napi::Error::from_reason("File requires a name or content")),
        }
    }
}
