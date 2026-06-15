export interface Snippet {
  name: string;
  key: string;
  extension: string;
  langClass: string;
  generator: (url: string) => string;
}

export const SNIPPETS: Snippet[] = [
  {
    name: 'curl',
    key: 'curl',
    extension: 'sh',
    langClass: 'bash',
    generator: (url) => `curl -X GET "${url}"`
  },
  {
    name: 'JavaScript',
    key: 'javascript',
    extension: 'js',
    langClass: 'javascript',
    generator: (url) => `fetch('${url}')
  .then(response => response.json())
  .then(data => console.log('Excuse: ', data.reason))
  .catch(error => console.error('Error:', error));`
  },
  {
    name: 'TypeScript',
    key: 'typescript',
    extension: 'ts',
    langClass: 'typescript',
    generator: (url) => `interface ApiResponse {
  id: number;
  reason: string;
  category: string;
  severity: string;
  timestamp: string;
}

fetch('${url}')
  .then(res => res.json() as Promise<ApiResponse>)
  .then(data => console.log(\`[No #\${data.id}] \${data.reason}\`))
  .catch(err => console.error(err));`
  },
  {
    name: 'Python',
    key: 'python',
    extension: 'py',
    langClass: 'python',
    generator: (url) => `import requests

url = "${url}"
try:
    response = requests.get(url)
    data = response.json()
    print(f"Excuse: {data['reason']}")
except Exception as e:
    print(f"Failed to fetch: {e}")`
  },
  {
    name: 'Go',
    key: 'go',
    extension: 'go',
    langClass: 'go',
    generator: (url) => `package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Response struct {
	ID       int    \`json:"id"\`
	Reason   string \`json:"reason"\`
	Category string \`json:"category"\`
	Severity string \`json:"severity"\`
}

func main() {
	res, err := http.Get("${url}")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	var data Response
	json.Unmarshal(body, &data)
	fmt.Printf("No: %s\\n", data.Reason)
}`
  },
  {
    name: 'Ruby',
    key: 'ruby',
    extension: 'rb',
    langClass: 'ruby',
    generator: (url) => `require 'net/http'
require 'json'
require 'uri'

uri = URI('${url}')
response = Net::HTTP.get(uri)
data = JSON.parse(response)
puts "Reason to say no: #{data['reason']}"`
  },
  {
    name: 'Rust',
    key: 'rust',
    extension: 'rs',
    langClass: 'rust',
    generator: (url) => `use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiResponse {
    id: u32,
    reason: String,
    category: String,
    severity: String,
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let url = "${url}";
    let res = reqwest::get(url)
        .await?
        .json::<ApiResponse>()
        .await?;
    println!("Reason: {}", res.reason);
    Ok(())
}`
  },
  {
    name: 'PHP',
    key: 'php',
    extension: 'php',
    langClass: 'php',
    generator: (url) => `<?php
$url = "${url}";
$response = file_get_contents($url);
if ($response !== false) {
    $data = json_decode($response, true);
    echo "Excuse: " . $data['reason'] . "\\n";
} else {
    echo "Request failed.\\n";
}
?>`
  },
  {
    name: 'Swift',
    key: 'swift',
    extension: 'swift',
    langClass: 'swift',
    generator: (url) => `import Foundation

struct NaasResponse: Codable {
    let id: Int
    let reason: String
    let category: String
    let severity: String
}

let url = URL(string: "${url}")!
let task = URLSession.shared.dataTask(with: url) { data, response, error in
    if let data = data {
        if let res = try? JSONDecoder().decode(NaasResponse.self, from: data) {
            print("No: \\(res.reason)")
        }
    }
}
task.resume()`
  },
  {
    name: 'Objective-C',
    key: 'objectivec',
    extension: 'm',
    langClass: 'objectivec',
    generator: (url) => `#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"${url}"];
        NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithURL:url
            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                if (data) {
                    NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                    NSLog(@"Excuse: %@", json[@"reason"]);
                }
            }];
        [task resume];
        [[NSRunLoop currentRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:2]];
    }
    return 0;
}`
  },
  {
    name: 'Kotlin',
    key: 'kotlin',
    extension: 'kt',
    langClass: 'kotlin',
    generator: (url) => `import java.net.URL
import org.json.JSONObject

fun main() {
    try {
        val response = URL("${url}").readText()
        val json = JSONObject(response)
        println("No: \${json.getString("reason")}")
    } catch (e: Exception) {
        println("Error: \${e.message}")
    }
}`
  },
  {
    name: 'Java',
    key: 'java',
    extension: 'java',
    langClass: 'java',
    generator: (url) => `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class NaasExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${url}"))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response.body());
    }
}`
  },
  {
    name: 'C#',
    key: 'csharp',
    extension: 'cs',
    langClass: 'csharp',
    generator: (url) => `using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        using HttpClient client = new HttpClient();
        string response = await client.GetStringAsync("${url}");
        using JsonDocument doc = JsonDocument.Parse(response);
        string reason = doc.RootElement.GetProperty("reason").GetString();
        Console.WriteLine($"Excuse: {reason}");
    }
}`
  },
  {
    name: 'Dart',
    key: 'dart',
    extension: 'dart',
    langClass: 'dart',
    generator: (url) => `import 'dart:convert';
import 'package:http/http.dart' as http;

void main() async {
  var url = Uri.parse('${url}');
  var response = await http.get(url);
  if (response.statusCode == 200) {
    var data = jsonDecode(response.body);
    print('No: \${data['reason']}');
  }
}`
  },
  {
    name: 'Elixir',
    key: 'elixir',
    extension: 'ex',
    langClass: 'elixir',
    generator: (url) => `# Requires HTTPoison and Poison
url = "${url}"
case HTTPoison.get(url) do
  {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
    data = Poison.decode!(body)
    IO.puts("Reason: #{data["reason"]}")
  {:error, %HTTPoison.Error{reason: reason}} ->
    IO.puts("Failed: #{reason}")
end`
  },
  {
    name: 'Haskell',
    key: 'haskell',
    extension: 'hs',
    langClass: 'haskell',
    generator: (url) => `-- Requires http-conduit
{-# LANGUAGE OverloadedStrings #-}
import Network.HTTP.Simple
import qualified Data.ByteString.Lazy.Char8 as L8

main :: IO ()
main = do
    response <- httpLBS "GET ${url}"
    L8.putStrLn $ getResponseBody response`
  },
  {
    name: 'Scala',
    key: 'scala',
    extension: 'scala',
    langClass: 'scala',
    generator: (url) => `import scala.io.Source

object NaasApp extends App {
  val url = "${url}"
  val response = Source.fromURL(url).mkString
  println(s"Response: \${response}")
}`
  },
  {
    name: 'Clojure',
    key: 'clojure',
    extension: 'clj',
    langClass: 'clojure',
    generator: (url) => `(ns naas-example
  (:require [clj-http.client :as client]))

(defn -main []
  (let [response (client/get "${url}")]
    (println "Response:" (:body response))))`
  },
  {
    name: 'R',
    key: 'r',
    extension: 'r',
    langClass: 'r',
    generator: (url) => `library(httr)
library(jsonlite)

res <- GET("${url}")
data <- fromJSON(content(res, "text", encoding = "UTF-8"))
print(data$reason)`
  },
  {
    name: 'Perl',
    key: 'perl',
    extension: 'pl',
    langClass: 'perl',
    generator: (url) => `use strict;
use warnings;
use LWP::UserAgent;
use JSON;

my $ua = LWP::UserAgent->new;
my $response = $ua->get('${url}');

if ($response->is_success) {
    my $data = decode_json($response->decoded_content);
    print "Excuse: " . $data->{reason} . "\\n";
} else {
    die $response->status_line;
}`
  },
  {
    name: 'Julia',
    key: 'julia',
    extension: 'jl',
    langClass: 'julia',
    generator: (url) => `using HTTP
using JSON

response = HTTP.get("${url}")
data = JSON.parse(String(response.body))
println("Excuse: ", data["reason"])`
  },
  {
    name: 'Zig',
    key: 'zig',
    extension: 'zig',
    langClass: 'zig',
    generator: (url) => `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var client = std.http.Client{ .allocator = allocator };
    defer client.deinit();

    const uri = try std.Uri.parse("${url}");
    var req = try client.open(.GET, uri, .{});
    defer req.deinit();

    try req.send();
    try req.wait();

    var buf: [2048]u8 = undefined;
    const read = try req.readAll(&buf);
    std.debug.print("Response: {s}\\n", .{buf[0..read]});
}`
  },
  {
    name: 'Lua',
    key: 'lua',
    extension: 'lua',
    langClass: 'lua',
    generator: (url) => `local http = require("socket.http")
local json = require("json")

local response, status = http.request("${url}")
if status == 200 then
    local data = json.decode(response)
    print("Excuse: " .. data.reason)
else
    print("Request failed: " .. tostring(status))
end`
  },
  {
    name: 'Crystal',
    key: 'crystal',
    extension: 'cr',
    langClass: 'crystal',
    generator: (url) => `require "http/client"
require "json"

response = HTTP::Client.get("${url}")
if response.status_code == 200
  data = JSON.parse(response.body)
  puts "Excuse: #{data["reason"]}"
end`
  },
  {
    name: 'Nim',
    key: 'nim',
    extension: 'nim',
    langClass: 'nim',
    generator: (url) => `import httpclient, json

let client = newHttpClient()
let response = client.getContent("${url}")
let data = parseJson(response)
echo "Excuse: ", data["reason"].getStr()`
  },
  {
    name: 'Bash',
    key: 'bash',
    extension: 'sh',
    langClass: 'bash',
    generator: (url) => `#!/bin/bash
response=$(curl -s "${url}")
reason=$(echo "$response" | grep -o '"reason":"[^"]*' | cut -d'"' -f4)
echo "Excuse: $reason"`
  },
  {
    name: 'PowerShell',
    key: 'powershell',
    extension: 'ps1',
    langClass: 'powershell',
    generator: (url) => `$response = Invoke-RestMethod -Uri "${url}" -Method Get
Write-Output "Excuse: $($response.reason)"`
  },
  {
    name: 'COBOL',
    key: 'cobol',
    extension: 'cob',
    langClass: 'cobol',
    generator: (url) => `       IDENTIFICATION DIVISION.
       PROGRAM-ID. NAAS-GET.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-URL      PIC X(120) VALUE "${url}".
       01  WS-CMD      PIC X(150).
       PROCEDURE DIVISION.
           STRING "curl -s " DELIMITED BY SIZE
                  WS-URL DELIMITED BY SPACE
                  INTO WS-CMD
           CALL "SYSTEM" USING WS-CMD.
           STOP RUN.`
  }
];
