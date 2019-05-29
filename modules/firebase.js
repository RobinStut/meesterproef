module.exports = () => {

    require("firebase/auth");
    require("firebase/firestore");


    const firebase = require('firebase');
    const admin = require('firebase-admin');
    const serviceAccount = require('./public/meesterproef-48b42-firebase-adminsdk-990t4-93c2b22a9f.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://meesterproef-48b42.firebaseio.com"
    });
    var config = {
        apiKey: apiKey,
        authDomain: "meesterproef-48b42.firebaseapp.com",
        databaseURL: "https://meesterproef-48b42.firebaseio.com",
        storageBucket: "meesterproef-48b42.appspot.com"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    function writeUserData() {
        firebase.database().ref('users/').set({
            username: 'test',
        });
    }
    writeUserData()
}