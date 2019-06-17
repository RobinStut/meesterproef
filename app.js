// Node_modules
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const ejs = require("ejs")

require("dotenv").config()

const app = express()

// FUCKING KUT BRANCHES

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

// Routing
require("./modules/quizPostRequest.js")(app);

// Routing
require("./modules/routes.js")(app);

// Quiz functionality
require("./modules/quiz.js")(app);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));