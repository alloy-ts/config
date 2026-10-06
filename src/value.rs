use napi_derive::napi;

#[napi]
#[derive(Clone, Debug)]
pub struct Value {
    pub(crate) inner: config::Value,
}

#[napi]
impl Value {
    #[napi(constructor)]
    pub fn new(env: napi::Env, value: Option<napi::Unknown>, origin: Option<String>) -> napi::Result<Self> {
        let inner = match value {
            Some(val) => {
                let serde_val: serde_json::Value = env.from_js_value(val)?;
                let mut v: config::Value = serde_json::from_value(serde_val)
                    .map_err(|e| napi::Error::from_reason(e.to_string()))?;
                if let Some(orig) = origin {
                    v = config::Value::new(Some(&orig), v.kind);
                }
                v
            }
            None => config::Value::default(),
        };
        Ok(Self { inner })
    }

    #[napi]
    pub fn origin(&self) -> Option<String> {
        self.inner.origin().map(|s| s.to_string())
    }

    #[napi]
    pub fn into_bool(&self) -> napi::Result<bool> {
        self.inner.clone().into_bool().map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int(&self) -> napi::Result<i64> {
        self.inner.clone().into_int().map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_int128(&self) -> napi::Result<String> {
        self.inner.clone().into_int128().map(|i| i.to_string()).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint(&self) -> napi::Result<i64> {
        self.inner.clone().into_uint().map(|u| u as i64).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_uint128(&self) -> napi::Result<String> {
        self.inner.clone().into_uint128().map(|u| u.to_string()).map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_float(&self) -> napi::Result<f64> {
        self.inner.clone().into_float().map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_string(&self) -> napi::Result<String> {
        self.inner.clone().into_string().map_err(|e| napi::Error::from_reason(e.to_string()))
    }

    #[napi]
    pub fn into_array(&self) -> napi::Result<Vec<Value>> {
        let arr = self.inner.clone().into_array().map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(arr.into_iter().map(|v| Value { inner: v }).collect())
    }

    #[napi]
    pub fn into_table(&self) -> napi::Result<std::collections::HashMap<String, Value>> {
        let map = self.inner.clone().into_table().map_err(|e| napi::Error::from_reason(e.to_string()))?;
        Ok(map.into_iter().map(|(k, v)| (k, Value { inner: v })).collect())
    }

    #[napi]
    pub fn try_deserialize(&self, env: napi::Env) -> napi::Result<napi::Unknown> {
        let serde_val: serde_json::Value = self.inner.clone().try_deserialize()
            .map_err(|e| napi::Error::from_reason(e.to_string()))?;
        env.to_js_value(&serde_val)
    }
}
