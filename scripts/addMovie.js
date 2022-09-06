function handleAddMovie(e) {
  e.preventDefault();

  const title = document.querySelector('[data-title-input]').value;
  const poster = document.querySelector('[data-poster-input]').value;
  const year = document.querySelector('[data-year-input]').value;
  const imdbrating = document.querySelector('[data-rating-input]').value;
  const genre = document.querySelector('[data-genre-select]').value;
  const plot = document.querySelector('[data-plot-input]').value;
  const director = document.querySelector('[data-director-input]').value;
  const actors = document.querySelector('[data-actors-input]').value;

  fetch('http://localhost:3000/movies', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      year,
      poster,
      genre,
      imdbrating,
      director,
      actors,
      plot,
    }),
  })
    .then((res) => res.json())
    .then(console.log);

  window.location = 'index.html';
}
document
  .querySelector('[data-add-form]')
  .addEventListener('submit', handleAddMovie);

function homePage() {
  window.location = 'index.html';
}

function liveRange() {
  var range = document.getElementById('rateRange').defaultValue;
  document.getElementById('liveValue').innerHTML = rateRange;
}

function displayRate(rateRange) {
  document.getElementById('liveValue').innerHTML = rateRange;
}
