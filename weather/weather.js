const request = require('request');
const key = '1814349366d1a6bf745868b46d741929';

var getWeather = (lat,long, callback) => {

  request({
    url: `https://api.forecast.io/forecast/${key}/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to forecast')
    } else if (response.status === 400) {
      callback('unable to fetch weather')
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}
module.exports.getWeather = getWeather;
