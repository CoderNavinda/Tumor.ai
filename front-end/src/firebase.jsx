import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCiBfXbZ_mWAtNc-4q-NZ0UmDaiuNPCp4Y",
  authDomain: "react-auth-fbf1e.firebaseapp.com",
  projectId: "react-auth-fbf1e",
  storageBucket: "react-auth-fbf1e.appspot.com",
  messagingSenderId: "966708901512",
  appId: "1:966708901512:web:7b742ff05cb0b56548d13d",
  measurementId: "G-Q1ECNVN6PS"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);


export {firebaseApp};