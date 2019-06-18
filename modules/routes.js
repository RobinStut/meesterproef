let allSports;

(async function() {
  const getAllSports = require("./sportslist.js")
  allSports = await getAllSports()
  console.log(allSports);
})()

module.exports = app => {
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
      keys: Object.keys(allSports),
    })
  })
  app.get("/sportsmap", async (req, res) => {
    res.render("pages/sportsmap.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z MAP"],
    })
  })
  app.get("/sportslist/clubs/:id", async (req, res) => {
    const id = req.params.id
    res.render("pages/sportlist-clubs.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z"],
      sport: id,
    })
  })
  app.get("/sportslist/events/:id", async (req, res) => {
    const id = req.params.id
    res.render("pages/sportlist-events.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z"],
      sport: id,
    })
  })
  app.get("/quiz", (req, res) => {
    res.render("pages/quiz.ejs")
  })
} 
