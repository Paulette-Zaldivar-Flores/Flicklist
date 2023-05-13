import React, { useEffect, useState } from 'react';
import './MyMovies.css';

export const MyMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setSavedMovies(storedMovies);
  }, []);

  const handleRemoveMovie = (movieId) => {
    const updatedMovies = savedMovies.filter(movie => movie.imdbID !== movieId);
    setSavedMovies(updatedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
  };

  return (
    <div>
      <h2>Saved Movies</h2>
      <ul>
        {savedMovies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt="poster" />
            <div className="movie-details">
              <h3>{movie.Title}</h3>
              <p>{movie.Plot}</p>
              <button onClick={() => handleRemoveMovie(movie.imdbID)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
