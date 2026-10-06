use napi_derive::napi;

#[napi(string_enum)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

impl From<config::FileFormat> for FileFormat {
    fn from(f: config::FileFormat) -> Self {
        match f {
            config::FileFormat::Toml => FileFormat::Toml,
            config::FileFormat::Json => FileFormat::Json,
            config::FileFormat::Yaml => FileFormat::Yaml,
            config::FileFormat::Ini => FileFormat::Ini,
            config::FileFormat::Ron => FileFormat::Ron,
            config::FileFormat::Json5 => FileFormat::Json5,
            _ => FileFormat::Json,
        }
    }
}

#[napi(string_enum)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Case {
    Lower,
    Upper,
    Snake,
    Kebab,
    Camel,
    Pascal,
    ScreamingSnake,
}

impl From<Case> for config::Case {
    fn from(c: Case) -> Self {
        match c {
            Case::Lower => config::Case::Lower,
            Case::Upper => config::Case::Upper,
            Case::Snake => config::Case::Snake,
            Case::Kebab => config::Case::Kebab,
            Case::Camel => config::Case::Camel,
            Case::Pascal => config::Case::Pascal,
            Case::ScreamingSnake => config::Case::ScreamingSnake,
        }
    }
}

#[derive(Clone, Debug)]
pub(crate) enum FileSourceType {
    Name(String, Option<FileFormat>),
    New(String, FileFormat),
    String(String, FileFormat),
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
    pub(crate) source_type: FileSourceType,
    pub(crate) required: bool,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(name: String, format: FileFormat) -> Self {
        Self {
            source_type: FileSourceType::New(name, format),
            required: true,
        }
    }

    #[napi(factory)]
    pub fn with_name(name: String) -> Self {
        Self {
            source_type: FileSourceType::Name(name, None),
            required: true,
        }
    }

    #[napi(factory)]
    pub fn from_str(text: String, format: FileFormat) -> Self {
        Self {
            source_type: FileSourceType::String(text, format),
            required: true,
        }
    }

    #[napi]
    pub fn format(&mut self, format: FileFormat) -> &Self {
        match &mut self.source_type {
            FileSourceType::Name(_, fmt) => {
                *fmt = Some(format);
            }
            FileSourceType::New(_, fmt) => {
                *fmt = format;
            }
            FileSourceType::String(_, fmt) => {
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
