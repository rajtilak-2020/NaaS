import java.net.URL
import org.json.JSONObject

fun main() {
    try {
        val response = URL("https://no.krajtilak.in/api/no").readText()
        val json = JSONObject(response)
        println("No: ${json.getString("reason")}")
    } catch (e: Exception) {
        println("Error: ${e.message}")
    }
}