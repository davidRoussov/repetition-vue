package main

import (
	"fmt"

	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func main() {
	// log.SetOutput(os.Stdout)
	// log.SetLevel(DebugLevel)
	fmt.Printf("%+v\n", log)
}
