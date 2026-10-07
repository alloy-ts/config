use napi_derive::napi;

#[napi]
#[derive(Debug, PartialEq, Eq, Clone, Copy)]
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
#[derive(Clone, Debug, Default)]
pub struct File {
    pub(crate) name: Option<String>,
    pub(crate) format: Option<FileFormat>,
    pub(crate) required: bool,
    pub(crate) source_str: Option<String>,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(name: Option<String>, format: Option<FileFormat>) -> Self {
        Self {
            name,
            format,
            required: true,
            source_str: None,
        }
    }

    #[napi(factory)]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            format: None,
            required: true,
            source_str: None,
        }
    }

    #[napi(factory)]
    pub fn from_str(content: String, format: FileFormat) -> Self {
        Self {
            name: None,
            format: Some(format),
            required: true,
            source_str: Some(content),
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
}
