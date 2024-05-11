const express = require('express')
const path = require('path')
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Chethan'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name: 'Chethan' 
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This is some helpful text',
        title: 'Help',
        name: 'Chethan'
    })
})

app.get('', (req, res) =>{
      res.send('<h1>Weather</h1>')
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide an address'
        })
    }
    geocode(`${req.query.address}`, (error, {name}={})=>{
        if(error){
           return res.send({error:error})
        }
     forecast(`${name}`, (error, forcastdata)=>{
        if(error){
          return console.log(error)
        }
            res.send({locationname:name,
            weatherforecast:forcastdata,
            Address: req.query.address
        })
               
     })
        
    })    
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search team'
        })  
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=>{
    res.render('articalerror', {
        title: '404',
        name: 'Chethan',
        errmsg:"Help Article not found."
    })
})

app.get('*', (req, res)=>{
     res.render('404', {
        title: '404',
        name: 'Chethan',
        errmsg:"404 page not found."
     })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})



