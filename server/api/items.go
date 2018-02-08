package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2/bson"

	topics "github.com/davidRoussov/repetition-vue/server/models"
)

type create_item_request struct {
	Topic string
	Item  map[string]string
}

type Item struct {
	ID       bson.ObjectId `db:"id" json:"id" bson:"_id"`
	Question string
	Answer   string
}

func createItem(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	var data create_item_request
	err = json.Unmarshal(body, &data)
	if err != nil {
		panic(err)
	}

	topics.AddItem(data.Topic, data.Item["question"], data.Item["answer"])

	var response response_struct
	response.Success = true
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
