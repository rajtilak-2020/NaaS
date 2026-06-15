using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        using HttpClient client = new HttpClient();
        string response = await client.GetStringAsync("https://no.krajtilak.in/api/no");
        using JsonDocument doc = JsonDocument.Parse(response);
        string reason = doc.RootElement.GetProperty("reason").GetString();
        Console.WriteLine($"Excuse: {reason}");
    }
}