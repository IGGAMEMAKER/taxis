var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');

var response = require('../helpers/response');

router.get('/', authentication.isAuthenticated, (req, res) => {
  // logger.log('qqq');
  // res.send('respond with a resource');
  var phone = req.userId;

  var answer = {
    phone
  };

  api.users.find({ phone })
    .then(u => {
      if (!u) throw 'user_not_exist';

      answer.user = u;
      return api.orders.find({ userId: phone });
    })
    .then(o => {
      answer.orders = o;

      return answer;
    })
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.post('/', (req, res) => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name);
  api.users.add(phone, name)
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.get('/all', authentication.isAdmin, (req, res) => {
  api.users.all()
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.patch('/', authentication.isAuthenticated, (req, res) => {
  logger.log('/users patch', req.body);

  var changes = req.body.changes;
  var phone = req.body.phone;

  // check parameters

  api.users.update(phone, changes)
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.get('/clearAll', authentication.isAdmin, (req, res) => {
  api.users.clear()
    .then(response.respond(res))
    .catch(response.error('', res));
});

module.exports = router;
