use napi_derive::napi;

#[napi(string_enum)]
#[derive(Clone, Debug, Copy)]
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

#[derive(Clone, Debug)]
pub(crate) enum FileSourceKind {
    File(config::File<config::FileSourceFile, config::FileFormat>),
    Str(config::File<config::FileSourceString, config::FileFormat>),
}

impl config::Source for FileSourceKind {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        match self {
            FileSourceKind::File(f) => f.clone_into_box(),
            FileSourceKind::Str(f) => f.clone_into_box(),
        }
    }

    fn collect(&self) -> std::result::Result<config::Map<String, config::Value>, config::ConfigError> {
        match self {
            FileSourceKind::File(f) => f.collect(),
            FileSourceKind::Str(f) => f.collect(),
        }
    }
}

#[napi]
#[derive(Clone)]
pub struct File {
    pub(crate) inner: FileSourceKind,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(
        name: String,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: Option<FileFormat>,
    ) -> Self {
        Self::with_name(name, format)
    }

    #[napi(factory)]
    pub fn with_name(
        name: String,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: Option<FileFormat>,
    ) -> Self {
        if let Some(fmt) = format {
            let f = config::File::with_name(&name).format(fmt.into());
            Self {
                inner: FileSourceKind::File(f),
            }
        } else {
            let f = config::File::with_name(&name);
            Self {
                inner: FileSourceKind::File(f),
            }
        }
    }

    #[napi(factory)]
    pub fn from_str(
        text: String,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: FileFormat,
    ) -> Self {
        let f: config::File<config::FileSourceString, config::FileFormat> =
            config::File::from_str(&text, format.into());
        Self {
            inner: FileSourceKind::Str(f),
        }
    }

    #[napi(factory)]
    pub fn from_filename(filename: String) -> Self {
        let f = config::File::with_name(&filename);
        Self {
            inner: FileSourceKind::File(f),
        }
    }

    #[napi]
    pub fn format(
        &mut self,
        #[napi(ts_arg_type = "FileFormat | 'Toml' | 'Json' | 'Yaml' | 'Ini' | 'Ron' | 'Json5'")]
        format: FileFormat,
    ) -> &Self {
        match &mut self.inner {
            FileSourceKind::File(f) => {
                *f = f.clone().format(format.into());
            }
            FileSourceKind::Str(f) => {
                *f = f.clone().format(format.into());
            }
        }
        self
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        match &mut self.inner {
            FileSourceKind::File(f) => {
                *f = f.clone().required(required);
            }
            FileSourceKind::Str(f) => {
                *f = f.clone().required(required);
            }
        }
        self
    }
}
