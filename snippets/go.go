package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Response struct {
	ID       int    `json:"id"`
	Reason   string `json:"reason"`
	Category string `json:"category"`
	Severity string `json:"severity"`
}

func main() {
	res, err := http.Get("https://no.krajtilak.in/api/no")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	var data Response
	json.Unmarshal(body, &data)
	fmt.Printf("No: %s\n", data.Reason)
}