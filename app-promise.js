const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

const googleKey = 'AIzaSyDZMgkr67yc3R-MOhlO7PN5NUdiPyg5sjA';
const weatherKey = '1814349366d1a6bf745868b46d741929';
const formattedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${googleKey}`;

axios.get(geocodeUrl).then((response)=>{
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/${weatherKey}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=> {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`temperature is ${temperature} it feels like ${apparentTemperature}`);
}).catch((e)=> {
  if(e.code === 'ENOTFOUND'){
    console.log('unable to connect to API servers');
  } else {
    console.log(e.message);
  }
});
