require("dotenv").config()

const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const multer = require("multer")
const app = express()
const PORT = process.env.PORT || 3000

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

require("./modules/routes.js")(app, upload)

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))
