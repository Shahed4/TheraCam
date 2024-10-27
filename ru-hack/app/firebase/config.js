// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMeCkInE6Gy8hM_EGMBNsgUqw8tLg5-_8",
  authDomain: "therapy-ece0f.firebaseapp.com",
  projectId: "therapy-ece0f",
  storageBucket: "therapy-ece0f.appspot.com",
  messagingSenderId: "178362231230",
  appId: "1:178362231230:web:332be91ea741443b8531ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);