const fetch = require("node-fetch")
const fs = require("fs")

module.exports.url = url => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(urlToFetch),
      data = await response.json()

    resolve(data)
  })
}

module.exports.file = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data.toString())
    })
  })
}
