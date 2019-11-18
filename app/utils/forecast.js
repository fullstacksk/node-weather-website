const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/45bbc7f774ba4c11fe6a763948eaa868/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to connect WEATTHER SERVICES. Please try again!")
        } else if (body.error) {
            callback("Unable to find weather service for this search. Please search another!")
        } else {
            callback(undefined, {
                data: body.daily.data[0]
            })
        }
    })
}

module.exports = forecast