var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var respond = require('../helpers/response-promisify');

router.get('/', authentication.isAuthenticated, respond(req => {
  var userId = req.userId;

  return api.userPreferences.getByUserId(userId);
}));

router.post('/', respond(req => {
  var userId    = req.userId;

  var driverId  = req.body.driverId;
  var mark      = req.body.mark;
  var comment   = req.body.comment;

  var preference = {
    driverId,
    userId,
    mark,
    comment
  };

  logger.log(driverId, userId, mark, comment);

  return api.userPreferences.add(preference);
}));

router.get('/all', authentication.isAdmin, respond(req => {
  return api.userPreferences.all();
}));

router.get('/clearAll', authentication.isAdmin, respond(req => {
  return api.userPreferences.clear();
}));

module.exports = router;
