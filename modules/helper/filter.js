module.exports.eventsByName = (data, id) => {
	return new Promise((resolve, reject) => {
		const events = data.filter(event => {
			return event.sport.name.includes(id)
		})

		resolve(events)
	})
}

module.exports.eventsById = (data, id) => {
	return new Promise((resolve, reject) => {
		const event = data.find(event => event.general.id === Number(id))

		resolve(event)
	})
}

module.exports.descriptions = (data, id) => {
	return new Promise((resolve, reject) => {
		const description = data.find(description => description.sport === id)

		resolve(!description ? "No description" : description.description)
	})
}

module.exports.clubs = (data, id) => {
	return new Promise((resolve, reject) => {
		const clubs = data.filter(club => club.sport === id)

		resolve(clubs)
	})
}
