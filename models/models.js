var db;
var mongoose = require('mongoose');

module.exports = function(dbAddress) {
  db = mongoose.createConnection('mongodb://' + dbAddress + '/test');

  return {
    Users: db.model('Users', {
      name: String,
      phone: String,
      registered: Date,

      pincode: String,
      authKey: String, // hashed variant of code, which we send to client
      activated: Date,

      car: Object
    }),

    Orders: db.model('Orders', {
      userId: String,
      location: Object,
      destination: Object,
      driverId: String,
      status: Number,

      added: Date,
      options: Object // smoking and all such stuff
    }),

    Drivers: db.model('Drivers', {
      name: String,
      draw: Object,
      level: Number,
      settings: Object,
      Packs: Array,
      Cards: Array,
      Collections: Array
    })
  };
};
