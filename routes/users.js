var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var respond = require('../helpers/response-promisify');

router.get('/', authentication.isAuthenticated, respond(req => {
  // logger.log('qqq');
  // res.send('respond with a resource');

  var phone = req.userId;
  logger.log('GET /users', phone);

  var answer = {
    phone
  };

  return api.users.find({ phone })
    .then(u => {
      if (!u) throw 'user_not_exist';

      answer.user = u;
      return api.orders.find({ userId: phone });
    })
    .then(o => {
      answer.orders = o;

      return answer;
    });
}));

router.post('/', respond(req => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name);
  return api.users.add(phone, name);
}));

router.get('/all', authentication.isAdmin, respond(req => {
  return api.users.all();
}));

router.patch('/', authentication.isAuthenticated, respond(req => {
  logger.log('/users patch', req.body);

  var changes = req.body.changes;
  var phone = req.body.phone;

  // check parameters

  return api.users.update(phone, changes);
}));

router.get('/clearAll', authentication.isAdmin, respond(req => {
  return api.users.clear();
}));

router.put('/preferences/addresses', authentication.isAuthenticated, respond(req => {
  var phone = req.userId;
  var addresses = req.body.addresses;

  return api.users.editFavouriteAddresses(addresses, phone);
}));

module.exports = router;
