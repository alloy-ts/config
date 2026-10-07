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

impl From<config::FileFormat> for FileFormat {
    fn from(f: config::FileFormat) -> Self {
        match f {
            config::FileFormat::Ini => FileFormat::Ini,
            config::FileFormat::Json => FileFormat::Json,
            config::FileFormat::Json5 => FileFormat::Json5,
            config::FileFormat::Ron => FileFormat::Ron,
            config::FileFormat::Toml => FileFormat::Toml,
            config::FileFormat::Yaml => FileFormat::Yaml,
            _ => FileFormat::Json,
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
    pub fn new(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name_or_text),
            text: None,
            format,
            required: false,
        }
    }

    #[napi(factory, js_name = "withName")]
    pub fn with_name(name: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name),
            text: None,
            format,
            required: false,
        }
    }

    #[napi(factory, js_name = "fromStr")]
    pub fn from_str(text: String, format: FileFormat) -> Self {
        Self {
            name: None,
            text: Some(text),
            format: Some(format),
            required: true,
        }
    }

    #[napi(factory, js_name = "fromFilename")]
    pub fn from_filename(filename: String) -> Self {
        Self {
            name: Some(filename),
            text: None,
            format: None,
            required: false,
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
    pub(crate) fn to_config_source(&self) -> Result<Box<dyn config::Source + Send + Sync>, config::ConfigError> {
        if let Some(text) = &self.text {
            let fmt: config::FileFormat = self.format.unwrap_or(FileFormat::Json).into();
            let f = config::File::<config::FileSourceString, config::FileFormat>::from_str(text, fmt).required(self.required);
            Ok(Box::new(f))
        } else if let Some(name) = &self.name {
            if let Some(fmt) = self.format {
                let f = config::File::<config::FileSourceFile, config::FileFormat>::new(name, fmt.into()).required(self.required);
                Ok(Box::new(f))
            } else {
                let f = config::File::<config::FileSourceFile, config::FileFormat>::with_name(name).required(self.required);
                Ok(Box::new(f))
            }
        } else {
            Err(config::ConfigError::Message("File source must have a name or content string".into()))
        }
    }
}

impl config::Source for File {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        let source_box = self.to_config_source()?;
        source_box.collect()
    }

    fn collect_to(&self, cache: &mut config::Value) -> Result<(), config::ConfigError> {
        let source_box = self.to_config_source()?;
        source_box.collect_to(cache)
    }
}
