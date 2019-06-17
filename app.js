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

let conceptEvents = []
let eventsData = []

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
require("./modules/routes.js")(app);
require("./modules/create-event.js")(app, conceptEvents);
require("./modules/publish-event.js")(app, conceptEvents, eventsData);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
