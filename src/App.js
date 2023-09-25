import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/auth/AuthDetails';
import { MovieSearch } from './MovieSearch';
import { MyMovies } from './MyMovies';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="App">
      {!isLoading && (
        <>
          {!isAuthenticated ? (
            <>
              <SignIn onSignIn={handleSignIn} />
              <SignUp />
            </>
          ) : (
            <>
              <Navbar/>
              <Routes>
                <Route path="/" element={<MovieSearch />} />
                <Route path="/Watch-Next" element={<MyMovies />} />
              </Routes>
            </>
          )}
        </>
      )}
      <br />
      <AuthDetails onSignIn={handleSignIn} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
