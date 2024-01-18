import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MovieSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSaveMovie = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMovies.push(movie);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    navigate('/Watch-Next', { state: { savedMovie: movie } });
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayMovies = () => {
    const uniqueMovies = Array.from(new Set(movies.map((movie) => movie.imdbID)))
      .map((imdbID) => {
        return movies.find((movie) => movie.imdbID === imdbID);
      });

    return (
      <div className="mt-3">
        <div id="results container-sm d-flex p-3">
          {uniqueMovies.map((movie) => (
            <div key={movie.imdbID} className="list-inline-item"  >

              <div className="row" >
                <div className="col-sm mt-3">

                  <div className = "movie">
                    <img
                      className="movieposter"
                      src={movie.Poster}
                      alt="poster"
                      onClick={() => openModal(movie)}
                    />
                  </div>
                  <div className="flexbox">
                  <p className="movietitle">{movie.Title}</p>
                  </div>
                  <button
                    type="button"
                    className="savebutton"
                    onClick={() => {
                      handleSaveMovie(movie);
                    }}
                  >
                    Save
                  </button>

                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    );
                  };




  const fetchMovies = async () => {
    document.getElementById('loader').style.display = 'block';
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
    } finally {
      document.getElementById('loader').style.display = 'none';
    }
  };

  return (
    <div>
      <div className = "banner" >
      <h1 className="App-header">Flick List</h1>
      <form>
        <input
          className="searchbar"
          type="text"
          id="keyword"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
        />
        <button
          className="searchbutton"
          type="button"
          id="submit"
          onClick={fetchMovies}
        >
          Search
        </button>
      </form>
      </div>
      <div className="loader" id="loader"></div>
      {movies.length > 0 && displayMovies()}
      {isModalOpen && selectedMovie && (
  <div className="modal-overlay">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <h2>{selectedMovie.Title}</h2>
      <p>{selectedMovie.Plot}</p>
    </div>
  </div>
)}


    </div>
  );
};
