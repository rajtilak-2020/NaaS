# 🚫 No as a Service (NaaS)

> Creative, funny, professional, and absurd reasons to say "No" — served as a developer-utility web app and open API.

**NaaS** is designed to serve two audiences simultaneously: developers who want to integrate a boundary-protecting `GET /api/no` endpoint into their applications, and regular users who need an excuse *right now*.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Single-page Vue 3 + TypeScript app powered by Vite.
- **Design System**: Brutalist terminal-noir aesthetic. No rounded corners, heavy `#FF3333` accents, and custom font pairings (JetBrains Mono for display, Inter for body text).
- **Dual-Mode API Engine**:
  1. **Local Terminal Integrations**: Custom Vite dev-server middleware. Developers running the server locally can query the API directly from their terminal using tools like `curl http://localhost:5174/api/no`.
  2. **Browser Interception**: A registered Service Worker (`public/sw.js`) intercepts `/api/*` fetch calls client-side, allowing the web dashboard to function as a fully fledged, live API explorer even on static hosting platforms.

---

## 📡 API Design

The base URL for all endpoints is `/api`.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/no` | `GET` | Get a random excuse (any category) |
| `/api/no?category=existential` | `GET` | Get a random excuse filtered by category |
| `/api/no?id=42` | `GET` | Retrieve a specific excuse by its ID |
| `/api/no/all` | `GET` | Retrieve all 1,000 excuses in a JSON list |
| `/api/categories` | `GET` | List all available excuse categories |

### Response Shape
```json
{
  "id": 42,
  "reason": "The universe is expanding and so is my need for solitude.",
  "category": "existential",
  "severity": "gentle",
  "timestamp": "2026-06-15T10:00:00Z"
}
```

---

## 📂 Multi-Language Client Showcase

The `/snippets` folder contains 28 functional, copy-pasteable client implementations of NaaS. When pushed to GitHub, these files demonstrate repository coverage across all 28 languages:

- 🐚 **Shell / CLI**: [curl.sh](file:///snippets/curl.sh) · [bash.sh](file:///snippets/bash.sh) · [powershell.ps1](file:///snippets/powershell.ps1)
- 🌐 **Web Core**: [javascript.js](file:///snippets/javascript.js) · [typescript.ts](file:///snippets/typescript.ts) · [php.php](file:///snippets/php.php)
- ⚡ **Systems**: [rust.rs](file:///snippets/rust.rs) · [go.go](file:///snippets/go.go) · [zig.zig](file:///snippets/zig.zig) · [csharp.cs](file:///snippets/csharp.cs) · [cpp/objc (m)](file:///snippets/objectivec.m)
- 🐍 **Scripting**: [python.py](file:///snippets/python.py) · [ruby.rb](file:///snippets/ruby.rb) · [lua.lua](file:///snippets/lua.lua) · [perl.pl](file:///snippets/perl.pl)
- 📱 **Mobile**: [kotlin.kt](file:///snippets/kotlin.kt) · [swift.swift](file:///snippets/swift.swift) · [dart.dart](file:///snippets/dart.dart)
- ☕ **JVM**: [java.java](file:///snippets/java.java) · [scala.scala](file:///snippets/scala.scala) · [clojure.clj](file:///snippets/clojure.clj)
- 🧮 **Scientific & FP**: [julia.jl](file:///snippets/julia.jl) · [haskell.hs](file:///snippets/haskell.hs) · [r.r](file:///snippets/r.r)
- 🔮 **Niche & Modern**: [elixir.ex](file:///snippets/elixir.ex) · [crystal.cr](file:///snippets/crystal.cr) · [nim.nim](file:///snippets/nim.nim)
- 📜 **Retro**: [cobol.cob](file:///snippets/cobol.cob) (Yes, COBOL handles curls too)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm run dev
   ```
3. Query the API directly from your terminal:
   ```bash
   curl http://localhost:5174/api/no
   ```
