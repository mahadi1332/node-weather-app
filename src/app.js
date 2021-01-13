const path = require('path')
const express = require('express')
const hbs = require('hbs')

//Import JS Modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Call Express
const app = express()

// Define paths for Express Configarations
const publicDirectiryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HBS engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to server
app.use(express.static(publicDirectiryPath))

// Operations
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahadi Hassan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mahadi Hassan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help paragraph section for the help file',
        name: 'Mahadi Hassan',
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    } else {
        geocode(req.query.address , (error, {latutude, longitude, location:search} = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(longitude, latutude, (error, {country, location, temparature}) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    country,
                    location,
                    temparature,
                    address: req.query.address,
                })
            })
        })
    }
})

//experiment
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// 404 operations
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahadi Hassan',
        errorMessage: 'Help Article not found',
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mahadi Hassan',
        errorMessage: 'Page Not Found',
    })
})

//server running
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})