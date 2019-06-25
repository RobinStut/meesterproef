module.exports.events = (data, id) => {
  return new Promise((resolve, reject) => {
    const events = JSON.parse(data).filter(event => {
      return event.sport.name.includes(id)
    })

    resolve(events)
  })
}

module.exports.descriptions = (data, id) => {
  return new Promise((resolve, reject) => {
    const description = JSON.parse(data).find(
      description => description.sport === id
    )

    resolve(!description ? "No description" : description.description)
  })
}

module.exports.clubs = (data, id) => {
  return new Promise((resolve, reject) => {
    const clubs = JSON.parse(data).filter(club => club.sport === id)

    resolve(clubs)
  })
}
