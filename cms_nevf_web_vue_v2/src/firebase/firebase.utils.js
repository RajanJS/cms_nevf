import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyBfqMmydfn1RptBzkxNAD3G0tkWi0aTUuY",
  authDomain: "cms-nevf.firebaseapp.com",
  databaseURL: "https://cms-nevf.firebaseio.com",
  projectId: "cms-nevf",
  storageBucket: "cms-nevf.appspot.com",
  messagingSenderId: "871411917468",
  appId: "1:871411917468:web:83c63992d07a4db81e4359",
  measurementId: "G-0Q1KE6PFT3"
};

const firebaseApp = firebase.initializeApp(config);

// export default firebaseApp.firestore();

export const firebaseAuth = firebaseApp.auth();
export const fireStore = firebaseApp.firestore();

export default firebase;
