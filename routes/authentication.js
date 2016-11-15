var express = require('express');
var router = express.Router();
var logger = console;

router.post('/sendCode/:phone', (req, res) => {
  logger.log('code sended', req.params.phone);
  res.send('code sended to mobile');
});

router.post('/authenticate', (req, res) => {
  logger.log('code sended', req.body.phone, req.body.pincode);
  res.status(200).send('authenticated');
});

