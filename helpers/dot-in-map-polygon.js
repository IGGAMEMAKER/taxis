// module.exports = (nvert, vertx, float *verty, float testx, float testy) => {
module.exports = (map, lat, lng) => {
  // x - latitude
  // y - longitude

  const testx = lat;
  const testy = lng;

  let i, j, c;// = 0;
  i = j = c = 0;
  const nvert = map.length;

  const vertx = map.map(point => point[2]);
  const verty = map.map(point => point[1]);

  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if ( ((verty[i] > testy) != (verty[j] > testy)) &&
      (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]) )
      c = !c;
  }

  return c;
};
