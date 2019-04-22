var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

router.get('/register', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
