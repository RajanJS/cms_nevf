import admin from 'firebase-admin';
import firebase from 'firebase';
// import serviceAccount from '../config/cms-nevf-firebase.json';

export default class firebaseService {
    static admin = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        // credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://cms-nerf.firebaseio.com'
    });

    static client = firebase.initializeApp({
        apiKey: "AIzaSyBfqMmydfn1RptBzkxNAD3G0tkWi0aTUuY",
        authDomain: "cms-nevf.firebaseapp.com",
        databaseURL: "https://cms-nevf.firebaseio.com",
        projectId: "cms-nevf",
        storageBucket: "cms-nevf.appspot.com",
        messagingSenderId: "871411917468",
        appId: "1:871411917468:web:83c63992d07a4db81e4359",
        measurementId: "G-0Q1KE6PFT3"
    });

    static db = admin.firestore();

}