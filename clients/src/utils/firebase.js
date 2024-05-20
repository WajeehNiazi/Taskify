// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskifymain.firebaseapp.com",
  projectId: "taskifymain",
  storageBucket: "taskifymain.appspot.com",
  messagingSenderId: "131676530999",
  appId: "1:131676530999:web:b1fe3749b95f5b7ded52b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);