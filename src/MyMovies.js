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
    alert('Are you sure?');
  };

  return (
    <div>
      <h1>Saved Movies</h1>
      {savedMovies.length === 0 ? (
        <p>You haven't saved any movies yet</p>
      ) : (
        <ul>
          {savedMovies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <div className="container d-flex justify-content-center p-3">

              <div className="card mymoviescard mb-3" >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={movie.Poster} className="card-img" alt="poster" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{movie.Title}</h5>
                      <p className="card-text">{movie.Plot}</p>
                      <button className="removebutton" onClick={() => handleRemoveMovie(movie.imdbID)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
