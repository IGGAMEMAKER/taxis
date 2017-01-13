var Promise = require('bluebird');

module.exports = (value) => {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};
