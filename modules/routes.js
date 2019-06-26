const fs = require("fs")

const fetch = require("./helper/fetcher.js")
const filter = require("./helper/filter.js")

const getAllSports = require("./sportlist/sportlist-az-list.js")
const quizCalc = require("./quiz/quiz-calculation.js")
const quizCombine = require("./quiz/quiz-combine.js")

const conceptEvents = []

let _eventData, _clubsData, _descriptionData, _quizData

async function updateData() {
	_eventData = await fetch.file("data/json/sportEvents.json")
	_eventData = JSON.parse(_eventData)

	_clubsData = await fetch.file("data/json/sportaanbieders.json")
	_clubsData = JSON.parse(_clubsData)

	_descriptionData = await fetch.file("data/json/sportDescription.json")
	_descriptionData = JSON.parse(_descriptionData)

	_quizData = await fetch.file("data/json/sportQuizFilter.json")
	_quizData = JSON.parse(_quizData)
}

updateData()

setInterval(updateData, 1000 * 60 * 60 * 24)

module.exports = (app, upload) => {
	// HOME
	app.get("/", async (req, res) => {
		const firstTwo = _eventData.slice(0, 2)

		res.render("pages/index.ejs", {
			hero: "hero--big",
			heroText: ["Amsterdam", "Zuidoost", "Be a part of it!"],
			sportEvents: firstTwo,
			popUpData: _eventData
		})
	})

	// SPORTLIST
	app.get("/sportslist", async (req, res) => {
		const allSports = await getAllSports(_clubsData)

		res.render("pages/sportlist/sportlist-az-list.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			data: allSports,
			keys: Object.keys(allSports)
		})
	})

	app.get("/sportsmap", (req, res) => {
		res.render("pages/sportlist/sportlist-map.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"]
		})
	})
	app.get("/sportslist/clubs/:id", async (req, res) => {
		const id = req.params.id

		const matchingClubs = await filter.clubs(_clubsData, id)
		const description = await filter.descriptions(_descriptionData, id)

		res.render("pages/sportlist/sportlist-clubs.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			sport: id,
			clubs: matchingClubs,
			sportDescription: description
		})
	})

	app.get("/sportslist/events/:id", async (req, res) => {
		const id = req.params.id

		const matchingEvents = await filter.eventsByName(_eventData, id)
		const description = await filter.descriptions(_descriptionData, id)

		res.render("pages/sportlist/sportlist-events.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			sport: req.params.id,
			events: matchingEvents,
			sportDescription: description
		})
	})

	// EVENTS
	app.get("/events", (req, res) => {
		res.render("pages/events/events-overview.ejs", {
			hero: "hero--small",
			heroText: ["Activiteiten"],
			data: _eventData
		})
	})
	app.get("/events/:id", async (req, res) => {
		const id = req.params.id

		const matchingEvents = await filter.eventsById(_eventData, id)

		res.render("pages/events/events-detail.ejs", {
			hero: "hero--small",
			heroText: [""],
			data: matchingEvents
		})
	})

	// QUIZ
	app.get("/quiz", (req, res) => {
		res.render("pages/quiz/quiz-questions.ejs", {
			hero: "hero--small",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})
	app.post("/quiz", (req, res) => {
		const quizResult = quizCalc(req, _quizData)
		const quizCombination = quizCombine(
			req,
			_descriptionData,
			quizResult,
			_eventData
		)

		res.render("pages/quiz/quiz-result.ejs", {
			quizResult: quizCombination,
			hero: "hero--small",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})

	// SPORTPROVIDER
	app.get("/login", (req, res) => {
		res.render("pages/sportprovider/sportprovider-login.ejs", {
			hero: "hero--small",
			heroText: ["Login"]
		})
	})
	app.get("/dashboard", (req, res) => {
		res.render("pages/sportprovider/sportprovider-dashboard.ejs", {
			hero: "hero--small",
			heroText: ["Dashboard"]
		})
	})
	app.get("/create-event", (req, res) => {
		res.render("pages/sportprovider/sportprovider-create-event.ejs", {
			hero: "hero--small",
			heroText: [""],
			sportEvents: _eventData,
			sportDescription: _descriptionData
		})
	})
	app.post("/create-event", upload.single("event-image"), (req, res) => {
		let event = {
			general: {
				id: Math.random(),
				title: req.body["event-name"],
				description: req.body["event-description"],
				image: req.file ? req.file.filename : null,
				recurring: req.body["event-recurring"]
			},
			sport: {
				name: req.body["event-sport"],
				category: req.body["event-category"]
			},
			location: {
				name: req.body["event-location-name"],
				city: req.body["event-city"],
				address: req.body["event-address"]
			},
			time: {
				date: req.body["event-date"],
				start: req.body["event-from-time"],
				end: req.body["event-till-time"]
			}
		}

		conceptEvents.push(event)

		res.render("pages/sportprovider/sportprovider-edit-event.ejs", {
			hero: "hero--small",
			heroText: ["Create Event"],
			event: event
		})
	})
	app.post("/publish-event", async (req, res) => {
		if (_eventData.length === 0) {
			_eventData.push(conceptEvents[0])

			fs.writeFile(
				"./data/json/sportEvents.json",
				JSON.stringify(_eventData),
				err => {
					if (err) {
						return console.log(err)
					}
				}
			)

			conceptEvents.length = 0

			res.redirect("/events")
		} else if (_eventData.length > 0) {
			const exists = _eventData.find(e => {
				return (
					e.general.title.toLowerCase() ===
					conceptEvents[0].general.title.toLowerCase()
				)
			})
			if (!exists) {
				_eventData.push(conceptEvents[0])

				fs.writeFile(
					"./data/json/sportEvents.json",
					JSON.stringify(_eventData),
					err => {
						if (err) {
							return console.log(err)
						}
					}
				)

				conceptEvents.length = 0

				_eventData = await fetch.file("data/json/sportEvents.json")
				_eventData = JSON.parse(_eventData)

				res.redirect("/events")
			} else {
				console.log("Sorry, that event already exists.")

				res.redirect("/")
			}
		}
	})
}
