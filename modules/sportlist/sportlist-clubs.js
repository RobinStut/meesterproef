const fetch = require("node-fetch")

module.exports = (allSportClubs, id) => {
  return new Promise(async (resolve, reject) => {
    console.log("sport:", id)

    // const response = await fetch(
    //   "https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportaanbieders.json"
    // )
    // const clubs = await response.json()

    const filteredClubs = allSportClubs.filter(club => club.sport === id)
    console.log(filteredClubs)
    resolve(filteredClubs)
  })
}
