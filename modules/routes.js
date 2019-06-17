module.exports = app => {

const quizPostRequest = require("./quizPostRequest.js"),
      fetchData = require("./fetch.js")

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs", {
      hero: "big-hero",
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
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