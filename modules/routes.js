module.exports = app => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs")
  })
  app.get("/quiz", (req, res) => {
    res.render("pages/quiz.ejs")
  })
}