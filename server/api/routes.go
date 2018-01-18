package routes

import (
	"log"
	"net/http"
	"reflect"
	"github.com/julienschmidt/httprouter"
)

func Monkey() int {
	return 42
}

func router() *httprouter.Router {
	router := httprouter.New()
	router.GET("/api/topics", TopicsHandler)

	log.Println(reflect.TypeOf(router))

	return router
}

func TopicsHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "topicsHandler called")
}
