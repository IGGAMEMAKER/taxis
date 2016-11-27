var header = (req, key) => {
  return req.body[key];
};

var mockKey = 'qXtvs1029dasi0w';

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
      // logger.log('authentication failed');
      // res.status(501).json({ ololo: 1}).end();
      res.sendStatus(401);
      // next(501);
    }
  },

  isAdmin: (req, res, next) => {
    if (true) { // check authentication
      next();
    } else {
      res.sendStatus(403);
    }
  },

  isDriver: (req, res, next) => {
    // go to DB and find it out
    if (true) { // check authentication
      req.isDriver = true;
      next();
    } else {
      res.sendStatus(403);
    }
  }
};
