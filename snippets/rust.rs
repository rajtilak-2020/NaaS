use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiResponse {
    id: u32,
    reason: String,
    category: String,
    severity: String,
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let url = "https://no.krajtilak.in/api/no";
    let res = reqwest::get(url)
        .await?
        .json::<ApiResponse>()
        .await?;
    println!("Reason: {}", res.reason);
    Ok(())
}