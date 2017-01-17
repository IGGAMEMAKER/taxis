var request = require('superagent');
var Promise = require('bluebird');

var configs = require('../configs');

var logger = require('../helpers/logger');
// var domain = 'http://localhost:8888';
var domain = configs.domain + ':8888';

var api = require('../helpers/api');

var log = tag => (err, res) => {
  if (err) {
    logger.log('ERROR in ' + tag, err);
    logger.log('ERROR in ' + tag, err.status);
  } else {
    logger.log(tag + ' OK');
    logger.dir(res.body);
    logger.log('----------');
  }
};

var get = (url, tag) => {
  request
    .get(domain + url)
    .end(log(`GET ${url}`));
};

var post = (url, obj, tag) => {
  request
    .post(domain + url)
    .send(obj)
    .end(log(`POST ${url}`));
};

var patch = (url, obj, tag) => {
  request
    .patch(domain + url)
    .send(obj)
    .end(log(`PATCH ${url}`));
};

var authenticateAsUser = (object) => Object.assign({ phone: '8955555555', authKey: 'qXtvs1029dasi0w' }, object);

module.exports = {
  get: get,
  post,
  patch,
  api,
  logger,
  authenticateAsUser
};
