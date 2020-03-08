const request = require('request')

const foreCast = (longtitute, lattitute, callback) => {
  const url =
    'https://api.darksky.net/forecast/b36b2e825ef9de92c40cf893a061835c/' +
    lattitute +
    ',' +
    longtitute

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to the weather app!')
    } else if (body.error) {
      callback('Unable to find location servises!')
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is Currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.`
      )
    }
  })
}

module.exports = foreCast
