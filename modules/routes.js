const sportproviderUrl =
	"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportaanbieders.json"
const eventsUrl =
	"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportEvents.json"
const sportDescriptionUrl =
	"https://raw.githubusercontent.com/RobinStut/meesterproef/feature/sportaanbiederScrape/data/json/sportDescription.json"

const quizPostRequest = require("./quiz/quiz-postrequest.js")
const fetchData = require("./helper/helper-fetch.js")
const getAllSports = require("./sportlist/sportlist-az-list.js")
const sportlistEvents = require("./sportlist/sportslist-events.js")
const getClubs = require("./sportlist/sportlist-clubs.js")
const sportDescriptions = require("./sportlist/sportlist-descriptions.js")
const quizCalc = require("./quiz/quiz-calculation.js")

module.exports = (app, eventsData, sportproviderData, sportDescriptionData) => {
	app.get("/", (req, res) => {
		res.render("pages/index.ejs", {
			hero: "hero--big",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.get("/sportslist", async (req, res) => {
		const allSportClubs = await fetchData(sportproviderUrl, sportproviderData)
		sportproviderData = allSportClubs
		const allSports = await getAllSports(sportproviderData)

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
		const clubs = await getClubs(sportproviderData, id)
		const allDescriptions = await fetchData(
			sportDescriptionUrl,
			sportDescriptionData
		)
		sportDescriptionData = allDescriptions
		const description = await sportDescriptions(allDescriptions, id)

		res.render("pages/sportlist/sportlist-clubs.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z"],
			sport: id,
			clubs: clubs,
			sportDescription: description[0].description
		})
	})
	app.get("/sportslist/events/:id", async (req, res) => {
		const id = req.params.id
		const allEvents = await fetchData(eventsUrl, eventsData)
		eventsData = allEvents
		const events = await sportlistEvents(allEvents, id)
		const allDescriptions = await fetchData(
			sportDescriptionUrl,
			sportDescriptionData
		)
		sportDescriptionData = allDescriptions
		const description = await sportDescriptions(allDescriptions, id)

		res.render("pages/sportlist/sportlist-events.ejs", {
			hero: "hero--small",
			heroText: ["Sports Activities A-Z"],
			sport: id,
			events: events,
			sportDescription: description[0].description
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
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.post("/quiz", async function(req, res) {
		const sportQuizData = await fetchData(
			"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportQuizFilter.json",
			app,
			eventsData,
			sportproviderData
		)
		const quizResult = quizCalc(req, sportQuizData)
		// console.log(test)
		res.render("pages/quiz/quiz-result.ejs", {
			quizResult: quizResult,
			sportQuizData: sportQuizData,
			hero: "hero--small",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.get("/login", (req, res) => {
		res.render("pages/sportprovider/sportprovider-login.ejs", {
			hero: "hero--small",
			heroText: ["Login/Register"]
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
			"https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportQuizFilter.json"
		)
		res.render("pages/events/events-overview.ejs", {
			hero: "small-hero",
			heroText: ["Events"],
			sportEvents: sportEvents,
			sportDescription: sportDescription
		})
	})
}
