const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))




//app.com
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app !',
        name: 'Balwant'
    })
})

//app.com/about
 app.get('/about', (req, res) => {
     res.render('about',{
        title: 'About Me',
        name: 'Balwant'
    })
 })

 //app.com/help
 app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Weather app help!',
        helpText: 'its help page call us ',
        name: 'Balwant'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address,(error,{latitude, longitude, location} = {}) =>{
            if(error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) =>{
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
    
})

//app.com/404 error in help docs
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Weather App',
        errorText: 'Help article not found',
        name: 'Balwant'
    })
})

//app.com/product
app.get('/product',(req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide  a search term.'
        })
    }
    
    res.send({
        product: []
    
    })

})

//app.com/404 error
app.get('*', (req, res) => {
    res.render('404',{
        title: 'Weather App',
        errorText: 'Page not found',
        name: 'Balwant'
    })
})

app.listen(port, () => {
        console.log('Server is up on port '+ port)
})