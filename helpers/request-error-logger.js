const logger = require('./logger');

module.exports = (req, error) => {
  logger.error('standard error handler:', error);
  logger.error('-------------- ERROR ------------', req.path, req.url, new Date());
  logger.error('input parameters were:');
  logger.error('body', req.body);
  logger.error('query', req.query);
  logger.error('params', req.params);
};
