const fetch = require("node-fetch")

module.exports = (urlToFetch, dataObject) => {
  return new Promise(async (resolve, reject) => {
    if (dataObject.length !== 0) {
      console.log("Er is al data")
      resolve(dataObject)
    } else {
      console.log("Er is nog geen data, dus data ophalen")
      const response = await fetch(urlToFetch)
      let sportproviderData = await response.json()
      resolve(sportproviderData)
    }
  })
}
