const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURI(address) +
    '.json?access_token=pk.eyJ1IjoibmFtYW5hcm9yYTAyOSIsImEiOiJja2JycG8yY3MyeWhjMnlsOXB5ZDF1aWJ6In0.SqPVGasVv2tnJ5WTksdfwg&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Check your internet connection', { undefined });
    } else if (body.message || body.features.length === 0) {
      callback('Unable to find location', { undefined });
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
