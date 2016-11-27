var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');

var error = (tag, res) => e => {
  res.status(500).json({ code: tag, message: e });
};

var respond = res => result => {
  res.json({ msg: result });
};

router.get('/', authentication.isAuthenticated, (req, res) => {
  api.drivers.all()
    .then(respond(res))
    .catch(error('', res));
});

router.post('/', (req, res) => {
// router.get('/ololo', (req, res) => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name);
  api.users.add(phone, name)
    .then(respond(res))
    .catch(error('', res));
});

router.get('/all', authentication.isAdmin, (req, res) => {
  api.drivers.all()
    .then(respond(res))
    .catch(error('', res));
});

// router.patch('/', authentication.isAuthenticated, (req, res) => {
//   var changes = req.body.changes;
//   var phone = req.body.phone;
//
//   // check parameters
//
//   api.users.update(phone, changes)
//     .then(respond(res))
//     .catch(error('', res));
// });

module.exports = router;
