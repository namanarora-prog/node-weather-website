const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    encodeURI(latitude) +
    '&lon=' +
    encodeURI(longitude) +
    '&units=metric&appid=56839708959fea7a02ff9a4d9d5f9ef3';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Check your internet connection', undefined);
    } else if (body.message) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = forecast;
