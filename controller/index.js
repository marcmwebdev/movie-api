const express = require('express');
const app = express();
const movies = require('../movies');
const movieDb = [...movies];
const port = '1337';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/movies', (req, res) => res.send(movies));

app.get('/movies/:search', (req, res) => {

  const { search } = req.params;

  const directorsSearch = [];

  const filteredSearch = movieDb.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredSearch.length) { 
    res.send(filteredSearch);
    
  } else {
    movieDb.forEach(movie => {
      const casedArray = movie.directors.map(name => name.toLowerCase());
     
      casedArray.forEach(name => {
        if (name.includes(search.toLowerCase())) {
          directorsSearch.push(movie);
        }
      })
    });
    res.send(directorsSearch);
  }
});

app.post('/movies', (req, res) => {
  
  const movie = req.body;

  movieDb.push(movie);
  res.send(movie);
});

app.listen(port, () => console.log(`Server listening on localhost:${port}/`));