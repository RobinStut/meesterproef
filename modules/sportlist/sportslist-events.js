const fetch = require("node-fetch")

module.exports = (allEvents, id) => {
  return new Promise(async (resolve, reject) => {
    console.log(allEvents)
    const filter = allEvents.filter(event => event.sport.name[1] === id)
    resolve(filter)
  })
}
