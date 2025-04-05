// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const FIREBASE_APP_API_KEY = "AIzaSyCB3ZP1e7Wf2Pi8QFO6yy9eKIaIWTlRcSs";
const FIREBASE_APP_AUTH_DOMAIN = "ecommerce-shopnest-d968b.firebaseapp.com";
const FIREBASE_APP_PROJECT_ID = "ecommerce-shopnest-d968b";
const FIREBASE_APP_STORAGE_BUCKET =
  "ecommerce-shopnest-d968b.firebasestorage.app";
const FIREBASE_APP_MESSAGE_IN_SENDER_ID = "752055173273";
const FIREBASE_APP_APP_ID = "1:752055173273:web:039003a4de4c4bcdc2f808";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB3ZP1e7Wf2Pi8QFO6yy9eKIaIWTlRcSs",
  authDomain: "ecommerce-shopnest-d968b.firebaseapp.com",
  projectId: "ecommerce-shopnest-d968b",
  storageBucket: "ecommerce-shopnest-d968b.firebasestorage.app",
  messagingSenderId: "752055173273",
  appId: "1:752055173273:web:039003a4de4c4bcdc2f808",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
