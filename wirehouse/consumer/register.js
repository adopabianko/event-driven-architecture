#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var models = require('../models');

amqp.connect('amqp://guest:guest@rabbitmq:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'register';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      function(msg) {
        // insert data
        var body = JSON.parse(msg.content.toString());
        models.User.create({
          name: body.name,
          email: body.email,
          handphone: body.handphone,
          gender: body.gender,
          password: body.password
        }).then(function() {
          console.log('success insert data ', msg.content.toString());
        });
      },
      {
        noAck: true
      }
    );
  });
});
