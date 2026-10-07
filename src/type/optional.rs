use crate::schema::Schema;
use crate::zod_rs_util::ValidateResult;
use serde_json::Value;
use std::fmt::Debug;

#[derive(Debug, Clone)]
pub struct OptionalSchema<S, T> {
    inner: S,
    _phantom: std::marker::PhantomData<T>,
}

impl<S, T> OptionalSchema<S, T> {
    pub fn new(inner: S) -> Self {
        Self {
            inner,
            _phantom: std::marker::PhantomData,
        }
    }
}

impl<S, T> Schema<Option<T>> for OptionalSchema<S, T>
where
    S: Schema<T>,
    T: Debug + Send + Sync,
{
    fn validate(&self, value: &Value) -> ValidateResult<Option<T>> {
        if value.is_null() {
            Ok(None)
        } else {
            self.inner.validate(value).map(Some)
        }
    }
}

pub fn optional<S, T>(schema: S) -> OptionalSchema<S, T> {
    OptionalSchema::new(schema)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schema::{boolean, number, string};
    use serde_json::json;

    #[test]
    fn test_optional_validation() {
        let schema = optional(string());

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!("hello")).is_ok());
        assert!(schema.validate(&json!(123)).is_err());
    }

    #[test]
    fn test_null_returns_none() {
        let schema = optional(string());
        let result = schema.validate(&json!(null));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), None);
    }

    #[test]
    fn test_value_returns_some() {
        let schema = optional(string());
        let result = schema.validate(&json!("hello"));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some("hello".to_string()));
    }

    #[test]
    fn test_empty_string_is_not_null() {
        let schema = optional(string());
        let result = schema.validate(&json!(""));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some("".to_string()));
    }

    #[test]
    fn test_zero_is_not_null() {
        let schema = optional(number());
        let result = schema.validate(&json!(0));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some(0.0));
    }

    #[test]
    fn test_false_is_not_null() {
        let schema = optional(boolean());
        let result = schema.validate(&json!(false));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some(false));
    }

    #[test]
    fn test_optional_with_min_length() {
        let schema = optional(string().min(5));

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!("hello")).is_ok());
        assert!(schema.validate(&json!("hi")).is_err());
    }

    #[test]
    fn test_optional_with_positive_number() {
        let schema = optional(number().positive());

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!(5)).is_ok());
        assert!(schema.validate(&json!(-5)).is_err());
        assert!(schema.validate(&json!(0)).is_err());
    }

    #[test]
    fn test_optional_with_int() {
        let schema = optional(number().int());

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!(5)).is_ok());
        assert!(schema.validate(&json!(5.5)).is_err());
    }

    #[test]
    fn test_optional_string_rejects_number() {
        let schema = optional(string());
        assert!(schema.validate(&json!(123)).is_err());
    }

    #[test]
    fn test_optional_number_rejects_string() {
        let schema = optional(number());
        assert!(schema.validate(&json!("123")).is_err());
    }

    #[test]
    fn test_optional_rejects_array() {
        let schema = optional(string());
        assert!(schema.validate(&json!(["hello"])).is_err());
    }

    #[test]
    fn test_optional_rejects_object() {
        let schema = optional(string());
        assert!(schema.validate(&json!({"value": "hello"})).is_err());
    }

    #[test]
    fn test_schema_optional_method() {
        let schema = string().min(3).optional();

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!("hello")).is_ok());
        assert!(schema.validate(&json!("hi")).is_err());
    }

    #[test]
    fn test_number_optional_method() {
        let schema = number().positive().optional();

        assert!(schema.validate(&json!(null)).is_ok());
        assert!(schema.validate(&json!(5)).is_ok());
        assert!(schema.validate(&json!(-5)).is_err());
    }

    #[test]
    fn test_double_optional() {
        let schema = optional(optional(string()));

        let result = schema.validate(&json!(null));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), None);

        let result = schema.validate(&json!("hello"));
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some(Some("hello".to_string())));
    }
}
