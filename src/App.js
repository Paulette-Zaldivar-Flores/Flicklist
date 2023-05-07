import './App.css';
import { MovieSearch } from './MovieSearch';
import { Navbar } from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Movie Search</h1>
      <MovieSearch />

    </div>
  );
}

export default App;
