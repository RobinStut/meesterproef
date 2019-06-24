const fetch = require("node-fetch")

module.exports = allEvents => {
  return new Promise(async (resolve, reject) => {
    console.log("Events lengte", allEvents.length)
    if (allEvents.length !== 0) {
      console.log("Data is already here")
      resolve(allEvents)
    } else {
      console.log("ga data ophalen")
      const response = await fetch(
        "https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportEvents.json"
      )
      const allEvents = await response.json()
      resolve(allEvents)
    }
  })
}
