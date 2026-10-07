use alloy_config::{ConfigBuilder, File, FileFormat};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file_source = File::from_str(
        r#"{
            "server": {
                "host": "127.0.0.1",
                "port": 8000
            }
        }"#.to_string(),
        napi::bindgen_prelude::Either::B(FileFormat::Json),
    )?;

    let mut builder = ConfigBuilder::new();
    builder.set_default("server.port".to_string(), serde_json::json!(8080))?;
    builder.add_source(napi::bindgen_prelude::Either3::A(&file_source));
    builder.set_override("server.port".to_string(), serde_json::json!(9000))?;

    let config = builder.build()?;

    let host = config.get_string("server.host".to_string())?;
    let port = config.get_int("server.port".to_string())?;

    println!("Server host: {}", host);
    println!("Server port: {}", port);

    Ok(())
}
