const fetch = require("node-fetch")

module.exports.url = url => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      const data = await response.json()

      resolve(data)
    } catch (err) {
      reject(null)
    }
  })
}
