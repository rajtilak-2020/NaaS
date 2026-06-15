import requests

url = "https://no.krajtilak.in/api/no"
try:
    response = requests.get(url)
    data = response.json()
    print(f"Excuse: {data['reason']}")
except Exception as e:
    print(f"Failed to fetch: {e}")