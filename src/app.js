const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const app = express()
//paths for express config
const pathToDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')

// setups for handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup for static directory
app.use(express.static(pathToDirectory))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'priya'
    })
})
app.get('/home',(req,res) =>{
    res.render('home',{
        title:'Home page',
        name:'priya'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About Page',
        desc:'About Universe',
        name:'priya'
    })
})


// app.get('',(req,res)=>{
//     res.send('<h1>Root Page</h1>')    
// }) 
// app.get('/home',(req,res)=>{
//     res.send([
//         {
//             name:'priya',
//             education:'btech'
//         },
//         {
//             name:'hanu',
//             education:'btech'
//         }
//     ])
// }) 
// app.get('/about',(req,res)=>{
//     res.send('About Page') 
// }) 
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : 'Please provide the address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })    
    })
    
}) 
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error : 'Please provide the search term'
        })
    }
    res.send({
        products : []
    })
}) 
app.get('/help/*',(req,res) =>{
    // res.send('Article not found')
    res.render('error',{
        msg :'Article not found'
    })
})
app.get('*',(req,res)=>{
    // res.send('My 404 page')
    res.render('error',{
        msg :'My Error page'
    })
})
app.listen(3000,()=>{
    console.log('Server is up in running.listening to port 3000.')
})