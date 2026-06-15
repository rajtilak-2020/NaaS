interface ApiResponse {
  id: number;
  reason: string;
  category: string;
  severity: string;
  timestamp: string;
}

fetch('https://no.krajtilak.in/api/no')
  .then(res => res.json() as Promise<ApiResponse>)
  .then(data => console.log(`[No #${data.id}] ${data.reason}`))
  .catch(err => console.error(err));