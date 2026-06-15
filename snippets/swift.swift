import Foundation

struct NaasResponse: Codable {
    let id: Int
    let reason: String
    let category: String
    let severity: String
}

let url = URL(string: "https://no.krajtilak.in/api/no")!
let task = URLSession.shared.dataTask(with: url) { data, response, error in
    if let data = data {
        if let res = try? JSONDecoder().decode(NaasResponse.self, from: data) {
            print("No: \(res.reason)")
        }
    }
}
task.resume()