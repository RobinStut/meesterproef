const fetch = require("node-fetch")
const fs = require("fs")

module.exports.url = url => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      const data = await response.json()

      resolve(data)
    } catch (err) {
      console.log(err)
      reject(500)
    }
  })
}

module.exports.file = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err)
        reject(500)
      } else {
        resolve(data.toString())
      }
    })
  })
}
