import React, { useState, useEffect } from 'react';

const MovieList = ({ movies }) => {
  return (
    <ul id="results">
      {movies.map((movie) => (
        <li key={movie.imdbID} className='list-inline-item'>
          <img src={movie.Poster} alt="poster" />
          <p>{movie.Title}</p>
          <p>{movie.Plot}</p> {/* Add plot here */}
        </li>
      ))}
    </ul>
  );
};

export const MyMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('savedMovies');
    if (storedMovies) {
      setSavedMovies(JSON.parse(storedMovies));
    }
  }, []);

  const handleSaveMovie = (movie) => {
    setSavedMovies((prevState) => [...prevState, movie]);
    localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, movie]));
  };

  return (
    <div>
      <h1>My Movies</h1>
      {savedMovies.length > 0 ? (
        <MovieList movies={savedMovies} />
      ) : (
        <p>You have not saved any movies yet.</p>
      )}
      <button onClick={() => handleSaveMovie({ Title: 'Movie Title', Poster: 'Movie Poster', Plot: 'Movie Plot' })}>
        Save Movie
      </button>
    </div>
  );
};
