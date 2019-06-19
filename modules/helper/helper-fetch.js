const fetch = require("node-fetch")

module.exports = urlToFetch => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(urlToFetch),
      data = await response.json()

    resolve(data)
  })
}
