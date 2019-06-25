require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const ejs = require("ejs")
const path = require("path")
const fs = require("fs")
const request = require("request")
const multer = require("multer")
const app = express()
const PORT = 3000

let conceptEvents = []
let eventsData = []
let sportproviderData = []
let sportDescriptionData = []

const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function(req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		)
	}
})

const upload = multer({ storage: storage })

app
	.set("view engine", "ejs")
	.set("views", "views")

	.use(express.static("public"))
	.use(bodyParser.json())
	.use(
		bodyParser.urlencoded({
			extended: true
		})
	)
	.use(
		session({
			secret: "classified"
		})
	)

// require("./modules/sportlist/sportlist-az-list.js")(request)
require("./modules/routes.js")(
	app,
	eventsData,
	sportproviderData,
	sportDescriptionData
)
require("./modules/quiz/quiz-postrequest.js")(app)
require("./modules/sportprovider/sportprovider-create-event.js")(
	app,
	upload,
	conceptEvents
)
require("./modules/sportprovider/sportprovider-publish-event.js")(
	app,
	fs,
	conceptEvents,
	eventsData
)

// require("./modules/quiz.js")(app)

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))
