use my_addon_native::Config;

#[test]
fn test_config_builder() {
    let builder = Config::builder().set_default("key", "value").unwrap();

    let cfg = builder.build().unwrap();
    assert_eq!(cfg.get_string("key").unwrap(), "value");
}
