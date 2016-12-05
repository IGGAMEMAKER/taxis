var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');

var response = require('../helpers/response');

router.get('/', authentication.isDriver, (req, res) => {
  var userId = req.userId;

  api.driverPreferences.getByDriverId(userId)
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.post('/', (req, res) => {
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
  api.driverPreferences.add(preference)
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.get('/all', authentication.isAdmin, (req, res) => {
  api.driverPreferences.all()
    .then(response.respond(res))
    .catch(response.error('', res));
});

router.get('/clearAll', authentication.isAdmin, (req, res) => {
  api.driverPreferences.clear()
    .then(response.respond(res))
    .catch(response.error('', res));
});

module.exports = router;
