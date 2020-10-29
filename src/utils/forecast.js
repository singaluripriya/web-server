const request = require('request')
const forecast = (lat,long,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=1a98747d7d021b7d503b2a7105e03f27&query='+long+','+lat
    request({url,json:true},(error,{body}) => {
        if(error)
        {
            callback('Unable to connect to weather services',undefined)
        }else if(body.error){
            callback('Please specify a valid lat/long',undefined)
        }else{
            callback(undefined,{
                desc:body.current.weather_descriptions[0],
                temp:body.current.temperature,
                feelslike:body.current.feelslike,
                humidity : body.current.humidity
            })
        }   
    })    
}
module.exports = forecast 