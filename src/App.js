import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/auth/AuthDetails';
import { MovieSearch } from './MovieSearch';
import { MyMovies } from './MyMovies';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
              <Navbar isAuthenticated={isAuthenticated} userSignOut={handleSignOut} />
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
