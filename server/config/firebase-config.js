// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsgbZimps2fUCokL6FZII54RMFNcWCOFY",
  authDomain: "simplyfi-throwaway.firebaseapp.com",
  projectId: "simplyfi-throwaway",
  storageBucket: "simplyfi-throwaway.appspot.com",
  messagingSenderId: "787865118167",
  appId: "1:787865118167:web:f0166ab1fcc9c304711792",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;
