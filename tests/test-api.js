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
  } else {
    logger.log(tag + ' OK', res.body);
  }
};

var get = (url, tag) => {
  request.get(domain + url)
    .end(log(url));
    // .then(logResponse(url || tag))
    // .catch(logResponse('ERROR in ' + url));
};

var post = (url, tag) => {
  request.get(domain + url)
    .then(logResponse(url || tag))
    .catch(logResponse('ERROR in ' + url));
};

get('/users/all');