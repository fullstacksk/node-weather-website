const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnVsbHN0YWNrc2siLCJhIjoiY2syendtMDN3MDVxZjNubWhoOHVoYW84YSJ9.lRu06QlfLSL5hlPtsVsbDA'
    //callback(undefined, url)
    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback("No Internet! Unable to connect to location service")
        } else if (body.features.length === 0) {
            callback("Improper Address! Please try another search!")
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode