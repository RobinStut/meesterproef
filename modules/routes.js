module.exports = app => {
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
}