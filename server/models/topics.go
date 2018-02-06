package models

import (
	"log"

	"gopkg.in/mgo.v2/bson"
)

type Item struct {
	ID       bson.ObjectId `db:"id" json:"id" bson:"_id"`
	Question string
	Answer   string
}

type Topic struct {
	ID    bson.ObjectId `db:"id" json:"id" bson:"_id"`
	Name  string
	Items []Item
}

func Create(newTopic string) {
	connection, session := connect("topics")
	defer session.Close()

	var topic = &Topic{
		ID:    bson.NewObjectId(),
		Name:  newTopic,
		Items: []Item{},
	}

	err := connection.Insert(topic)
	if err != nil {
		log.Fatal(err)
	}
}

func Get() []Topic {
	connection, session := connect("topics")
	defer session.Close()

	var topics []Topic
	err := connection.Find(nil).All(&topics)
	if err != nil {
		log.Fatal(err)
	}

	return topics
}
