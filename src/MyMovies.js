import React, { useEffect, useState } from 'react';
import './MyMovies.css';
import Comments from './components/auth/comments';
import { getDatabase, ref, onChildAdded } from 'firebase/database';

export const MyMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieComments, setMovieComments] = useState({});

  useEffect(() => {
    const database = getDatabase();
    const commentsRef = ref(database, 'comments');

    onChildAdded(commentsRef, (snapshot) => {
      const movieId = snapshot.key;
      const comments = snapshot.val();

      setMovieComments((prevComments) => ({
        ...prevComments,
        [movieId]: comments,
      }));
    });

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
                      <Comments movieId={movie.imdbID} comments={movieComments[movie.imdbID]} />
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
