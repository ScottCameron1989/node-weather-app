const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const request = require('request');
const weather = require('./weather/weather')

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;
geocode.geocodeAdress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(weatherResults);
      }
    })}});
