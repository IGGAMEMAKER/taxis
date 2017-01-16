var express = require('express');
var router = express.Router();

var respond = require('../../helpers/response-promisify');
var api = require('../../helpers/api');

var request = require('superagent');

var checkCredentials = (req, res, next) => {
  next();
};

var logger = require('../../helpers/logger');

router.get('/route/price', checkCredentials, respond(req => {
  // logger.log('MapServer', 'route/price', req.body);
  return api.orders.all();
}));

module.exports = router;
