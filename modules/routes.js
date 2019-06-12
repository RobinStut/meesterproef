module.exports = app => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs", {
      hero: "big-hero", 
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
    })
  })
  app.get("/sportslist", (req, res) => {
    res.render("pages/sportslist.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z"]
    })
  })
  app.get("/quiz", (req, res) => {
    res.render("pages/quiz.ejs")
  })
}