var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var respond = require('../helpers/response-promisify');

router.get('/', authentication.isAuthenticated, respond(req => {
  return api.drivers.all();
}));

router.get('/all', authentication.isAdmin, respond(req => {
  return api.drivers.all();
}));

router.get('/clearAll', authentication.isAdmin, respond(req => {
  return api.drivers.clear();
}));

router.get('/:driverId', authentication.check, respond(req => {
  var phone = req.params.driverId;
  var object;

  return api.drivers.getByDriverId(phone)
    .then(driver => {
      if (!driver) throw '404';

      if (req.isUser) {
        // we cannot send FULL INFO
        object = {
          name: driver.name
        };
      } else {
        if (req.isDriver) {
          // we can send full info
          object = driver;
        }
      }

      return object;
    });
}));

router.post('/', respond(req => {
  const body = req.body;
  logger.log('POST /drivers', body);
  var phone = body.phone;
  var name = body.name;

  const defaultDriver = {
    gender: 1,
    internationalLicence: 0,
    isOfficial: 0,
    isSmoking: 0,
    phone,
    name
  };
  // go to database

  logger.log(phone, name, body);

  var driver = Object.assign(defaultDriver, body);

  return api.drivers.add(driver)
    .then(result => {
      logger.log(result);

      return result;
    });
}));

router.patch('/sessions/open', authentication.isDriver, respond(req => {
  const phone = req.driverId;

  return api.drivers.openSession(phone);
}));

router.patch('/sessions/close', authentication.isDriver, respond(req => {
  const phone = req.driverId;

  return api.drivers.closeSession(phone);
}));

module.exports = router;
