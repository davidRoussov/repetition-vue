package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"

	topics "github.com/davidRoussov/repetition-vue/server/models"
)

type create_topic_request struct {
	NewTopicName string
}

type response_struct struct {
	Success bool
}

func getTopics(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "getTopics called")

	var response response_struct
	response.Success = true
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func createTopic(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	var data create_topic_request
	err = json.Unmarshal(body, &data)
	if err != nil {
		panic(err)
	}

	topics.Create(data.NewTopicName)

	var response response_struct
	response.Success = true
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
