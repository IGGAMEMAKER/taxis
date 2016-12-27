var tester = require('../helpers/tester');

// get('/users/all');
// post('/users', { phone: '8955555555131', name: 'Gaga1222' });
// get('/authentication/requestCode/8955555555');
// post('/authentication/authenticate', { pincode: 2222, phone: '8955555555' });
// patch('/users', { changes: { car: { model: 'wolkswagen' } }, phone: '8955555555', authKey: 'qXtvs1029dasi0w' });

  // orders: [{
  //   location: { center: [52.33, 44.44] },
  //   destination: { center: [52.33, 44.44] },
  //   asSoonAsPossible: true,
  //   clientPhone: '88888888888',
  //   driverDetails: {},
  // }],
  // orders: []
  //
  // phone: '8955555555131'

// post('/orders', {
//   "authKey": "qXtvs1029dasi0w",
//   "orders": [
//     {
//       "asSoonAsPossible": true,
//       "clientPhone": "89653502956",
//       "destination": {
//         "center": [
//           55.75222,
//           37.61556
//         ]
//       },
//       "driverDetails": {},
//       "location": {
//         "center": [
//           55.75222,
//           37.61556
//         ]
//       },
//     }
//   ],
//   "phone": "89653502956"
// });
  // orderDate,

// patch('/orders/cancel/5846d3858ca8de1b240c070e');
// patch('/orders/cancel/5846d38d8ca8de1b240c070f');
// api.drivers.all()
//   .then(console.log);

// get('/drivers/all')
/*
post('/drivers', {
  phone: '8955555555132', name: 'Алексей Доронин',
  mark: 7,
  age: 25,
  experience: 4,
  gender: 1,
  categories: {},
  internationalLicence: 1,
  isOfficial: 1,
  isSmoking: 0
});

post('/drivers', {
  phone: '8955555555133', name: 'Алексей Иванов',
  mark: 8,
  age: 35,
  experience: 14,
  gender: 1,
  categories: {},
  internationalLicence: 0,
  isOfficial: 1,
  isSmoking: 0
});

post('/drivers', {
  phone: '8955555555134', name: 'Пётр Сидоров',
  mark: 6,
  age: 45,
  experience: 24,
  gender: 1,
  categories: {},
  internationalLicence: 1,
  isOfficial: 0,
  isSmoking: 1
});
// */

tester.get('/orders/drivers?phone=8955555555&authKey=qXtvs1029dasi0w');
