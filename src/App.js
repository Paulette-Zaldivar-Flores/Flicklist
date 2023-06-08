import './App.css';
import { useState } from 'react';
import { MovieSearch } from './MovieSearch';
import { MyMovies } from './MyMovies';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/auth/AuthDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    // Logic to handle successful sign-in
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    // Logic to handle sign-out
    setIsAuthenticated(false);
  };


  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
      {isAuthenticated ? null : (
        <>
          <SignIn onSignIn={handleSignIn} />
          <SignUp />
        </>
      )}
      <AuthDetails onSignIn={handleSignIn} isAuthenticated={isAuthenticated} />
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/Watch-Next" element={<MyMovies />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
