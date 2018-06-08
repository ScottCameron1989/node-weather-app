const request = require('request');

var geocodeAdress = (address, callback) => {

  const formattedAddress = encodeURIComponent(address)
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to Google Servers');
    } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
      callback('unable to find address');
    } else if (body.status === "OK") {
      callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });
    }
  });
}
module.exports.geocodeAdress = geocodeAdress;
