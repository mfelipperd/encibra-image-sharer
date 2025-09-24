// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Temporarily disabled
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwP5q6kbREHTgUyPqHwIZ7ljI_phzwibg",
  authDomain: "encibra-image-shower.firebaseapp.com",
  projectId: "encibra-image-shower",
  storageBucket: "encibra-image-shower.firebasestorage.app",
  messagingSenderId: "857787146736",
  appId: "1:857787146736:web:404515889b2b6558ad7d35"
  // measurementId: "G-KYQRVD9LB9" // Temporarily disabled
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Analytics (temporarily disabled)
// export const analytics = typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? getAnalytics(app) : null;
export const analytics = null;

export default app;
