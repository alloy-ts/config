use alloy_config::{Config, File, FileFormat};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file_source = File::from_str(
        r#"{
            "server": {
                "host": "127.0.0.1",
                "port": 8000
            }
        }"#,
        FileFormat::Json,
    )?;

    let config = Config::builder()
        .set_default("server.port", 8080)?
        .add_source(&file_source)
        .set_override("server.port", 9000)?
        .build()?;

    let host = config.get_string("server.host".to_string())?;
    let port = config.get_int("server.port".to_string())?;

    println!("Server host: {}", host);
    println!("Server port: {}", port);

    Ok(())
}
