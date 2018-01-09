package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type testStruct struct {
	Test string
}

func topicsHandler(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case "POST":
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			panic(err)
		}
		log.Println("one")
		log.Println(string(body))
		var t testStruct
		err = json.Unmarshal(body, &t)
		if err != nil {
			panic(err)
		}
		log.Println("two")
		log.Println(t.Test)
		break
	default:
		fmt.Println("ERROR: bad http method")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/topics", topicsHandler)

	handler := cors.Default().Handler(mux)

	PORT := ":8080"
	log.Println("listening on", PORT)
	log.Fatal(http.ListenAndServe(PORT, handler))
}
