package api

import (
	"github.com/julienschmidt/httprouter"
)

func Router() *httprouter.Router {
	router := httprouter.New()

	router.GET("/api/topics", getTopics)
	router.POST("/api/topics", createTopic)

	return router
}