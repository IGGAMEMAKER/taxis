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
      driverId: String,

      // those, who are attached to order (chosen by client)
      drivers: Array,
      // // those, who wanted to pick this order(including those, who were actually chosen by client)
      // possibleDrivers: Array,

      status: Number,
      added: Date, // when we received this order

      location: Object,
      destination: Object,
      asSoonAsPossible: Boolean,
      orderDate: Date, // if asSoonAsPossible is false/0 you need to specify this parameter
      clientPhone: String,
      driverDetails: Object,

      options: Object // smoking and all such stuff
    }),

    Drivers: db.model('Drivers', {
      name: String,
      phone: String,

      categories: Object,
      internationalLicence: Boolean,
      gender: Boolean,
      isOfficial: Boolean,
      appearance: String, // comment to Appearance

      isSmoking: Boolean,

      isSessionOpened: Boolean,

      mark: Number
    }),

    DriverPreferences: db.model('DriverPreferences', {
      userId: String,
      driverId: String,

      mark: Number,
      comment: String
    }),

    UserPreferences: db.model('UserPreferences', {
      userId: String,
      driverId: String,

      mark: Number,
      comment: String
    })
  };
};
