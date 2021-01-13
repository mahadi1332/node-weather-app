const request = require('request')

const forecast = (latutude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cc06c07f6f69585b084f232e3d101b2e&query=' + encodeURIComponent(longitude) +','+ encodeURIComponent(latutude)  +'&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to Find Location Weather Data', undefined)
        } else {
            callback(undefined, {
                location: body.location.name,
                country: body.location.country,
                temparature: body.current.temperature,
            })
        }
    })
}

module.exports = forecast