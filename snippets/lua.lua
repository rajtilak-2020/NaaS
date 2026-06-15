local http = require("socket.http")
local json = require("json")

local response, status = http.request("https://no.krajtilak.in/api/no")
if status == 200 then
    local data = json.decode(response)
    print("Excuse: " .. data.reason)
else
    print("Request failed: " .. tostring(status))
end