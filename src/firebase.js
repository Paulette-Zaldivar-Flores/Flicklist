// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsPOeXIy-3locz5aPWekgQjjkm_cQnKM8",
  authDomain: "flicklist-8c4b7.firebaseapp.com",
  databaseURL: "https://flicklist-8c4b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flicklist-8c4b7",
  storageBucket: "flicklist-8c4b7.appspot.com",
  messagingSenderId: "942264048605",
  appId: "1:942264048605:web:1dd46a4cceb2c1a4763434",
  measurementId: "G-TDM8PPJN5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Initialize Firebase Realtime Database and get a reference to the service
export const database = getDatabase(app);
