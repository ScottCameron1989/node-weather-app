var request = require('request');

const googleKey = 'AIzaSyDZMgkr67yc3R-MOhlO7PN5NUdiPyg5sjA'
var geocodeAdress = (location) => {
  return new Promise((resolve, reject) => {
    const formattedAddress = encodeURIComponent(location);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${googleKey}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to Google Servers');
      } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
        reject('unable to find address');
      } else if (body.status === "OK") {
        resolve({
          location : {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        }
      });
      }
    });
  });
};

geocodeAdress('19146').then((location)=> {
  console.log(location);
}),(errorMessage) => {
  console.log(errorMessage);
};
