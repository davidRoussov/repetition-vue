package api

import (
	"github.com/julienschmidt/httprouter"
)

func Router() *httprouter.Router {
	router := httprouter.New()

	router.GET("/api/topics", getTopics)
	router.POST("/api/topics", createTopic)
	router.PUT("/api/topics", updateTopic)

	router.POST("/api/items", createItem)

	return router
}
