var logger = require('../helpers/logger');

module.exports = function(err, req, res, next) {
  res.status(err.status || 500);

  var error = {
    message: err.message,
    error: err
  };

  logger.error('standard error handler:', error);
  res.render('error', error);
};
