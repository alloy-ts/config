use napi_derive::napi;

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
    pub fn new(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name_or_text),
            text: None,
            format,
            required: true,
        }
    }

    #[napi]
    pub fn format(&mut self, format: FileFormat) -> Self {
        let mut c = self.clone();
        c.format = Some(format);
        c
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> Self {
        let mut c = self.clone();
        c.required = required;
        c
    }
}
