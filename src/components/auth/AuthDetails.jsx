import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  useEffect (() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
      return () => {
        listen();
      }
  }, []);
    const UserSignout = () => {
      signOut(auth).then(() => {
        console.log('signed out')
      })
    }
  return (<div>{authUser ? <p>{`Signed In as ${authUser.email} `} <button>Sign Out</button></p> : <p>Signed Out</p>}</div>;
  );
};

export default AuthDetails;
