package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	mailgun "github.com/mailgun/mailgun-go"
	"github.com/streadway/amqp"
)

type MailData struct {
	Name           string
	Email          string
	ActivationCode string
}

var yourDomain string = "sandboxe610a840626c491aab55105905abcf79.mailgun.org"
var privateAPIKey string = "08e6327dd7825aaff7e59e929b75ba22-4a62b8e8-49bd3b5c"

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatal("%s: %s", msg, err)
	}
}

func main() {

	conn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"register-email",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			var maildata MailData

			mg := mailgun.NewMailgun(yourDomain, privateAPIKey)

			json.Unmarshal([]byte(d.Body), &maildata)

			sender := "info@example.com"
			subject := "Selamat anda berhasil melakukan registrasi"
			body := "Selamat anda berhasil melakukan registrasi, berikut adalah kode aktifasi anda " + maildata.ActivationCode
			recipient := maildata.Email

			message := mg.NewMessage(sender, subject, body, recipient)

			_, cancel := context.WithTimeout(context.Background(), time.Second*10)
			defer cancel()

			resp, id, err := mg.Send(message)

			if err != nil {
				log.Fatal(err)
			}

			fmt.Printf("ID: %s Resp : %s\n", id, resp)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
