const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe:'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

const formattedAddress = encodeURIComponent(argv.a)

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}`,
  json: true
}, (error, response, body)=> {
  if (error){
    console.log('unable to connect to Google Servers');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('unable to find address');
  } else if (body.status === "OK"){
    console.log(JSON.stringify(body.results[0].geometry.location.lat,undefined,2));
    console.log(JSON.stringify(body.results[0].geometry.location.lng,undefined,2));
  }
});
