let allSports
;(async function() {
  const getAllSports = require("./sportslist.js")
  allSports = await getAllSports()
  //console.log(allSports);
})()

const getEvents = require("./sportslist-events.js")

const quizPostRequest = require("./quizPostRequest.js"),
  fetchData = require("./fetch.js")

module.exports = (app, eventsData) => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs", {
      hero: "big-hero",
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
    })
  })
  app.get("/sportslist", async (req, res) => {
    res.render("pages/sportslist.ejs", {
      hero: "small-hero",
      heroText: ["Sports Activities A-Z"],
      data: allSports,
      keys: Object.keys(allSports)
    })
  })
  app.get("/sportsmap", async (req, res) => {
    res.render("pages/sportsmap.ejs", {
      hero: "small-hero",
      heroText: ["Sports Activities A-Z MAP"]
    })
  })
  app.get("/sportslist/clubs/:id", async (req, res) => {
    const id = req.params.id
    res.render("pages/sportlist-clubs.ejs", {
      hero: "small-hero",
      heroText: ["Sports Activities A-Z"],
      sport: id
    })
  })
  app.get("/sportslist/events/:id", async (req, res) => {
    const id = req.params.id
    const filteredEvents = await getEvents(id)
    console.log(filteredEvents)
    res.render("pages/sportlist-events.ejs", {
      hero: "small-hero",
      heroText: ["Sports Activities A-Z"],
      events: filteredEvents,
      sport: id
    })
  })
  app.get("/events", (req, res) => {
    res.render("pages/events.ejs", {
      hero: "small-hero",
      heroText: ["Events"],
      data: eventsData
    })
  })
  app.get("/quiz", (req, res) => {
    res.render("pages/quiz.ejs", {
      hero: "small-hero",
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
    })
  })
  app.get("/login", (req, res) => {
    res.render("pages/login.ejs", {
      hero: "small-hero",
      heroText: ["Login/Register"]
    })
  })
  app.get("/sportprovider", (req, res) => {
    res.render("pages/sportprovider-dashboard.ejs", {
      hero: "small-hero",
      heroText: ["Dashboard"]
    })
  })
  app.get("/create-event", async (req, res) => {
    const data = await fetchData()

    res.render("pages/create-event.ejs", {
      hero: "small-hero",
      heroText: ["Create Event"],
      data: data
    })
  })
}
