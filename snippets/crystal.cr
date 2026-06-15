require "http/client"
require "json"

response = HTTP::Client.get("https://no.krajtilak.in/api/no")
if response.status_code == 200
  data = JSON.parse(response.body)
  puts "Excuse: #{data["reason"]}"
end