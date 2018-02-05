package models

import (
	"log"

	"gopkg.in/mgo.v2/bson"
)

type Item struct {
	_id      bson.ObjectId
	Question string
	Answer   string
}

type Topic struct {
	_id   bson.ObjectId
	Name  string
	Items []Item
}

func Create(newTopic string) {
	connection, session := connect("topics")
	defer session.Close()

	var topic = &Topic{
		_id:   bson.NewObjectId(),
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

	log.Print("retrieved topics:")
	log.Print(topics)
	log.Print(topics[0])
	log.Print(topics[0]._id.MarshalText)

	return topics
}
