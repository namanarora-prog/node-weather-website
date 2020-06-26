const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Naman Arora',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Naman Arora',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helptext: 'This is some helpful text',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide an address',
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        temp: forecastData.temp,
        description: forecastData.weather[0].description,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server running');
});
