const logErrors = require('../helpers/request-error-logger');

module.exports = function(err, req, res, next) {
  res.status(err.status || 500);

  const error = {
    message: err.message,
    error: err
  };

  logErrors(req, error);

  res.render('error', error);
};
