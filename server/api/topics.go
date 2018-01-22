package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

type create_topic_request struct {
	NewTopicName string
}

func getTopics(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "getTopics called")
}

func createTopic(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(body))

	var data create_topic_request
	err = json.Unmarshal(body, &data)
	if err != nil {
		panic(err)
	}

	log.Println(data)
	log.Println(data.NewTopicName)
}
