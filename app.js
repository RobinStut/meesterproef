require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const ejs = require("ejs")
const app = express()
const PORT = 3000

let conceptEvents = []
let eventsData = []

app
  .set("view engine", "ejs")
  .set("views", "views")

  .use(express.static("public"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({ secret: "classified" }))

require("./modules/quizPostRequest.js")(app);
require("./modules/routes.js")(app)
require("./modules/create-event.js")(app, conceptEvents)
require("./modules/publish-event.js")(app, conceptEvents, eventsData)
require("./modules/quiz.js")(app);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));