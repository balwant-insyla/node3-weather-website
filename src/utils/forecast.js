// Using callback function
const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f0715e63cf039fba2334164082607ced&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)

    request({url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service !', undefined)
        }
         else if(response.body.error){
            callback('Unable to find location !', undefined)
         } else {
             callback(undefined, 'It is '+ response.body.current.weather_descriptions[0] +' and has humidity ' + response.body.current.humidity +' for today. It is currently '+ response.body.current.temperature +' degree out. It feels like ' +response.body.current.feelslike + ' degree out.')
             }

    })
}
module.exports = forecast