use std::collections::HashMap;
use napi_derive::napi;
use serde_json::Value as JsonValue;

pub fn config_value_to_json(val: &config::Value) -> JsonValue {
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

pub fn json_to_config_value(val: &JsonValue) -> napi::Result<config::Value> {
    match val {
        JsonValue::Null => Ok(config::Value::new(None, config::ValueKind::Nil)),
        JsonValue::Bool(b) => Ok(config::Value::new(None, *b)),
        JsonValue::Number(n) => {
            if let Some(i) = n.as_i64() {
                Ok(config::Value::new(None, i))
            } else if let Some(u) = n.as_u64() {
                Ok(config::Value::new(None, u as i64))
            } else if let Some(f) = n.as_f64() {
                Ok(config::Value::new(None, f))
            } else {
                Ok(config::Value::new(None, config::ValueKind::Nil))
            }
        }
        JsonValue::String(s) => Ok(config::Value::new(None, s.clone())),
        JsonValue::Array(arr) => {
            let mut config_arr = Vec::new();
            for item in arr {
                config_arr.push(json_to_config_value(item)?);
            }
            Ok(config::Value::new(None, config_arr))
        }
        JsonValue::Object(map) => {
            let mut config_map = config::Map::new();
            for (k, v) in map {
                config_map.insert(k.clone(), json_to_config_value(v)?);
            }
            Ok(config::Value::new(None, config_map))
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
    #[napi(factory, js_name = "new", ts_args_type = "val: any, origin?: string")]
    pub fn new(val: JsonValue, origin: Option<String>) -> napi::Result<Self> {
        let mut config_val = json_to_config_value(&val)?;
        if let Some(orig) = origin {
            config_val = config::Value::new(Some(&orig), config_val.kind);
        }
        Ok(Self { inner: config_val })
    }

    #[napi(constructor, ts_args_type = "val: any, origin?: string")]
    pub fn new_constructor(val: JsonValue, origin: Option<String>) -> napi::Result<Self> {
        Self::new(val, origin)
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi(getter)]
    pub fn kind(&self) -> ValueKind {
        self.inner.kind.clone().into()
    }

    #[napi(js_name = "intoBool")]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner.clone().into_bool().map_err(to_napi_err)
    }

    #[napi(js_name = "intoInt")]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner.clone().into_int().map_err(to_napi_err)
    }

    #[napi(js_name = "intoInt128")]
    pub fn into_int128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_int128()
            .map_err(to_napi_err)
            .and_then(|i| i64::try_from(i).map_err(|e| napi::Error::from_reason(e.to_string())))
    }

    #[napi(js_name = "intoUint")]
    pub fn into_uint(&self) -> napi::Result<i64> {
        let val = self.inner.clone().into_uint().map_err(to_napi_err)?;
        i64::try_from(val).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi(js_name = "intoUint128")]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(to_napi_err)
            .and_then(|u| i64::try_from(u).map_err(|e| napi::Error::from_reason(e.to_string())))
    }

    #[napi(js_name = "intoFloat")]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner.clone().into_float().map_err(to_napi_err)
    }

    #[napi(js_name = "intoString")]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner.clone().into_string().map_err(to_napi_err)
    }

    #[napi(js_name = "intoArray")]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self.inner.clone().into_array().map_err(to_napi_err)?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi(js_name = "intoTable")]
    pub fn into_table(&self) -> napi::Result<HashMap<String, Value>> {
        let table = self.inner.clone().into_table().map_err(to_napi_err)?;
        Ok(table.into_iter().map(|(k, v)| (k, Value { inner: v })).collect())
    }

    #[napi(js_name = "tryDeserialize")]
    pub fn try_deserialize(&self) -> napi::Result<JsonValue> {
        Ok(config_value_to_json(&self.inner))
    }
}

pub(crate) fn to_napi_err(err: config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
