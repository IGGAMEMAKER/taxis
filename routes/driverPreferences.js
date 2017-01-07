var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var respond = require('../helpers/response-promisify');


router.get('/', authentication.isDriver, respond(req => {
  var userId = req.userId;

  return api.driverPreferences.getByDriverId(userId);
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
  return api.driverPreferences.add(preference);
}));

router.get('/all', authentication.isAdmin, respond(req => {
  return api.driverPreferences.all();
}));

router.get('/clearAll', authentication.isAdmin, respond(req => {
  return api.driverPreferences.clear();
}));

module.exports = router;
