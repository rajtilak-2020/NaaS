$response = Invoke-RestMethod -Uri "https://no.krajtilak.in/api/no" -Method Get
Write-Output "Excuse: $($response.reason)"