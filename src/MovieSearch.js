import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieSearch.css';


export const MovieSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSaveMovie = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMovies.push(movie);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    navigate('/Watch-Next', { state: { savedMovie: movie } });
  };

  const displayMovies = () => {
    return (
      <div className="mt-3">
        <ul id="results movie-card">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="list-inline-item ">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 mt-3">
                  <p className="movietitle">{movie.Title}</p>
                  <div className="col-12 card" style={{ width: "15rem" }}>
                    <img className="card-img-top" src={movie.Poster} alt="poster" />
                    <div className="card-body">
                      <div className="overlay">
                        <div className="text">
                          <p>{movie.Plot}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                  type="button"
                  className = "savebutton"
                  onClick={() => {
                    handleSaveMovie(movie);
                  }}
                >
                  Save
                </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const fetchMovies = async () => {
    const url = `https://www.omdbapi.com/?s=${keyword}&apikey=adf1f2d7`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const movies = data.Search || [];
      const promises = movies.map(async (movie) => {
        const plotUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=adf1f2d7&plot=full`;
        const plotResponse = await fetch(plotUrl);
        const plotData = await plotResponse.json();

        return {
          ...movie,
          Plot: plotData.Plot
        };
      });

      const moviesWithPlot = await Promise.all(promises);
      setMovies(moviesWithPlot);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <h1 className='App-header'>Movie Search</h1>
      <form>
        <input className="searchbar" type="text" id="keyword" value={keyword} onChange={handleInputChange} />
        <button className="searchbutton" type="button" id="submit" onClick={fetchMovies}>Search</button>
      </form>
      {movies.length > 0 && displayMovies()}
    </div>
  );


};
