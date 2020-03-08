const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Suvra'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Suvra jit'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'Suvra'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must have to provide and address trem.'
    })
  }

  geoCode(
    req.query.address,
    (error, { placeName, lattitite, longtitute } = {}) => {
      if (error) {
        return res.send({
          error
        })
      }

      foreCast(lattitite, longtitute, (error, foreCastData) => {
        if (error) {
          return res.send({
            error
          })
        }

        res.send({
          forecast: foreCastData,
          location: placeName,
          address: req.query.address
        })
      })
    }
  )

  // res.send([
  //   { location: 'Kolkata', forecast: '20' },
  //   { location: 'Mumbai', forecast: '27' }
  // ])
})

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You mast have to provide a search trem.'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Suvra Jit',
    errorMessage: 'help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Suvra Jit',
    errorMessage: 'My 404 Page!'
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
