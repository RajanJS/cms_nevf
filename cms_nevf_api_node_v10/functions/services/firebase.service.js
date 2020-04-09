const admin = require("firebase-admin");
const firebase = require('firebase');

const adminServiceAccount = require('../config/cms-nevf-firebase-admin.json');
const clientServiceAccount = require('../config/cms-nevf-firebase.json');

module.exports = {

    admin: admin.initializeApp({
        // credential: admin.credential.applicationDefault(),
        credential: admin.credential.cert(adminServiceAccount),
        databaseURL: 'https://cms-nevf.firebaseio.com',
        projectId: "cms-nevf",
    }),

    db: admin.firestore(),

    client: firebase.initializeApp(clientServiceAccount)

};