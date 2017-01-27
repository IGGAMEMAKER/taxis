const logger = require('../helpers/logger');
const request = require('superagent');

const map = require('../helpers/maps/moscow');

const dotInMapPolygon = require('../helpers/dot-in-map-polygon');

const computeRoutePathPrice = (start, end, duration) => {
  // start and end are objects with structure
  // { lat: value, lng: value }

  // nonMKAD is 5 times more expensive than MKAD
  // 55.854330, 37.265097
  const isInPolygon = dotInMapPolygon(map, start.lat, start.lng);
  if (isInPolygon) {
    logger.log('isMKAD', start);
    return duration;
  }

  logger.log('NO MKAD', start);
  return duration * 5;
};


module.exports = (destinationLatitude, departureLatitude, destinationLongitude, departureLongitude) => {
  let totalDuration;

  logger.debug(`/route/price ${destinationLatitude}, ${destinationLongitude}`);
  logger.debug(`${departureLatitude}, ${departureLongitude}`);

  const key = 'AIzaSyCL921mwdCIwz4uKJOjBfRAFDmRmZLgjPY';

  const origin = `${departureLatitude},${departureLongitude}`;
  const destination = `${destinationLatitude},${destinationLongitude}`;

  const url = 'https://maps.googleapis.com/maps/api/directions';

  return new Promise((resolve, reject) => {
    request
      .get(`${url}/json?mode=driving&origin=${origin}&destination=${destination}&key=${key}`)
      .end((err, data) => {
        if (err) return reject(err);

        const route = data.body.routes[0].legs[0];
        const { steps } = route;
        totalDuration = route.duration.value;

        logger.debug(`duration in seconds: ${totalDuration}`);
        totalDuration = Math.ceil(totalDuration / 60);

        const result = steps.map(step => {
          const duration = step.duration.value;
          const start = step.start_location;
          const end = step.end_location;

          const price = computeRoutePathPrice(start, end, duration);

          return { duration, start, end, price };
        });

        // logger.log(result);

        const price = result.map(r => r.price).reduce((p, c) => p + c);

        logger.log(`summary price is: ${price},  duration: ${totalDuration}`);
        // resolve({ price: 1600, duration: 20 });
        resolve({ price, duration: totalDuration });
      });
  });
};