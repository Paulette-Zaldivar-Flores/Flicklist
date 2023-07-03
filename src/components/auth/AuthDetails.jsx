import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';


const AuthDetails = ({ onSignIn }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        onSignIn(); // Call onSignIn function after successful authentication
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [onSignIn]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        window.location.href = '/';
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <p>
          {`Signed In as ${authUser.email} `}
          <button className="signOut" onClick={userSignOut}>Sign Out</button>
        </p>
      ) : null}
    </div>
  );
};

export default AuthDetails;
