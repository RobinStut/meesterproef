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
  app.get("/carousel_test", (req, res) => {
    res.render("pages/carousel-test.ejs")
  })
}
