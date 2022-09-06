'use strict';

const apiUrl = 'http://localhost:3000/movies';

console.log(apiUrl);

const params = new URLSearchParams(location.search);
const page = params.get('page') ?? 1;
function fetchData() {
  fetch(`http://localhost:3000/movies?_page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw Error('ERROR');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const mainPage = data
        .map((movie) => {
          return `
      <div onclick="detailsPage('${movie.id}')" class="movie">
        <div class="poster-image"><img src='${movie.poster}'></img></div>
        <p> ${movie.title}</P>
        </div>
      `;
        })
        .join('');

      document.querySelector('#app').insertAdjacentHTML('afterbegin', mainPage);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();

function moveToAddMovie() {
  window.location = 'addMovie.html';
}

function detailsPage(movieId) {
  console.log(movieId);
  window.location = `movieDetails.html?movieId=${movieId}`;
}

function homePage() {
  window.location = 'index.html';
}

// Search

function searchInput(){
const movies = [];
console.log(movies)
fetch(`http://localhost:3000/movies`).then(blob => blob.json())
            .then(data => movies.push(...data))

function findMatches(wordToMatch, movies) {
  return movies.filter(movie => {
     const regex = new RegExp(wordToMatch, 'gi');
    return movie.title.match(regex); 
  })

  }
  
  const searchInput = document.querySelector('.search-bar');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('keyup', displayMatches);


  function displayMatches(){
    const matchArray = findMatches(this.value, movies);
    if (searchInput.value.length < 1 ){
    suggestions.innerHTML = "";

  }else{
  console.log(this.value.length)
  const result = matchArray.map(movie => {
    return `
    <li id="listItem" onclick="detailsPage('${movie.id}')">
    <div class="search-image"><img src='${movie.poster}'></img></div>
    <span  class="search-title">${movie.title}</span>
    <span class="search-year">(${movie.year})</span>
    </li>`;
  }).join('')
  suggestions.innerHTML = result;
  }
};
}
searchInput();

// PAGINATION
const paginationContainer = document.querySelector('[data-pagination-dynamic]');
let minPage = page - 2;
let maxPage = page + 2;
minPage = minPage < 2 ? 2 : minPage;
maxPage = maxPage > 49 ? 49 : maxPage;

const prevLink = document.querySelector('[data-prev]');
const nextLink = document.querySelector('[data-next]');
prevLink.href = `?page=${page - 1}`;
nextLink.href = `?page=${page + 1}`;

if (minPage > 2) {
  const span = createSeparator();
  paginationContainer.prepend(span);
}

for (let i = minPage; i <= maxPage; i++) {
  const a = document.createElement('a');
  a.href = `?page=${i}`;
  a.innerText = i;
  paginationContainer.append(a);
}

if (maxPage < 49) {
  const span = createSeparator();
  paginationContainer.append(span);
}

function createSeparator() {
  const span = document.createElement('span');
  span.innerText = '...';
  return span;
}

//Random

function random() {
  const randomId = Math.floor(Math.random() * 996);
  window.location = `movieDetails.html?movieId=${randomId}`;
}
