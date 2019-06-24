const fetch = require("node-fetch")

module.exports = allSportClubs => {
  return new Promise(async (resolve, reject) => {
    console.log(allSportClubs.length)
    if (allSportClubs.length !== 0) {
      console.log("Sportclubs are already here")
      resolve(allSportClubs)
    } else {
      console.log("go get data")
      const response = await fetch(
        "https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportaanbieders.json"
      )
      const data = await response.json()
      resolve(data)
    }
  })
}
