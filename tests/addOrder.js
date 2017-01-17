var tester = require('../helpers/tester');

tester.post('/orders', {
  "authKey": "qXtvs1029dasi0w",
  "orders": [
    {
      "asSoonAsPossible": true,
      "clientPhone": "89653502956",
      "destination": {
        "center": [
          55.75222,
          37.61556
        ]
      },
      "driverDetails": {},
      "location": {
        "center": [
          55.75222,
          37.61556
        ]
      },
    }
  ],
  "phone": "89653502956"
});
