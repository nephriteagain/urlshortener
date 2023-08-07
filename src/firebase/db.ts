// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTs-ds5xx5_Tccgr8eKDyGTeVpf3y_lZI",
  authDomain: "urlshortener-8a6c1.firebaseapp.com",
  projectId: "urlshortener-8a6c1",
  storageBucket: "urlshortener-8a6c1.appspot.com",
  messagingSenderId: "701290345395",
  appId: "1:701290345395:web:eb8b8d7514e47c5cd051c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)