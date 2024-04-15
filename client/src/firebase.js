// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bwu-hub.firebaseapp.com",
  projectId: "bwu-hub",
  storageBucket: "bwu-hub.appspot.com",
  messagingSenderId: "972449812648",
  appId: "1:972449812648:web:bbcf98a9807aa0c512329d",
  measurementId: "G-85XBLTSS0Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);