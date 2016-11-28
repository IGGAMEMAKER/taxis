var request = require('superagent');
var Promise = require('bluebird');

var logger = require('../helpers/logger');
var domain = 'http://localhost:8888';

var logResponse = tag => (r => {
  logger.log(tag, r);
});

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

// get('/users/all');
// post('/users', { phone: '8955555555', name: 'Gaga' });
// get('/authentication/requestCode/8955555555');
// post('/authentication/authenticate', { pincode: 2222, phone: '8955555555' });
patch('/users', { changes: { car: { model: 'wolkswagen' } }, phone: '8955555555', authKey: 'qXtvs1029dasi0w' });

