const fetch = require("./helper/fetcher.js")
const filter = require("./helper/filter.js")
const getAllSports = require("./sportlist/sportlist-az-list.js")
const quizCalc = require("./quiz/quiz-calculation.js")

module.exports = (app, eventsData, sportproviderData, sportDescriptionData) => {
  app.get("/", async (req, res) => {
    try {
      const data = await fetch.file("data/json/sportEvents.json")

      res.render("pages/index.ejs", {
        hero: "hero--big",
        heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/sportslist", async (req, res) => {
    try {
      const data = await fetch.file("data/json/sportaanbieders.json")
      const allSports = await getAllSports(data)

      res.render("pages/sportlist/sportlist-az-list.ejs", {
        hero: "hero--small",
        heroText: ["Sports Activities A-Z"],
        data: allSports,
        keys: Object.keys(allSports)
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/sportsmap", (req, res) => {
    res.render("pages/sportlist/sportlist-map.ejs", {
      hero: "hero--small",
      heroText: ["Sports Activities A-Z MAP"]
    })
  })

  app.get("/sportslist/clubs/:id", async (req, res) => {
    const id = req.params.id

    try {
      const allClubs = await fetch.file("data/json/sportaanbieders.json")
      const matchingClubs = await filter.clubs(allClubs, id)

      const allDescriptions = await fetch.file(
        "data/json/sportDescription.json"
      )
      const description = await filter.descriptions(allDescriptions, id)

      res.render("pages/sportlist/sportlist-clubs.ejs", {
        hero: "hero--small",
        heroText: ["Sports Activities A-Z"],
        sport: id,
        clubs: matchingClubs,
        sportDescription: description
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/sportslist/events/:id", async (req, res) => {
    const id = req.params.id

    try {
      const allEvents = await fetch.file("data/json/sportEvents.json")
      const matchingEvents = await filter.events(allEvents, id)

      const allDescriptions = await fetch.file(
        "data/json/sportDescription.json"
      )
      const description = await filter.descriptions(allDescriptions, id)

      res.render("pages/sportlist/sportlist-events.ejs", {
        hero: "hero--small",
        heroText: ["Sports Activities A-Z"],
        sport: req.params.id,
        events: matchingEvents,
        sportDescription: description
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/events", async (req, res) => {
    try {
      const events = await fetch.file("data/json/sportEvents.json")

      res.render("pages/events/events-overview.ejs", {
        hero: "hero--small",
        heroText: ["Events"],
        data: JSON.parse(events)
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/quiz", (req, res) => {
    res.render("pages/quiz/quiz-questions.ejs", {
      hero: "hero--small",
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
    })
  })

  app.post("/quiz", async function(req, res) {
    try {
      const data = await fetch.file("data/json/sportQuizFilter.json")
      const quizResult = quizCalc(req, data)

      res.render("pages/quiz/quiz-result.ejs", {
        quizResult: quizResult,
        hero: "hero--small",
        heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
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
    try {
      const events = await fetch.file("data/json/sportEvents.json")
      const descriptions = await fetch.file("data/json/sportDescription.json")

      res.render("pages/sportprovider/sportprovider-create-event.ejs", {
        hero: "hero--small",
        heroText: ["Events"],
        sportEvents: JSON.parse(events),
        sportDescription: JSON.parse(descriptions)
      })
    } catch (code) {
      res.redirect(`/error?code=${code}`)
    }
  })

  app.get("/dashboard", (req, res) => {
    res.render("pages/sportprovider/sportprovider-dashboard.ejs", {
      hero: "hero--small",
      heroText: ["Dashboard"]
    })
  })

  app.get("/error", (req, res) => {
    // Need to render an error page
    res.end(req.query.code)
  })
}
