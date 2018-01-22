package main

import (
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"

	routes "github.com/davidRoussov/repetition-vue/server/api"
)

func main() {
	ENVIRONMENT := os.Getenv("ENV")
	log.Println("running in environment:", ENVIRONMENT)

	// mux := http.NewServeMux()
	// mux.HandleFunc("/api/topics", topicsHandler)

	// handler := cors.Default().Handler(mux)

	router := routes.Router()

	handler := cors.Default().Handler(router)

	PORT := ":8081"
	log.Println("listening on", PORT)
	log.Fatal(http.ListenAndServe(PORT, handler))
}
