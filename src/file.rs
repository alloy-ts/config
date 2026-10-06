use napi_derive::napi;

#[napi(string_enum = "lowercase")]
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
    #[napi(constructor)]
    pub fn js_constructor(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name_or_text),
            text: None,
            format,
            required: true,
        }
    }

    #[napi]
    pub fn new(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self::js_constructor(name_or_text, format)
    }

    #[napi]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi]
    pub fn from_str(text: String, format: FileFormat) -> Self {
        Self {
            name: None,
            text: Some(text),
            format: Some(format),
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
}

impl File {
    pub(crate) fn to_config_source(&self) -> Box<dyn config::Source + Send + Sync> {
        let fmt: config::FileFormat = self.format.map(Into::into).unwrap_or(config::FileFormat::Json);
        if let Some(text) = &self.text {
            Box::new(config::File::<config::FileSourceString, config::FileFormat>::from_str(text, fmt).required(self.required))
        } else if let Some(name) = &self.name {
            if self.format.is_some() {
                Box::new(config::File::<config::FileSourceFile, config::FileFormat>::new(name, fmt).required(self.required))
            } else {
                Box::new(config::File::<config::FileSourceFile, config::FileFormat>::with_name(name).required(self.required))
            }
        } else {
            Box::new(config::File::<config::FileSourceString, config::FileFormat>::from_str("", config::FileFormat::Json).required(false))
        }
    }
}
