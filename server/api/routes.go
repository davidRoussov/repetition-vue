package routes

import (
	"log"
	"net/http"
	"reflect"
	"github.com/julienschmidt/httprouter"
)

func Router() *httprouter.Router {
	router := httprouter.New()
	router.GET("/api/topics", topicsHandler)

	log.Println(reflect.TypeOf(router))

	return router
}

func topicsHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "topicsHandler called")
}
