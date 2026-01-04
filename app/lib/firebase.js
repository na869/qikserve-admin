// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcFgCIuLSm_yZH217YcKurj3xuk2QnSWU",
  authDomain: "qikserve-a9ce6.firebaseapp.com",
  projectId: "qikserve-a9ce6",
  storageBucket: "qikserve-a9ce6.appspot.com",
  messagingSenderId: "253057847936",
  appId: "1:253057847936:web:ba70d4aa7a327909e18c65",
  measurementId: "G-E2D2GBEF2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
