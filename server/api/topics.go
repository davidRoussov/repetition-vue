package api

import (
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"
)

func topicsHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "topicsHandler called")
}