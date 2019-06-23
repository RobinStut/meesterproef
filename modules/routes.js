let allSports
;(async function() {
	const getAllSports = require("./sportlist/sportlist-az-list.js")
	allSports = await getAllSports()
})()

const quizPostRequest = require("./quiz/quiz-postrequest.js")
const fetchData = require("./helper/helper-fetch.js")
const sportlistEvents = require("./sportlist/sportslist-events.js")
const getClubs = require("./sportlist/sportlist-clubs.js")
const quizCalc = require("./quiz/quiz-calculation.js")

module.exports = (app, eventsData) => {
	app.get("/", (req, res) => {
		res.render("pages/index.ejs", {
			hero: "hero--big",
			heroText: ["Amsterdam", "Zuidoost", "Be a part of it!"]
		})
	})
	app.get("/sportslist", async (req, res) => {
		res.render("pages/sportlist/sportlist-az-list.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z"],
			data: allSports,
			keys: Object.keys(allSports)
		})
	})
	app.get("/sportsmap", async (req, res) => {
		res.render("pages/sportlist/sportlist-map.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z MAP"]
		})
	})
	app.get("/sportslist/clubs/:id", async (req, res) => {
		const id = req.params.id
		const clubs = await getClubs(id)
		res.render("pages/sportlist/sportlist-clubs.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z"],
			sport: id,
			clubs: clubs
		})
	})
	app.get("/sportslist/events/:id", async (req, res) => {
		const id = req.params.id
		const events = await sportlistEvents(id)
		res.render("pages/sportlist/sportlist-events.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z"],
			sport: id,
			events: events
		})
	})
	app.get("/events", (req, res) => {
		res.render("pages/events/events-overview.ejs", {
			hero: "hero--small",
			heroText: ["Events"],
			data: eventsData
		})
	})
	app.get("/quiz", (req, res) => {
		res.render("pages/quiz/quiz-questions.ejs", {
			hero: "hero--small",
			heroText: ["Sports Configurator"]
		})
	})
	app.post("/quiz", async function(req, res) {
		const sportQuizData = await fetchData(
			"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportQuizFilter.json"
		)
		const quizResult = quizCalc(req, sportQuizData)

		res.render("pages/quiz/quiz-result.ejs", {
			quizResult: quizResult,
			sportQuizData: sportQuizData,
			hero: "hero--small",
			heroText: ["Sports Configurator"]
		})
	})
	app.get("/login", (req, res) => {
		res.render("pages/sportprovider/sportprovider-login.ejs", {
			hero: "hero--small",
			heroText: [""]
		})
	})
	app.get("/sportprovider", (req, res) => {
		res.render("pages/sportprovider/sportprovider-dashboard.ejs", {
			hero: "hero--small",
			heroText: ["Dashboard"]
		})
	})
	app.get("/create-event", async (req, res) => {
		const data = await fetchData(
			"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportDescription.json"
		)

		res.render("pages/sportprovider/sportprovider-create-event.ejs", {
			hero: "hero--small",
			heroText: [""],
			data: data
		})
	})
}
