import scala.io.Source

object NaasApp extends App {
  val url = "https://no.krajtilak.in/api/no"
  val response = Source.fromURL(url).mkString
  println(s"Response: ${response}")
}