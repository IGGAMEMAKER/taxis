var express = require('express');
var router = express.Router();
var logger = console;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var authentication = (req, res, next) => {
  logger.log('check authentication');
  next();
};

router.get('/', authentication, (req, res) => {
  logger.log('qqq');
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  var phone = req.body.phone;
  var name = req.body.name;

  // go to database

  logger.log(phone, name);
});


// router.get('/users', )

module.exports = router;
