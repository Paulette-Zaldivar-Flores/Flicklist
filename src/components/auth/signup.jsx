import { createUserWithEmailAndPassword} from "firebase/auth";
import React, { useState } from 'react';
import { auth } from '../../firebase';
import './auth.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth , email, password)
    .then((userCredential)=> {
      console.log(userCredential)
    }).catch((error)=>{
    console.log(error);
    });
  }

  return(
    <div className = "Signin container">
      <form onSubmit = {signUp}>
      <h1 className = "sign-up"> Sign Up</h1>
      <input className="input mx-3" type = "email"
      placeholder='Enter your email'
      value = {email}
      onChange={(e) => setEmail(e.target.value)}>
      </input>
      <input className="input" type = "password"
      placeholder='Enter your password'
      value = {password}
      onChange={(e) => setPassword(e.target.value)}></input>
      <button className = "signupbutton" type = "submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
