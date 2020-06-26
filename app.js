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
    punkAPI.getBeers()
      .then((beers) => {
        const options = {
          beers
        }
        // console.log('Beers from the database: ', beers);           // would show all beers in the terminal 
        res.render('beers', options);
      })
      .catch((error) => console.log(error));
  });


app.get('/randomBeer', (req, res, next) => {                        // next is just an additional parameter
  const randomBeer=punkAPI.getRandom()
  .then(beer => {
    // console.log(beer[0]);                                             // would show random Beer in the terminal 
    res.render('randomBeer', beer[0]);
  })
  .catch(error => {
    console.log(error)
  })
});

const port =3000; 

app.listen(port, () => console.log(`running ‍on port ${port}`));
