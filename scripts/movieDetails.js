'use strict';

const params = new URLSearchParams(location.search);
const movieId = params.get('movieId');

function fetchData() {
  fetch(`http://localhost:3000/movies/${movieId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error('ERROR');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      document.title = `${data.title} - Details`;

      const detailsPage = `
    <div class="movie ">
      <div class="header">
      <div>
      <h1 class="movie-title">${data.title}</h1>
      <p class="runtime">(${data.runtime} minutes)</p>
      </div>
      
      <div>
      <button type="button" onclick="moveToEditMovie()">Edit movie</button>
      <button type="button" onclick="deleteMovie()">Delete movie</button> </div>
      </div>
      <div class="first-row">
      <div class="poster-image"><img src='${data.poster}'></img></div>
      <iframe width="560" height="425" src="https://www.youtube.com/embed/6hB3S9bIaco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>      
      <div class="side-details">
      <p><i class="fa-regular fa-star"></i> ${data.imdbrating} / 10</P>
      <p><i class="fa-solid fa-trophy"></i> ${data.awards} </p>
      <p><i class="fa-solid fa-ranking-star"></i> moviesHUB position: ${data.id} </p>
      <p><i class="fa-solid fa-child"></i> ${data.rated} </p>
      <div class="netflix" <p>Watch on Netflix</p></div>
      <div class="hulu" <p>Watch on Hulu</p></div>
      <div class="hbo" <p>Watch on HBO Max</p></div>
      <div class="disney" <p>Watch on Disney+</p></div>



      </div>
      </div>
      <p>Year: ${data.year}</P>
      <p>Production: ${data.production}</P>
      <p>Director: ${data.director}</P>
      <p>Actors: ${data.actors}</P>
      <p>Genre: ${data.genre}</P>
      <p class="plot">${data.plot}</P>


      

      </div>
    `;

      document
        .querySelector('#app')
        .insertAdjacentHTML('afterbegin', detailsPage);
    })
    .catch((error) => {
      console.log(error);
    });
}

function random() {
  const randomId = Math.floor(Math.random() * 996);
  window.location = `movieDetails.html?movieId=${randomId}`;
}

function moveToEditMovie() {
  window.location = `editMovie.html?movieId=${movieId}`;
}

function deleteMovie(e) {
  if (confirm('Are you sure you want to delete the movie?') == true) {
    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'DELETE',
    });
    window.location = 'index.html';
    e.preventDefault();
  }
}

function homePage() {
  window.location = 'index.html';
}

fetchData();
