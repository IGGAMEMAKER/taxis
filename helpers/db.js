var Promise = require('bluebird');

var configs = require('../configs');
var models = require('../models/models')(configs.db);

var updated = count => count.n > 0;
var removed = count => count.result.n > 0;

function list(modelName, find, parameters){
  return new Promise(function (resolve, reject){
    models[modelName].find(find || {}, parameters || '', function (err, array){
      if (err) return reject(err);

      resolve(array);// || null
    });
  });
}

function searchOne(modelName, find, parameters){
  return new Promise(function (resolve, reject){
    models[modelName].findOne(find || {}, parameters || '', function (err, item){
      if (err) return reject(err);

      resolve(item);// || null
    });
  });
}

function findOne(modelName, find, parameters){
  return new Promise(function (resolve, reject){
    models[modelName].findOne(find || {}, parameters || '', function (err, item){
      if (err) return reject(err);

      if (item) return resolve(item);

      reject(null);
    });
  });
}

function save(modelName, item){
  return new Promise(function (resolve, reject) {
    var ITEM = new models[modelName](item);
    ITEM.save(function (err) {
      if (err) return reject(err);

      return resolve(item);
    });
  });
}

function aggregate(modelName, array){
  return new Promise(function (resolve, reject){
    // console.log(modelName, find, updateObj, options);
    models[modelName].aggregate(array, function (err, data){
      if (err) return reject(err);

      return resolve(data);
    });
  });
}

function update(modelName, find, updateObj, options){
  return new Promise(function (resolve, reject){
    // console.log(modelName, find, updateObj, options);

    models[modelName].update(find, updateObj, options || null, function (err, count){
      if (err) return reject(err);

      if (updated(count)) {
        return resolve(1);
      }

      return reject(null);
    });
  });
}

function remove(modelName, find, parameters, options){
  return new Promise(function (resolve, reject){
    models[modelName].remove(find, function (err, count){
      if (err) return reject(err);

      if (removed(count)) {
        return resolve(1);
      }

      return reject(null);
    });
  });
}



// console.log(models['Gift'])
// list('Gift', {}, '')
// update('User', { login: 'Raja' }, { $set: { money: 1060 } })
// .then(console.log)
// .catch(console.error)

var wrap = function(modelName){
  return {
    list: function(find, parameters) {
      return list(modelName, find, parameters);
    },
    find: function (find, parameters){
      return searchOne(modelName, find, parameters);
    },
    findOne: function (find, parameters){
      return findOne(modelName, find, parameters);
    },
    save: function(item){
      return save(modelName, item);
    },
    update: function(find, updateObj, options){
      return update(modelName, find, updateObj, options);
    },
    remove: function(find, parameters, options){
      return remove(modelName, find, parameters, options);
    },
    aggregate: function(array){
      return aggregate(modelName, array);
    },

    model: function(modelName){
      return models[modelName];
    }
  };
};

module.exports = {
  list: list,
  find: searchOne,
  findOne: findOne,
  save: save,
  update: update,
  remove: remove,
  aggregate: aggregate,

  wrap: wrap
};
