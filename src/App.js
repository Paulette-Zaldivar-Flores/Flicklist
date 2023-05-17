import './App.css';
import { MovieSearch } from './MovieSearch';
import { MyMovies } from './MyMovies';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { WatchLater } from './WatchLater';

function App() {
  return (
  <div className="App">
    <Navbar/>

      <Routes>
        <Route path="/" element={<MovieSearch/>}/>
        <Route path="/Watch-Next" element={<MyMovies/>}/>
        <Route path="/Watch-Later" element={<WatchLater/>}/>
      </Routes>

  </div>
  );
}

export default App;
