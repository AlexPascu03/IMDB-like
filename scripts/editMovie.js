'use strict';



const params = new URLSearchParams(location.search);
const movieId = params.get('movieId');

function fetchData() {
  fetch(`http://localhost:3000/movies/${movieId}`)

  .then(response =>{ 
    if(!response.ok) {
      throw Error("ERROR")
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    
    document.title = `${data.title} - Edit`;

    const detailsPage = `
    <h1>Edit movie</h1>
  <form data-add-form class="add-form">
    <label>Title
    <input class="form-item" value="${data.title}" type="text" placeholder="Title" name="title" data-title-input required />
    </label>
    <label>URL:
    <input class="form-item" value="${data.poster}" type="text" placeholder="Poster URL" name="poster" data-poster-input required/>
    </label>
    <label>Year:
    <input class="form-item" value="${data.year}" type="text" placeholder="Year" name="year" data-year-input required/>
    </label>
    <label>Director:
    <input class="form-item" value="${data.director}" type="text" placeholder="Director" name="director" data-director-input required/>
    </label>
    <label>Actors:
      <input class="form-item" value="${data.actors}" type="text" placeholder="Actors" name="actors" data-actors-input required/>
    </label>
    <label>Awards:
      <input class="form-item" value="${data.awards}" type="text" placeholder="Awards" name="awards" data-awards-input required/>
    </label>
    <label>Rate:
      <input class="form-item" value="${data.rated}" type="text" placeholder="Rate" name="rate" data-rate-input required/>
    </label>
    <label>Production:
      <input class="form-item" value="${data.production}" type="text" placeholder="Production" name="production" data-production-input required/>
    </label>
    <div>
    <label>IMDB rating: <span id="liveValue">${data.imdbrating}</span></label>

    <input class="form-item" type="range" step="0.1" min="0" max="10" id="rateRange" oninput="displayRate(rateRange.value)" name="range" value="${data.imdbrating}" data-rating-input required/>
    
    </div>

    <label for="cars">Choose a genre:</label>
    <select data-genre-select selected="${data.genre}">
      <option value="Action">Action</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Horror">Horror</option>
      <option value="Mystery">Mystery</option>
      <option value="Romance">Romance</option>
      <option value="Thriller">Thriller</option>
    </select>
    </label>
    <label>Plot:</label>
    <textarea  class="form-item" name="plot" id="" placeholder="Plot" cols="30" rows="10" name="plot"  data-plot-input required>"${data.plot}"</textarea>
  </form>

    `
    
    document
    .querySelector('#app').insertAdjacentHTML("afterbegin", detailsPage)

    
    
  }).catch(error => {
    console.log(error)
  })



}
fetchData()

function editData(){
  
  const title = document.querySelector('[data-title-input]').value;
  const poster = document.querySelector('[data-poster-input]').value;
  const year = document.querySelector('[data-year-input]').value;
  const imdbrating = document.querySelector('[data-rating-input]').value;
  const genre = document.querySelector('[data-genre-select').value;
  const plot = document.querySelector('[data-plot-input]').value;
  const director = document.querySelector('[data-director-input]').value;
  const actors = document.querySelector('[data-actors-input]').value;


  fetch(`http://localhost:3000/movies/${movieId}`,{
  method: 'PUT',
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
    plot,
    actors,
  })
  }).then(response =>{ 
    if(!response.ok) {
      throw Error("ERROR")
    }
    return response.json();
  })
  window.location="index.html"

}


function homePage() {
  window.location = "index.html"
}

function liveRange() {
  var range = document.getElementById("rateRange").defaultValue;
  document.getElementById("liveValue").innerHTML = rateRange;
}

function displayRate(rateRange){
    document.getElementById("liveValue").innerHTML = rateRange;
}
