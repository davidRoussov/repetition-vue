package models

import mgo "gopkg.in/mgo.v2"

func connect(collection string) (*mgo.Collection, *mgo.Session) {
	session, err := mgo.Dial("mongodb://localhost")
	if err != nil {
		panic(err)
	}
	return session.DB("repetition").C(collection), session
}
