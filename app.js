const express = require('express');

const hbs = require('hbs');
const path = require('path');
const handlebars=require('hbs'); // register the handlebars
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
handlebars.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  res.render(__dirname + '/views/partials/beers');
});

app.get('/random-beer', (req, res) => {
  res.render(__dirname + '/views/partials/randomBeer');
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
