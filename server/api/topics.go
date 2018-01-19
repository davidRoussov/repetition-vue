package api

import (
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
	log "github.com/sirupsen/logrus"
)

func init() {
	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func getTopics(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	log.Println(w, "getTopics called")
}

func createTopic(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	log.Debug("In topics createTopic")
}
