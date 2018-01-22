package models

import (
	"log"
)

type Item struct {
	Question string
	Answer   string
}

type Topic struct {
	Name  string
	Items []Item
}

func Create(newTopic string) {
	log.Println("In models topics create")
	log.Println(newTopic)

	connection, session := connect("topics")
	defer session.Close()

	err := connection.Insert(&Topic{newTopic, []Item{}})
	if err != nil {
		log.Fatal(err)
	}

}
