const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFoYWRpMTMzMiIsImEiOiJja2pxb2ozaTYxcGhiMnluMDA0eTN3MmhiIn0.WZIwn_QEkxSuUHQS5H-29Q&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to Find Location', undefined)
        } else {
            callback(undefined, {
                latutude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode