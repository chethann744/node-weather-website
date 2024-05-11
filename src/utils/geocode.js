const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}.json&access_token=pk.eyJ1IjoidXNlcnMxMjMiLCJhIjoiY2x2cGt1NG90MDNndjJtbzU2bHlsZmQ3ZyJ9.ZasOur35O4ocyMkpmfZbOw&limit=1`
 
    request({url, json:true}, (error, {body}) =>{
        if(error){
          callback("Unable To Conecet to location Services!", undefined)
        }else if(body.features.length === 0 ){
           callback('Unable to find location. Try another search.', undefined)
        }else{
          callback(undefined, {
             latitude:body.features[0].properties.coordinates.latitude,
             longitude:body.features[0].properties.coordinates.longitude,
             name:body.features[0].properties.name
          })
        }
    }) 
 } 
 
 module.exports = geocode