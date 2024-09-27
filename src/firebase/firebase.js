// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGulsm6hwsEb_a3btswA0Hn_BLZmeJykg",
  authDomain: "restlebnb-hotel-app.firebaseapp.com",
  projectId: "restlebnb-hotel-app",
  storageBucket: "restlebnb-hotel-app.appspot.com",
  messagingSenderId: "507195533055",
  appId: "1:507195533055:web:f4ba5294358025bfe04eca",
  measurementId: "G-KGYH5W62YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const auth = getAuth(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;