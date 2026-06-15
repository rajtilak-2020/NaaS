using HTTP
using JSON

response = HTTP.get("https://no.krajtilak.in/api/no")
data = JSON.parse(String(response.body))
println("Excuse: ", data["reason"])