use napi_derive::napi;

#[napi]
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

#[derive(Clone)]
pub(crate) enum FileSourceInner {
    File(config::File<config::FileSourceFile, config::FileFormat>),
    String(config::File<config::FileSourceString, config::FileFormat>),
}

#[napi]
#[derive(Clone)]
pub struct File {
    pub(crate) inner: FileSourceInner,
}

#[napi]
impl File {
    #[napi(constructor)]
    pub fn new(name: String, format: FileFormat) -> Self {
        let fmt: config::FileFormat = format.into();
        Self {
            inner: FileSourceInner::File(config::File::new(&name, fmt)),
        }
    }

    #[napi(factory)]
    pub fn with_name(name: String) -> Self {
        Self {
            inner: FileSourceInner::File(config::File::with_name(&name)),
        }
    }

    #[napi(factory)]
    pub fn from_str(content: String, format: FileFormat) -> Self {
        let fmt: config::FileFormat = format.into();
        Self {
            inner: FileSourceInner::String(config::File::from_str(&content, fmt)),
        }
    }

    #[napi]
    pub fn required(&mut self, required: bool) -> &Self {
        self.inner = match &self.inner {
            FileSourceInner::File(f) => FileSourceInner::File(f.clone().required(required)),
            FileSourceInner::String(f) => FileSourceInner::String(f.clone().required(required)),
        };
        self
    }
}

#[napi]
#[derive(Clone)]
pub struct Environment {
    pub(crate) inner: config::Environment,
}

#[napi]
impl Environment {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            inner: config::Environment::default(),
        }
    }

    #[napi(factory)]
    pub fn with_prefix(prefix: String) -> Self {
        Self {
            inner: config::Environment::with_prefix(&prefix),
        }
    }

    #[napi]
    pub fn separator(&mut self, separator: String) -> &Self {
        self.inner = self.inner.clone().separator(&separator);
        self
    }

    #[napi]
    pub fn keep_prefix(&mut self, keep: bool) -> &Self {
        self.inner = self.inner.clone().keep_prefix(keep);
        self
    }
}
