var express = require('express');
var router = express.Router();
var logger = console;

var api = require('../helpers/api');

var response = require('../helpers/response');

router.get('/requestCode/:phone', (req, res) => {
  var phone = req.params.phone;
  logger.log(phone);

  api.users.getByPhone(phone)
    .then(u => {
      if (!u) throw 'user_not_found';

      // if specified phone exists
      // save code in Users here

      res.json({ msg: 'ok' });
      // sended code 2222 via SMS
    })
    .catch(response.error('', res));
});


router.get('/requestCodeForDriver/:phone', (req, res) => {
  var phone = req.params.phone;
  logger.log(phone);

  api.drivers.getByDriverId(phone)
    .then(u => {
      if (!u) throw 'user_not_found';

      // if specified phone exists
      // save code in Users here

      res.json({ msg: 'ok' });
      // sended code 2222 via SMS
    })
    .catch(response.error('', res));
});


router.post('/authenticate', (req, res) => {
  var phone = req.body.phone;
  var pincode = req.body.pincode;

  logger.log('code sended', phone, pincode);

  if (pincode === 2222) {
    res.json({ authKey: 'qXtvs1029dasi0w' });
  } else {
    res.sendStatus(401);
  }
});

router.post('/authenticateDriver', (req, res) => {
  var phone = req.body.phone;
  var pincode = req.body.pincode;

  logger.log('code sended', phone, pincode);

  if (pincode === 3333) {
    res.json({ authKey: '10da09s8dh0a9sdj0a' });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
