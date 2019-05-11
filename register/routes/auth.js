var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
var amqp = require('amqplib/callback_api');

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var handphone = req.body.handphone;
  var gender = req.body.gender;
  var password = req.body.password;

  console.log(req.body);

  // Save data
  Users.create({
    name: name,
    email: email,
    handphone: handphone,
    gender: gender,
    password: password
  })
    .then(function(user) {
      // Publish data ke rabbitmq
      amqp.connect('amqp://guest:guest@rabbitmq:5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
          var q = 'register';
          var msg = JSON.stringify(user);

          ch.assertQueue(q, { durable: false });
          ch.sendToQueue(q, Buffer.from(msg));
        });
      });

      res.send({
        status: 'ok',
        message: 'Registration success',
        data: user
      });
    })
    .catch(function(err) {
      res.send({
        status: 'error',
        message: 'Error Validation',
        data: err
      });
    });
});

module.exports = router;
