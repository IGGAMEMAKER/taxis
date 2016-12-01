var fs = require('fs');
var file = fs.readFileSync('/taxis/configs/config.txt', "utf8");
var configs = JSON.parse(file);

module.exports = {
  db: configs.db || 'localhost:27017'
  // db: '146.185.171.204:27017'
};
