var request = require('superagent');

var key = 'AIzaSyCL921mwdCIwz4uKJOjBfRAFDmRmZLgjPY';

var origin = '46.338256,48.044000';
var destination = '46.340056,48.040362';

var url = 'https://maps.googleapis.com/maps/api/directions';
request
  // .get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=driving&language=ru-RU&key=' + key)
  // .get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC&destinations=San+Francisco&mode=driving&language=ru-RU&key=' + key)
  // .get('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=' + key)
  .get(url + '/json?mode=driving&origin=' + origin + '&destination=' + destination + '&key=' + key)
  // .get('http://46.101.157.129/users/all')
  // .end(console.log);
  .end((err, data) => {
    // console.dir(data.body.routes.legs[0].steps.length, { depth: null });
    // console.log(data.body.routes[0].legs);
    // var result = data.body.routes[0].legs[0].steps;
    // var result = data.body;
    var result = data.body.routes[0].legs[0];
    // result = result.map(r => r.html_instructions).join('\n');
    console.log(result);
    // console.log('response', JSON.stringify(data.body.rows));
  });
