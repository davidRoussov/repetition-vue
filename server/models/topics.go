package models

import (
	"log"

	"gopkg.in/mgo.v2/bson"
)

type Item struct {
	ID       bson.ObjectId `db:"id" json:"id" bson:"_id"`
	Question string
	Answer   string
	Rank     int
}

type Topic struct {
	ID    bson.ObjectId `db:"id" json:"id" bson:"_id"`
	Name  string
	Items []Item
}

func Update(topic Topic) {
	log.Println("In models topics Update")

	log.Println(topic)
	log.Println(topic.ID)
	log.Println(topic.Items)
	log.Println(topic.Name)

	// connection, session := connect("topics")
	// defer session.Close()

	// err := connection.UpdateId(topic.ID, topic)
	// if err != nil {
	// 	panic(err)
	// }
}

func AddItem(topicID string, question string, answer string) {
	connection, session := connect("topics")
	defer session.Close()

	var newRank = getHighestRank(topicID) + 1

	var newItem = &Item{
		ID:       bson.NewObjectId(),
		Question: question,
		Answer:   answer,
		Rank:     newRank,
	}

	log.Println(newItem)

	match := bson.M{"_id": bson.ObjectIdHex(topicID)}
	change := bson.M{"$push": bson.M{"items": newItem}}
	err := connection.Update(match, change)
	if err != nil {
		panic(err)
	}
}

func getHighestRank(topicID string) int {
	connection, session := connect("topics")
	defer session.Close()

	var topic Topic
	err := connection.Find(bson.M{"_id": bson.ObjectIdHex(topicID)}).One(&topic)
	if err != nil {
		panic(err)
	}

	if len(topic.Items) == 0 {
		return 0
	} else {
		maxRank := 0
		for i := 0; i < len(topic.Items); i++ {
			item := topic.Items[i]

			if item.Rank > maxRank {
				maxRank = item.Rank
			}
		}
		return maxRank
	}
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
