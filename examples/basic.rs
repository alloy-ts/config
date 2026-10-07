use alloy_config::{Config, ConfigBuilder};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut builder = ConfigBuilder::new();
    builder.set_default("host".to_string(), serde_json::json!("localhost"))?;
    builder.set_default("port".to_string(), serde_json::json!(8080))?;

    let config: Config = builder.build()?;

    println!("Host: {}", config.get_string("host".to_string())?);
    println!("Port: {}", config.get_int("port".to_string())?);

    Ok(())
}
