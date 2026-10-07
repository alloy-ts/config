pub type ValidateResult<T> = Result<T, ValidationResult>;

#[derive(Debug, Clone, Default)]
pub struct ValidationResult {
    pub issues: Vec<ValidationErrorIssue>,
}

#[derive(Debug, Clone)]
pub struct ValidationErrorIssue {
    pub path: Vec<String>,
    pub message: String,
}

impl ValidationResult {
    pub fn new() -> Self {
        Self { issues: Vec::new() }
    }

    pub fn is_empty(&self) -> bool {
        self.issues.is_empty()
    }

    pub fn prefix_path(&mut self, prefix: String) {
        for issue in &mut self.issues {
            issue.path.insert(0, prefix.clone());
        }
    }

    pub fn merge(&mut self, other: ValidationResult) {
        self.issues.extend(other.issues);
    }

    pub fn add_error_at_path(&mut self, path: Vec<String>, err: ValidationError) {
        self.issues.push(ValidationErrorIssue {
            path,
            message: err.message,
        });
    }
}

impl From<ValidationError> for ValidationResult {
    fn from(err: ValidationError) -> Self {
        Self {
            issues: vec![ValidationErrorIssue {
                path: vec![],
                message: err.message,
            }],
        }
    }
}

#[derive(Debug, Clone)]
pub struct ValidationError {
    pub message: String,
}

impl ValidationError {
    pub fn custom(msg: impl Into<String>) -> Self {
        Self { message: msg.into() }
    }

    pub fn required() -> Self {
        Self {
            message: "Required".into(),
        }
    }

    pub fn invalid_type(expected: ValidationType, received: ValidationType) -> Self {
        Self {
            message: format!("Expected {:?}, received {:?}", expected, received),
        }
    }

    pub fn too_small(origin: ValidationOrigin, limit: String, inclusive: bool) -> Self {
        Self {
            message: format!(
                "Too small in {:?}: limit {} (inclusive: {})",
                origin, limit, inclusive
            ),
        }
    }

    pub fn too_big(origin: ValidationOrigin, limit: String, inclusive: bool) -> Self {
        Self {
            message: format!(
                "Too big in {:?}: limit {} (inclusive: {})",
                origin, limit, inclusive
            ),
        }
    }

    pub fn invalid_format(format: StringFormat, arg: Option<String>) -> Self {
        Self {
            message: format!("Invalid format {:?} ({:?})", format, arg),
        }
    }

    pub fn invalid_number(constraint: NumberConstraint) -> Self {
        Self {
            message: format!("Invalid number constraint: {:?}", constraint),
        }
    }

    pub fn invalid_value<T: std::fmt::Debug>(val: T) -> Self {
        Self {
            message: format!("Invalid value: {:?}", val),
        }
    }

    pub fn unrecognized_keys(keys: Vec<String>) -> Self {
        Self {
            message: format!("Unrecognized keys: {:?}", keys),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ValidationType {
    String,
    Number,
    Bool,
    Null,
    Array,
    Object,
    Custom(String),
}

impl ValidationType {
    pub fn custom(s: &str) -> Self {
        ValidationType::Custom(s.to_string())
    }
}

impl From<&serde_json::Value> for ValidationType {
    fn from(val: &serde_json::Value) -> Self {
        match val {
            serde_json::Value::Null => ValidationType::Null,
            serde_json::Value::Bool(_) => ValidationType::Bool,
            serde_json::Value::Number(_) => ValidationType::Number,
            serde_json::Value::String(_) => ValidationType::String,
            serde_json::Value::Array(_) => ValidationType::Array,
            serde_json::Value::Object(_) => ValidationType::Object,
        }
    }
}

#[derive(Debug, Clone)]
pub enum ValidationOrigin {
    String,
    Number,
    Array,
}

#[derive(Debug, Clone)]
pub enum StringFormat {
    StartsWith,
    EndsWith,
    Includes,
    Regex,
    Custom(String),
}

impl StringFormat {
    pub fn custom(s: &str) -> Self {
        StringFormat::Custom(s.to_string())
    }
}

#[derive(Debug, Clone)]
pub enum NumberConstraint {
    Finite,
    Positive,
    Negative,
    NonNegative,
    NonPositive,
}
