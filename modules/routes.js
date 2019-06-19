let allSports
;(async function() {
	const getAllSports = require("./sportlist/sportlist-az-list.js")
	allSports = await getAllSports()
})()

const quizPostRequest = require("./quiz/quiz-postrequest.js"),
	fetchData = require("./helper/helper-fetch.js")

module.exports = (app, eventsData) => {
	app.get("/", (req, res) => {
		res.render("pages/index.ejs", {
			hero: "big-hero",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.get("/sportslist", async (req, res) => {
		res.render("pages/sportlist/sportlist-az-list.ejs", {
			hero: "small-hero",
			heroText: ["Sports Activities A-Z"],
			data: allSports,
			keys: Object.keys(allSports)
		})
	})
	app.get("/sportsmap", async (req, res) => {
		res.render("pages/sportlist/sportlist-map.ejs", {
			hero: "small-hero",
			heroText: ["Sports Activities A-Z MAP"]
		})
	})
	app.get("/sportslist/clubs/:id", async (req, res) => {
		const id = req.params.id
		res.render("pages/sportlist/sportlist-clubs.ejs", {
			hero: "small-hero",
			heroText: ["Sports Activities A-Z"],
			sport: id
		})
	})
	app.get("/sportslist/events/:id", async (req, res) => {
		const id = req.params.id
		res.render("pages/sportlist/sportlist-events.ejs", {
			hero: "small-hero",
			heroText: ["Sports Activities A-Z"],
			sport: id
		})
	})
	app.get("/events", (req, res) => {
		res.render("pages/events/events-overview.ejs", {
			hero: "small-hero",
			heroText: ["Events"],
			data: eventsData
		})
	})
	app.get("/quiz", (req, res) => {
		res.render("pages/quiz/quiz-questions.ejs", {
			hero: "small-hero",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.get("/login", (req, res) => {
		res.render("pages/sportprovider/sportprovider-login.ejs", {
			hero: "small-hero",
			heroText: ["Login/Register"]
		})
	})
	app.get("/sportprovider", (req, res) => {
		res.render("pages/sportprovider/sportprovider-dashboard.ejs", {
			hero: "small-hero",
			heroText: ["Dashboard"]
		})
	})
	app.get("/create-event", async (req, res) => {
		const data = await fetchData()

		res.render("pages/sportprovider/sportprovider-create-event.ejs", {
			hero: "small-hero",
			heroText: ["Create Event"],
			data: data
		})
	})
}
