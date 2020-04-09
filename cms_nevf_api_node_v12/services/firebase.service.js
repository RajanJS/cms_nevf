import admin from 'firebase-admin';
import firebase from 'firebase';

const adminServiceAccount = require('../config/cms-nevf-firebase-admin.json');
const clientServiceAccount = require('../config/cms-nevf-firebase.json');

export default class firebaseService {
    static admin = admin.initializeApp({
        // credential: admin.credential.applicationDefault(),
        credential: admin.credential.cert(adminServiceAccount),
        databaseURL: 'https://cms-nevf.firebaseio.com',
        projectId: "cms-nevf",
    });

    static client = firebase.initializeApp(clientServiceAccount);

    static db = admin.firestore();

}