import React from 'react';
import './MyMovies.css';
import { useLocation } from 'react-router-dom';

export const MyMovies = () => {
  const location = useLocation();
  const savedMovies = location.state?.savedMovies || [];

  return (
    <div>
      <h2>Saved Movies</h2>
      <ul>
        {savedMovies && savedMovies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt="poster" />
            <div className="movie-details">
              <h3>{movie.Title}</h3>
              <p>{movie.Plot}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
