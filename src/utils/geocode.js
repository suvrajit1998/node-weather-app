const request = require('request')

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic3V2cmFqaXRuYXNrYXIiLCJhIjoiY2s3ZHFkam0zMG54NjNmcGRnNmIzZGp3eiJ9.9w_ZofiJoM216f2AK5ys9g&limit=1'

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location servises!')
    } else if (body.features.length === 0) {
      callback('Unable to find location. try another search!')
    } else {
      callback(undefined, {
        longtitute: body.features[0].center[0],
        lattitite: body.features[0].center[1],
        placeName: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode
