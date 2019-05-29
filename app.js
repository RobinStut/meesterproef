<<<<<<< HEAD
=======
require("dotenv-json")();
require('dotenv').config()
>>>>>>> 01fea7913ccf5ed91c298d694e471a17e9474464

// Node_modules
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const ejs = require("ejs")
<<<<<<< HEAD
=======
const apiKey = process.env.apiKey;
const user = require("./modules/user.js");
>>>>>>> 01fea7913ccf5ed91c298d694e471a17e9474464

require("dotenv").config()

const app = express()

// Constants
const PORT = 3000

// Express middleware
app.use(express.static("public"))

// EJS middleware
app.set("view engine", "ejs")
app.set("views", "views")

// Body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Express-session middleware
app.use(session({
  secret: "classified"
}))

<<<<<<< HEAD
=======
// Firebase
require('./modules/firebase.js')();


app.get("/", async (req, res) => {
  res.render("pages/index")
});
>>>>>>> 01fea7913ccf5ed91c298d694e471a17e9474464
// Routing
require("./modules/routes.js")(app);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
