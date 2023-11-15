// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADMw8bq83Y72dBtT4E2s7Rdm1Eug0gnoM",
  authDomain: "dokosen.firebaseapp.com",
  projectId: "dokosen",
  storageBucket: "dokosen.appspot.com",
  messagingSenderId: "930374816047",
  appId: "1:930374816047:web:e7b6ec26e134712d11d1da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);