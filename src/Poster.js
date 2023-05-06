const button = document.querySelector("#submit");
const input = document.querySelector("#keyword");
const results = document.querySelector("#results");

const displayMovies = (movies) => {
  results.innerHTML = "";
  movies.forEach((movie) => {
    results.insertAdjacentHTML(
      "beforeend",
      `<li class='list-inline-item'>
        <img src="${movie.Poster}" alt="poster">
        <p>${movie.Title}</p>
      </li>`
    );
  });
};

const fetchMovies = (keyword) => {
  const url = `https://www.omdbapi.com/?s=${keyword}&apikey=adf1f2d7`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const movies = data.Search; // array of 10 movies
      // 3. Display movies in the ul
      displayMovies(movies);
    });
};

// 2. Listen to a click
button.addEventListener("click", (event) => {
  event.preventDefault();
  // 2.5 Fetch an API
  fetchMovies(input.value);
});


// //////////////////////
// HTTP POST request
// //////////////////////

const searchAlgoliaPlaces = (event) => {
  fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({ query: event.currentTarget.value })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.hits); // Look at local_names.default
    });
};

const search = document.querySelector("#search");
search.addEventListener("keyup", searchAlgoliaPlaces);
