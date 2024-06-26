// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXFTxGNlVFVL7YcZFamEBbXnxrQFT0lk",
  authDomain: "e-voting-7e1be.firebaseapp.com",
  projectId: "e-voting-7e1be",
  storageBucket: "e-voting-7e1be.appspot.com",
  messagingSenderId: "736778340060",
  appId: "1:736778340060:web:2819390f418facf8075619"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app