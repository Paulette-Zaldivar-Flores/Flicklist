import React, { useEffect, useState } from 'react';
import './MyMovies.css';
import Comments from './components/auth/comments';
import { getDatabase, ref, onChildAdded } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


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
    alert('Delete?');
  };





  return (
    <div>
      <h1>Watch Next</h1>
      {savedMovies.length === 0 ? (
        <p>You haven't saved any movies yet 🎬 </p>

      ) : (
        <div>
          {savedMovies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <div className="container d-flex justify-content-center p-3">

              <div className="card mymoviescard mb-3" >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={movie.Poster}
                  className="card-img"
                  alt="poster"
                  style={{ objectFit: "cover", height: "100%" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title movieTitle">{movie.Title}</h5>
                      <p className="card-text">{movie.Plot}</p>
                      <Comments movieId={movie.imdbID} comments={movieComments[movie.imdbID]} />
                      <button className="removebutton" onClick={() => handleRemoveMovie(movie.imdbID)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>

  );
};
