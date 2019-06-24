const fetch = require("node-fetch")

module.exports = (urlToFetch, dataObject) => {
  return new Promise(async (resolve, reject) => {
    if (dataObject.length !== 0) {
      resolve(dataObject)
    } else {
      const response = await fetch(urlToFetch)
      let data = await response.json()
      resolve(data)
    }
  })
}
