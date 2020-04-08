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
        apiKey: "apikey",
        authDomain: "authDomain",
        databaseURL: "databaseURL",
        projectId: "projectId",
        storageBucket: "storageBucket",
        messagingSenderId: "messagingSenderId",
        appId: "appId",
        measurementId: "measurementId"
    });

    static db = admin.firestore();

}