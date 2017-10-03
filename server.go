package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

func addTopicHandler() {
	fmt.Println("add topic handler called")
}

func topicsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		addTopicHandler()
		break
	default:
		fmt.Println("ERROR: bad http method")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/topics", topicsHandler)

	handler := cors.Default().Handler(mux)

	// http.HandleFunc("/api/topics", topicsHandler)
	http.ListenAndServe(":8081", handler)
}
