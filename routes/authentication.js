var express = require('express');
var router = express.Router();
var logger = console;

router.post('/authentication/sendCode/:phone', (req, res) => {
  res.status(200).json({ message: 'ok' });

  logger.log();
  // sended code 2222 via SMS
});

router.post('/authenticate', (req, res) => {
  var phone = req.body.phone;
  var pincode = req.body.pincode;

  logger.log('code sended', phone, pincode);

  if (pincode === 2222) {
    res.status(200).json({ key: 'qXtvs1029dasi0w' });
  } else {
    res.status(401);
  }
});

module.exports = router;
