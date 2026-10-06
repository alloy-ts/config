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
pub use config::Value;
pub use file::File;
pub use file::FileFormat;

/// Wrapper that erases the concrete `config::Source` type so a `File` or an
/// `Environment` can both be handed to `ConfigBuilder::add_source`, which only
/// accepts a single `T: Source + Send + Sync + 'static`. `config` does not
/// implement `Source` for `Box<dyn Source + Send + Sync>`, so we provide this
/// newtype.
pub(crate) struct BoxedSource(pub(crate) Box<dyn config::Source + Send + Sync>);

impl std::fmt::Debug for BoxedSource {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_tuple("BoxedSource").finish()
    }
}

impl config::Source for BoxedSource {
    fn clone_into_box(&self) -> Box<dyn config::Source + Send + Sync> {
        self.0.clone_into_box()
    }

    fn collect(
        &self,
    ) -> std::result::Result<config::Map<String, config::Value>, config::ConfigError> {
        self.0.collect()
    }
}
