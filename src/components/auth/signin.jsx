import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import './auth.css';
import logo from '../../images/logo.png'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth , email, password)
    .then((userCredential)=> {
      console.log(userCredential)
    }).catch((error)=>{
    console.log(error);
    });
  }

  return(
    <div className = "Signin container">
      <img src={logo} alt = "logo" className = "loginlogo mt-5"/>
      <form onSubmit = {signIn}>
      <h1 className = "mt-3"> Log In</h1>
      <input className= "signininput mx-3"
      type = "email"
      placeholder='Enter your email'
      value = {email}
      onChange={(e) => setEmail(e.target.value)}>
      </input>
      <input
      className = "signininput"
      type = "password"
      placeholder='Enter your password'
      value = {password}
      onChange={(e) => setPassword(e.target.value)}></input>
      <button className = "signinbutton" type = "submit">Log In</button>
      </form>
    </div>
  )
}

export default SignIn
