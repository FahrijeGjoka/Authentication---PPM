// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgFXXTszMzUgk_azP3E4bZqD-G8Viwue8",
  authDomain: "auth-react-abeaa.firebaseapp.com",
  projectId: "auth-react-abeaa",
  storageBucket: "auth-react-abeaa.firebasestorage.app",
  messagingSenderId: "834956824285",
  appId: "1:834956824285:web:84549fb1e76cdb19fd1534",
  measurementId: "G-23Q1WWXE1W"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 
