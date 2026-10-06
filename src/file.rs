use napi_derive::napi;

#[napi]
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

#[napi]
#[derive(Clone, Debug)]
pub struct FileSourceFile {
  pub name: String,
}

#[napi]
#[derive(Clone, Debug)]
pub struct FileSourceString {
  pub content: String,
}

#[napi]
#[derive(Clone, Debug)]
pub struct File {
  pub(crate) name: Option<String>,
  pub(crate) content: Option<String>,
  pub(crate) format: Option<FileFormat>,
  pub(crate) required: bool,
}

#[napi]
impl File {
  #[napi(constructor)]
  pub fn new(name: String, format: Option<FileFormat>) -> Self {
    File {
      name: Some(name),
      content: None,
      format,
      required: true,
    }
  }

  #[napi(factory)]
  pub fn with_name(base_name: String) -> Self {
    File {
      name: Some(base_name),
      content: None,
      format: None,
      required: true,
    }
  }

  #[napi(factory)]
  pub fn from_str(s: String, format: FileFormat) -> Self {
    File {
      name: None,
      content: Some(s),
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
