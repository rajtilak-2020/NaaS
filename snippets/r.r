library(httr)
library(jsonlite)

res <- GET("https://no.krajtilak.in/api/no")
data <- fromJSON(content(res, "text", encoding = "UTF-8"))
print(data$reason)