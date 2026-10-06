use std::collections::HashMap;
use napi_derive::napi;
use serde_json::Value as JsonValue;

pub(crate) fn config_value_to_json(val: &config::Value) -> JsonValue {
    match &val.kind {
        config::ValueKind::Nil => JsonValue::Null,
        config::ValueKind::Boolean(b) => JsonValue::Bool(*b),
        config::ValueKind::I64(i) => JsonValue::Number((*i).into()),
        config::ValueKind::I128(i) => JsonValue::String(i.to_string()),
        config::ValueKind::U64(u) => JsonValue::Number((*u).into()),
        config::ValueKind::U128(u) => JsonValue::String(u.to_string()),
        config::ValueKind::Float(f) => serde_json::Number::from_f64(*f)
            .map(JsonValue::Number)
            .unwrap_or(JsonValue::Null),
        config::ValueKind::String(s) => JsonValue::String(s.clone()),
        config::ValueKind::Table(t) => {
            let map: serde_json::Map<String, JsonValue> = t
                .iter()
                .map(|(k, v)| (k.clone(), config_value_to_json(v)))
                .collect();
            JsonValue::Object(map)
        }
        config::ValueKind::Array(a) => {
            let arr: Vec<JsonValue> = a.iter().map(config_value_to_json).collect();
            JsonValue::Array(arr)
        }
    }
}

#[napi(object)]
#[derive(Debug, Clone)]
pub struct ValueKind {
    pub kind: String,
    pub value: JsonValue,
}

impl From<config::ValueKind> for ValueKind {
    fn from(kind: config::ValueKind) -> Self {
        match kind {
            config::ValueKind::Nil => ValueKind {
                kind: "nil".into(),
                value: JsonValue::Null,
            },
            config::ValueKind::Boolean(b) => ValueKind {
                kind: "boolean".into(),
                value: JsonValue::Bool(b),
            },
            config::ValueKind::I64(i) => ValueKind {
                kind: "i64".into(),
                value: JsonValue::Number(i.into()),
            },
            config::ValueKind::I128(i) => ValueKind {
                kind: "i128".into(),
                value: JsonValue::String(i.to_string()),
            },
            config::ValueKind::U64(u) => ValueKind {
                kind: "u64".into(),
                value: JsonValue::Number(u.into()),
            },
            config::ValueKind::U128(u) => ValueKind {
                kind: "u128".into(),
                value: JsonValue::String(u.to_string()),
            },
            config::ValueKind::Float(f) => ValueKind {
                kind: "float".into(),
                value: serde_json::Number::from_f64(f)
                    .map(JsonValue::Number)
                    .unwrap_or(JsonValue::Null),
            },
            config::ValueKind::String(s) => ValueKind {
                kind: "string".into(),
                value: JsonValue::String(s),
            },
            config::ValueKind::Table(t) => {
                let map: HashMap<String, JsonValue> = t
                    .into_iter()
                    .map(|(k, v)| (k, config_value_to_json(&v)))
                    .collect();
                ValueKind {
                    kind: "table".into(),
                    value: serde_json::to_value(map).unwrap_or(JsonValue::Null),
                }
            }
            config::ValueKind::Array(a) => {
                let arr: Vec<JsonValue> = a.into_iter().map(|v| config_value_to_json(&v)).collect();
                ValueKind {
                    kind: "array".into(),
                    value: JsonValue::Array(arr),
                }
            }
        }
    }
}

#[napi]
#[derive(Clone, Debug)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(origin: Option<String>, kind: JsonValue) -> napi::Result<Self> {
        let config_val: config::Value = serde_json::from_value(kind)
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(Self {
            inner: config::Value::new(origin.as_ref(), config_val.kind),
        })
    }

    #[napi(getter)]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi(getter)]
    pub fn kind(&self) -> ValueKind {
        self.inner.kind.clone().into()
    }

    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner.clone().into_bool().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner.clone().into_int().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_int128(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_int128()
            .map(|i| i.to_string())
            .map_err(to_napi_err)
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        let val = self.inner.clone().into_uint().map_err(to_napi_err)?;
        i64::try_from(val).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<String> {
        self.inner
            .clone()
            .into_uint128()
            .map(|u| u.to_string())
            .map_err(to_napi_err)
    }

    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner.clone().into_float().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner.clone().into_string().map_err(to_napi_err)
    }

    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self.inner.clone().into_array().map_err(to_napi_err)?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self.inner.clone().into_table().map_err(to_napi_err)?;
        Ok(table.into_iter().map(|(k, v)| (k, Value { inner: v })).collect())
    }

    #[napi]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        Ok(config_value_to_json(&self.inner))
    }
}

pub(crate) fn to_napi_err(err: config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
