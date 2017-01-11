var respond = require('../../helpers/response-promisify');
var api = require('../../helpers/api');

var express = require('express');
var router = express.Router();

var checkCredentials = (req, res, next) => {
  next();
};

var logger = require('../../helpers/logger');

router.get('/orders/add', checkCredentials, respond(req => {
  logger.log('EventServer', 'orders add', req.body);
  return api.orders.all();
}));

module.exports = router;
