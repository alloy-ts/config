use napi_derive::napi;
use config::Source;

#[napi(string_enum = "lowercase")]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FileFormat {
    Toml,
    Json,
    Json5,
    Ron,
    Yaml,
    Ini,
}

impl From<FileFormat> for config::FileFormat {
    fn from(f: FileFormat) -> Self {
        match f {
            FileFormat::Toml => config::FileFormat::Toml,
            FileFormat::Json => config::FileFormat::Json,
            FileFormat::Json5 => config::FileFormat::Json5,
            FileFormat::Ron => config::FileFormat::Ron,
            FileFormat::Yaml => config::FileFormat::Yaml,
            FileFormat::Ini => config::FileFormat::Ini,
        }
    }
}

impl From<String> for FileFormat {
    fn from(s: String) -> Self {
        match s.to_lowercase().as_str() {
            "toml" => FileFormat::Toml,
            "json" => FileFormat::Json,
            "json5" => FileFormat::Json5,
            "ron" => FileFormat::Ron,
            "yaml" | "yml" => FileFormat::Yaml,
            "ini" => FileFormat::Ini,
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
    #[napi(factory, js_name = "withName")]
    pub fn with_name(name: String) -> Self {
        Self {
            name: Some(name),
            text: None,
            format: None,
            required: true,
        }
    }

    #[napi(factory, js_name = "fromStr", ts_args_type = "content: string, format: FileFormat | string")]
    pub fn from_str(content: String, format: napi::bindgen_prelude::Either<FileFormat, String>) -> Self {
        let fmt = match format {
            napi::bindgen_prelude::Either::A(f) => f,
            napi::bindgen_prelude::Either::B(s) => FileFormat::from(s),
        };
        Self {
            name: None,
            text: Some(content),
            format: Some(fmt),
            required: true,
        }
    }

    #[napi(factory, js_name = "new", ts_args_type = "nameOrText: string, format?: FileFormat | string")]
    pub fn new_factory(name_or_text: String, format: Option<napi::bindgen_prelude::Either<FileFormat, String>>) -> Self {
        Self::new(name_or_text, format.map(|f| match f {
            napi::bindgen_prelude::Either::A(fmt) => fmt,
            napi::bindgen_prelude::Either::B(s) => FileFormat::from(s),
        }))
    }

    #[napi(constructor, ts_args_type = "nameOrText: string, format?: FileFormat | string")]
    pub fn new(name_or_text: String, format: Option<FileFormat>) -> Self {
        Self {
            name: Some(name_or_text),
            text: None,
            format,
            required: true,
        }
    }

    #[napi(ts_args_type = "format: FileFormat | string")]
    pub fn format(&mut self, format: napi::bindgen_prelude::Either<FileFormat, String>) -> &Self {
        let fmt = match format {
            napi::bindgen_prelude::Either::A(f) => f,
            napi::bindgen_prelude::Either::B(s) => FileFormat::from(s),
        };
        self.format = Some(fmt);
        self
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        self.required = required;
        self
    }
}

impl Source for File {
    fn clone_into_box(&self) -> Box<dyn Source + Send + Sync> {
        Box::new(self.clone())
    }

    fn collect(&self) -> std::result::Result<config::Map<String, config::Value>, config::ConfigError> {
        if let Some(content) = &self.text {
            let fmt: config::FileFormat = self.format.expect("Format required for string source").into();
            let file_src = config::File::<config::FileSourceString, config::FileFormat>::from_str(content, fmt);
            file_src.collect()
        } else if let Some(name) = &self.name {
            let mut file_src = if let Some(fmt) = self.format {
                config::File::<config::FileSourceFile, config::FileFormat>::new(name, fmt.into())
            } else {
                config::File::<config::FileSourceFile, config::FileFormat>::with_name(name)
            };
            file_src = file_src.required(self.required);
            file_src.collect()
        } else {
            Ok(config::Map::new())
        }
    }
}
