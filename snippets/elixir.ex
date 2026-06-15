# Requires HTTPoison and Poison
url = "https://no.krajtilak.in/api/no"
case HTTPoison.get(url) do
  {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
    data = Poison.decode!(body)
    IO.puts("Reason: #{data["reason"]}")
  {:error, %HTTPoison.Error{reason: reason}} ->
    IO.puts("Failed: #{reason}")
end