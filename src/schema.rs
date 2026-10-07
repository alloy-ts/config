use napi_derive::napi;
use serde_json::Value as JsonValue;

/// Schema for configuration.
#[napi]
#[derive(Debug, Clone, Default)]
pub struct ConfigSchema {
    pub(crate) schema: JsonValue,
}

#[napi]
impl ConfigSchema {
    #[napi(constructor)]
    pub fn new(schema: Option<JsonValue>) -> Self {
        Self {
            schema: schema.unwrap_or(JsonValue::Null),
        }
    }

    #[napi(factory)]
    pub fn from_json(schema: JsonValue) -> Self {
        Self { schema }
    }

    #[napi(getter)]
    pub fn raw(&self) -> JsonValue {
        self.schema.clone()
    }
}
