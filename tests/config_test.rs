use alloy_config::Config;

#[test]
fn test_config_builder() {
    let mut builder = Config::builder();
    builder
        .set_default("key".to_string(), serde_json::json!("value"))
        .unwrap();

    let cfg = builder.build().unwrap();
    assert_eq!(cfg.get_string("key".to_string()).unwrap(), "value");
}
