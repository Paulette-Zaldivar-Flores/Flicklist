import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MovieSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSavedMovies] = useState([]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSaveMovie = (movie) => {
    setSavedMovies((prevSavedMovies) => [...prevSavedMovies, movie]);
  };

  const displayMovies = () => {
    return (
      <ul id="results">
        {movies.map((movie) => (
          <li key={movie.imdbID} className='list-inline-item'>
            <img src={movie.Poster} alt="poster" />
            <p>{movie.Title}</p>
            <p>{movie.Plot}</p> {/* Add plot here */}
            <button
              type="button"
              onClick={() => {
                handleSaveMovie(movie);
                navigate('/Watch-Next', { state: { savedMovies: [...saveMovies, movie] } });
              }}
            >
              Save
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const fetchMovies = () => {
    const url = `https://www.omdbapi.com/?s=${keyword}&apikey=adf1f2d7`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const movies = data.Search || [];
        const promises = movies.map(movie => {
          const plotUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=adf1f2d7&plot=full`;
          return fetch(plotUrl).then(response => response.json());
        });
        Promise.all(promises).then(movieData => {
          const moviesWithPlot = movies.map((movie, index) => {
            return {
              ...movie,
              Plot: movieData[index].Plot
            };
          });
          setMovies(moviesWithPlot);
        });
      });
  };


  return (
    <div>
      <h1 className='App-header'>Movie Search</h1>
      <form>
        <input type="text" id="keyword" value={keyword} onChange={handleInputChange} />
        <button type="button" id="submit" onClick={fetchMovies}>Search</button>
      </form>
      {movies.length > 0 && displayMovies()}
    </div>
  );
};
