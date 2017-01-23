var header = (req, key) => {
  return req.body[key] || req.query[key];
};

var mockKey = 'qXtvs1029dasi0w';
var mockDriverKey = '10da09s8dh0a9sdj0a';

var logger = require('../helpers/logger');


module.exports = {
  isAuthenticated: (req, res, next) => {
    var authKey = header(req, 'authKey');
    var phone = header(req, 'phone');

    logger.log('REWRITE AUTHENTICATION! /middlewares/authentication/isAuthenticated');

    if (authKey === mockKey) { // check authentication
      req.userId = phone;
      next();
    } else {
      res.sendStatus(401);
    }
  },

  isAdmin: (req, res, next) => {
    if (true) { // check authentication
      logger.log('isAdmin');

      next();
    } else {
      res.sendStatus(403);
    }
  },

  isDriver: (req, res, next) => {
    var authKey = header(req, 'authKey');
    var phone = header(req, 'phone');

    // go to DB and find it out
    if (authKey === mockDriverKey) { // check authentication
      req.isDriver = true;
      req.userId = phone;
      req.driverId = phone;
      next();
    } else {
      res.sendStatus(403);
    }
  },

  check: (req, res, next) => {
    // checks credentials and sets variables:
    // if user is driver, or user is a client, or user is Admin

    var phone = header(req, 'phone');

    req.userId = phone;
    req.isUser = true;
    req.authenticated = true;

    next();
  }
};
