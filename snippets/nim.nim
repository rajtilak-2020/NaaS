import httpclient, json

let client = newHttpClient()
let response = client.getContent("https://no.krajtilak.in/api/no")
let data = parseJson(response)
echo "Excuse: ", data["reason"].getStr()