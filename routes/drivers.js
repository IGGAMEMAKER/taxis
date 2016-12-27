var express = require('express');
var router = express.Router();

var logger = require('../helpers/logger');
var authentication = require('../middlewares/authentication');

var api = require('../helpers/api');
var response = require('../helpers/response');

var error = response.error;
var respond = response.respond;

router.get('/', authentication.isAuthenticated, (req, res) => {
  api.drivers.all()
    .then(respond(res))
    .catch(error('', res));
  // res.json({ msg: 1 });
});

router.get('/all', authentication.isAdmin, (req, res) => {
  api.drivers.all()
    .then(respond(res))
    .catch(error('', res));
  // res.json({ msg: 1 });
});

router.get('/clearAll', authentication.isAdmin, (req, res) => {
  api.drivers.clear()
    .then(respond(res))
    .catch(error('', res));
  // res.json({ msg: 1 });
});

router.get('/:driverId', authentication.check, (req, res) => {
  var phone = req.params.driverId;

  api.drivers.getByDriverId(phone)
    .then(driver => {
      if (!driver) throw '404';

      var object;
      if (req.isUser) {
        // we cannot send FULL INFO
        object = {
          name: driver.name,
        };
      } else {
        if (req.isDriver) {
          // we can send full info
          object = driver;
        }
      }

      return object;
    })
    .then(respond(res))
    .catch(error('', res));
});

router.post('/', (req, res) => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name, req.body);

  var driver = Object.assign(req.body, { phone, name });

  api.drivers.add(driver)
    .then(respond(res))
    .catch(error('', res));
});

router.patch('/sessions/open', authentication.isDriver, (req, res) => {
  var phone = req.driverId;

  api.drivers.openSession(phone)
    .then(respond(res))
    .catch(error('', res));
});

router.patch('/sessions/close', authentication.isDriver, (req, res) => {
  var phone = req.driverId;

  api.drivers.closeSession(phone)
    .then(respond(res))
    .catch(error('', res));
});

module.exports = router;
