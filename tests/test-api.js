var request = require('superagent');
var Promise = require('bluebird');

var logger = require('../helpers/logger');
var domain = 'http://localhost:8888';

var api = require('../helpers/api');

var log = tag => (err, res) => {
  if (err) {
    logger.log('ERROR in ' + tag, err);
    logger.log('ERROR in ' + tag, err.status);
  } else {
    logger.log(tag + ' OK', res.body);
  }
};

var get = (url, tag) => {
  request.get(domain + url)
    .end(log(url));
};

var post = (url, obj, tag) => {
  request.post(domain + url)
    .send(obj)
    .end(log(url));
};

var patch = (url, obj, tag) => {
  request.patch(domain + url)
    .send(obj)
    .end(log(url));
};

// api.users.add('8955555555131', 'Gaga122')
//   .then(logger.log)
//   .catch(logger.log);

// get('/users/all');
// post('/users', { phone: '8955555555131', name: 'Gaga1222' });
// get('/authentication/requestCode/8955555555');
// post('/authentication/authenticate', { pincode: 2222, phone: '8955555555' });
// patch('/users', { changes: { car: { model: 'wolkswagen' } }, phone: '8955555555', authKey: 'qXtvs1029dasi0w' });


post('/orders', {
  orders: [{
    location: { center: [52.33, 44.44] },
    destination: { center: [52.33, 44.44] },
    asSoonAsPossible: true,
    clientPhone: '88888888888',
    driverDetails: {},
  }],

  phone: '8955555555131'
});
  // orderDate,

