use std::collections::HashMap;
use napi_derive::napi;

pub(crate) fn json_to_config_value(json: serde_json::Value) -> napi::Result<config::Value> {
    match json {
        serde_json::Value::Null => Ok(config::Value::new(None, config::ValueKind::Nil)),
        serde_json::Value::Bool(b) => Ok(config::Value::new(None, config::ValueKind::Boolean(b))),
        serde_json::Value::Number(n) => {
            if let Some(i) = n.as_i64() {
                Ok(config::Value::new(None, config::ValueKind::I64(i)))
            } else if let Some(u) = n.as_u64() {
                Ok(config::Value::new(None, config::ValueKind::U64(u)))
            } else if let Some(f) = n.as_f64() {
                Ok(config::Value::new(None, config::ValueKind::Float(f)))
            } else {
                Err(napi::Error::from_reason("Invalid number"))
            }
        }
        serde_json::Value::String(s) => Ok(config::Value::new(None, config::ValueKind::String(s))),
        serde_json::Value::Array(arr) => {
            let mut list = Vec::new();
            for item in arr {
                list.push(json_to_config_value(item)?);
            }
            Ok(config::Value::new(None, config::ValueKind::Array(list)))
        }
        serde_json::Value::Object(obj) => {
            let mut map = config::Map::new();
            for (k, v) in obj {
                map.insert(k, json_to_config_value(v)?);
            }
            Ok(config::Value::new(None, config::ValueKind::Table(map)))
        }
    }
}

pub(crate) fn config_value_to_json(val: &config::Value) -> serde_json::Value {
    match &val.kind {
        config::ValueKind::Nil => serde_json::Value::Null,
        config::ValueKind::Boolean(b) => serde_json::Value::Bool(*b),
        config::ValueKind::I64(i) => serde_json::Value::Number((*i).into()),
        config::ValueKind::I128(i) => {
            if let Ok(i64_val) = i64::try_from(*i) {
                serde_json::Value::Number(i64_val.into())
            } else {
                serde_json::Value::String(i.to_string())
            }
        }
        config::ValueKind::U64(u) => serde_json::Value::Number((*u).into()),
        config::ValueKind::U128(u) => {
            if let Ok(u64_val) = u64::try_from(*u) {
                serde_json::Value::Number(u64_val.into())
            } else {
                serde_json::Value::String(u.to_string())
            }
        }
        config::ValueKind::Float(f) => serde_json::Number::from_f64(*f)
            .map(serde_json::Value::Number)
            .unwrap_or(serde_json::Value::Null),
        config::ValueKind::String(s) => serde_json::Value::String(s.clone()),
        config::ValueKind::Table(t) => {
            let map: serde_json::Map<String, serde_json::Value> = t
                .iter()
                .map(|(k, v)| (k.clone(), config_value_to_json(v)))
                .collect();
            serde_json::Value::Object(map)
        }
        config::ValueKind::Array(a) => {
            let arr: Vec<serde_json::Value> = a.iter().map(config_value_to_json).collect();
            serde_json::Value::Array(arr)
        }
    }
}

#[napi(object)]
#[derive(Debug, Clone)]
pub struct ValueKind {
    pub kind: String,
    pub value: serde_json::Value,
}

impl From<config::ValueKind> for ValueKind {
    fn from(kind: config::ValueKind) -> Self {
        match kind {
            config::ValueKind::Nil => ValueKind {
                kind: "nil".into(),
                value: serde_json::Value::Null,
            },
            config::ValueKind::Boolean(b) => ValueKind {
                kind: "boolean".into(),
                value: serde_json::Value::Bool(b),
            },
            config::ValueKind::I64(i) => ValueKind {
                kind: "i64".into(),
                value: serde_json::Value::Number(i.into()),
            },
            config::ValueKind::I128(i) => ValueKind {
                kind: "i128".into(),
                value: if let Ok(i64_val) = i64::try_from(i) {
                    serde_json::Value::Number(i64_val.into())
                } else {
                    serde_json::Value::String(i.to_string())
                },
            },
            config::ValueKind::U64(u) => ValueKind {
                kind: "u64".into(),
                value: serde_json::Value::Number(u.into()),
            },
            config::ValueKind::U128(u) => ValueKind {
                kind: "u128".into(),
                value: if let Ok(u64_val) = u64::try_from(u) {
                    serde_json::Value::Number(u64_val.into())
                } else {
                    serde_json::Value::String(u.to_string())
                },
            },
            config::ValueKind::Float(f) => ValueKind {
                kind: "float".into(),
                value: serde_json::Number::from_f64(f)
                    .map(serde_json::Value::Number)
                    .unwrap_or(serde_json::Value::Null),
            },
            config::ValueKind::String(s) => ValueKind {
                kind: "string".into(),
                value: serde_json::Value::String(s),
            },
            config::ValueKind::Table(t) => {
                let map: HashMap<String, serde_json::Value> = t
                    .into_iter()
                    .map(|(k, v)| (k, config_value_to_json(&v)))
                    .collect();
                ValueKind {
                    kind: "table".into(),
                    value: serde_json::to_value(map).unwrap_or(serde_json::Value::Null),
                }
            }
            config::ValueKind::Array(a) => {
                let arr: Vec<serde_json::Value> = a.into_iter().map(|v| config_value_to_json(&v)).collect();
                ValueKind {
                    kind: "array".into(),
                    value: serde_json::Value::Array(arr),
                }
            }
        }
    }
}

#[napi]
#[derive(Clone, Debug, PartialEq)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(value: serde_json::Value, origin: Option<String>) -> napi::Result<Self> {
        let config_val = json_to_config_value(value)?;
        Ok(Self {
            inner: config::Value::new(origin.as_ref(), config_val.kind),
        })
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
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("i128 overflow")))
    }

    #[napi(js_name = "intoUint")]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint()
            .map_err(to_napi_err)
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u64 overflow")))
    }

    #[napi(js_name = "intoUint128")]
    pub fn into_uint128(&self) -> napi::Result<i64> {
        self.inner
            .clone()
            .into_uint128()
            .map_err(to_napi_err)
            .and_then(|val| val.try_into().map_err(|_| napi::Error::from_reason("u128 overflow")))
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
    pub fn try_deserialize(&self) -> napi::Result<serde_json::Value> {
        Ok(config_value_to_json(&self.inner))
    }
}

pub(crate) fn to_napi_err(err: config::ConfigError) -> napi::Error {
    napi::Error::from_reason(err.to_string())
}
