const fetch = require('node-fetch')

module.exports = () => {
    return new Promise(async (resolve, reject) => {

        const response = await fetch('https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportQuizFilter.json'),
              data = await response.json()

        resolve(data)
    })
}