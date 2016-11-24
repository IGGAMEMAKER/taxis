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
      activated: Date,

      car: Object,
    }),

    Orders: db.model('Orders', {
      driverId: String,
      userId: String,
      location: Object,
      destination: Object,

      added: Date,
      options: Object, // smoking and all such stuff
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
