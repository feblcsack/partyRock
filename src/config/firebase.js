// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA4cK2XT-lyKGVoRuQe6Pxww3_x0jCMarI",
  authDomain: "partyrock-6003d.firebaseapp.com",
  projectId: "partyrock-6003d",
  storageBucket: "partyrock-6003d.firebasestorage.app",
  messagingSenderId: "357653390324",
  appId: "1:357653390324:web:0e344ff93250560a77cfa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;