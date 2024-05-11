const request = require('request')

const forecast = (addressname, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=b6a575223c3799ccfe4485155cc41990&query=${addressname}`

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to server', undefined)
        }else if(body.error){
            callback('Unable to find Location', undefined)
        }else{
             callback(undefined, {
                message:`${body.current.weather_descriptions[0]}.it is currently ${body.current.temperature} Degree out. It feels like ${body.current.feelslike} Degress out`
             } )
        }
    })
}

module.exports = forecast