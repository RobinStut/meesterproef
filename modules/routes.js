module.exports = function(app) {
  app.get("/", (req, res) => {
    console.log("Redirected to root")
  })
}
