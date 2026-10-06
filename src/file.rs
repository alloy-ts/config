use napi_derive::napi;

#[napi]
#[derive(Clone, Debug, Copy)]
pub enum FileFormat {
    Toml,
    Json,
    Yaml,
    Ron,
    Ini,
    Json5,
}

impl From<FileFormat> for config::FileFormat {
    fn from(format: FileFormat) -> Self {
        match format {
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Yaml => config::FileFormat::Yaml,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Ini => config::FileFormat::Ini,
            FileFormat::Json5 => config::FileFormat::Json5,
        }
    }
}

#[derive(Clone, Debug)]
enum FileSourceType {
    File { name: String, format: Option<FileFormat> },
    String { content: String, format: FileFormat },
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    source: FileSourceType,
    required: bool,
}

impl config::Source for File {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        match &self.source {
            FileSourceType::File { name, format } => {
                let mut f = match format {
                    Some(fmt) => config::File::new(name, config::FileFormat::from(*fmt)),
                    None => config::File::with_name(name),
                };
                f = f.required(self.required);
                Box::new(f)
            }
            FileSourceType::String { content, format } => {
                let fmt: config::FileFormat = (*format).into();
                let f = config::File::from_str(content, fmt).required(self.required);
                Box::new(f)
            }
        }
    }

    fn collect(&self) -> Result<config::Map<String, config::Value>, config::ConfigError> {
        self.clone_into_box().collect()
    }

    fn collect_to(&self, cache: &mut config::Value) -> Result<(), config::ConfigError> {
        self.clone_into_box().collect_to(cache)
    }
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(name: String, format: Option<FileFormat>) -> Self {
        Self {
            source: FileSourceType::File { name, format },
            required: true,
        }
    }

    #[napi(factory)]
    pub fn from_str(s: String, format: FileFormat) -> Self {
        Self {
            source: FileSourceType::String { content: s, format },
            required: true,
        }
    }

    #[napi(factory)]
    pub fn with_name(base_name: String) -> Self {
        Self {
            source: FileSourceType::File { name: base_name, format: None },
            required: true,
        }
    }

    #[napi]
    pub fn format(&mut self, format: FileFormat) -> &Self {
        match &mut self.source {
            FileSourceType::File { format: ref mut fmt, .. } => {
                *fmt = Some(format);
            }
            FileSourceType::String { format: ref mut fmt, .. } => {
                *fmt = format;
            }
        }
        self
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        self.required = required;
        self
    }
}
