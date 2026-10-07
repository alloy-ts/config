use napi_derive::napi;
use std::collections::HashMap;

/// Schema for configuration. Can contain multiple configs bound to different paths.
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigSchema {
    coerce_serde_enums: bool,
    prefixes: HashMap<String, String>,
}

#[napi]
impl ConfigSchema {
    #[napi(constructor)]
    pub fn new(prefix: Option<String>) -> Self {
        let mut prefixes = HashMap::new();
        if let Some(p) = prefix {
            prefixes.insert(p.clone(), p);
        }
        Self {
            coerce_serde_enums: false,
            prefixes,
        }
    }

    #[napi]
    pub fn coerce_serde_enums(&mut self, coerce: bool) -> &Self {
        self.coerce_serde_enums = coerce;
        self
    }

    #[napi]
    pub fn insert(&mut self, prefix: String, target_prefix: String) -> &Self {
        self.prefixes.insert(prefix, target_prefix);
        self
    }

    #[napi]
    pub fn locate(&self, prefix: String) -> Option<String> {
        self.prefixes.get(&prefix).cloned()
    }

    #[napi]
    pub fn prefixes(&self) -> Vec<String> {
        self.prefixes.keys().cloned().collect()
    }
}
