use serde_json::Value;
use crate::zod_rs_util::ValidateResult;

pub trait Schema<T>: Send + Sync {
    fn validate(&self, value: &Value) -> ValidateResult<T>;
}

pub use crate::r#type::array::array;
pub use crate::r#type::boolean::boolean;
pub use crate::r#type::literal::literal;
pub use crate::r#type::null::null;
pub use crate::r#type::number::number;
pub use crate::r#type::object::object;
pub use crate::r#type::optional::optional;
pub use crate::r#type::string::string;
pub use crate::r#type::tuple::tuple;
