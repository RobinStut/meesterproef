require("firebase/auth");
require("firebase/firestore");
require("dotenv-json")();
require('dotenv').config()


// Node_modules
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const ejs = require('ejs')
const apiKey = process.env.apiKey;
const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('./public/meesterproef-48b42-firebase-adminsdk-990t4-93c2b22a9f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meesterproef-48b42.firebaseio.com"
});

const user = require("./modules/user.js");

require('dotenv').config()

const app = express()

// Constants
const PORT = 3000

// Express middleware
app.use(express.static('public'))

// EJS middleware
app.set('view engine', 'ejs')
app.set('views', 'views')

// Body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Express-session middleware
app.use(session({
  secret: 'classified'
}))

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


app.get("/", async (req, res) => {
  res.render("pages/index")
});
// Routing
require('./modules/routes.js')(app);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
