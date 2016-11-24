var express = require('express');
var router = express.Router();
var logger = console;

var api = require('../helpers/api');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var error = (tag, res) => e => {
  res.status(500).json({ type: tag, error: e });
};

var respond = res => result => {
  res.json({ msg: result });
};

var authentication = (req, res, next) => {
  logger.log('check authentication');
  next();
};

router.get('/', authentication, (req, res) => {
  logger.log('qqq');
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name);
  api.users.add(phone, name)
    .then(respond(res))
    .catch(error('', res));
});

module.exports = router;
