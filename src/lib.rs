#[path = "builder.rs"]
pub(crate) mod builder;

#[path = "config.rs"]
pub(crate) mod config;

#[path = "file.rs"]
pub(crate) mod file;

#[path = "value.rs"]
pub(crate) mod value;

pub use builder::ConfigBuilder;
pub use builder::Environment;
pub use config::Config;
pub use file::File;
pub use file::FileFormat;
pub use value::Value;

pub(crate) struct BoxedSource(pub(crate) Box<dyn ::config::Source + Send + Sync>);

impl std::fmt::Debug for BoxedSource {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_tuple("BoxedSource").finish()
    }
}

impl ::config::Source for BoxedSource {
    fn clone_into_box(&self) -> Box<dyn ::config::Source + Send + Sync> {
        self.0.clone_into_box()
    }

    fn collect(
        &self,
    ) -> std::result::Result<::config::Map<String, ::config::Value>, ::config::ConfigError> {
        self.0.collect()
    }

    fn collect_to(
        &self,
        cache: &mut ::config::Value,
    ) -> std::result::Result<(), ::config::ConfigError> {
        self.0.collect_to(cache)
    }
}
