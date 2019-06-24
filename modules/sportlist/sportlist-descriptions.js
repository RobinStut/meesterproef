const fetch = require("node-fetch")

module.exports = (allDescriptions, id) => {
  return new Promise(async (resolve, reject) => {
    const filter = allDescriptions.filter(
      description => description.sport === id
    )
    console.log(filter)
    if (filter.length === 0) {
      console.log("geen beschrijving")
      const description = [""]
      resolve(description)
    } else {
      resolve(filter)
    }
  })
}
