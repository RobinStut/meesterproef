module.exports = (req, description, quizValue, event) => {
	const descriptionData = description
	const eventData = event
	// console.log(eventData)

	const mergedDescriptions = quizValue.map(x => {
		const sportName = x.sport.sport

		function matchDescription(object) {
			return object.sport === sportName
		}
		const detailDescription = descriptionData.find(matchDescription)
		x.sport.description = detailDescription.description
		return x
	})

	const mergedEvent = mergedDescriptions.map(x => {
		const sportName = x.sport.sport

		function matchEvent(object) {
			return object.sport.name === sportName
		}
		const eventDetail = eventData.find(matchEvent)
		x.sport.event = eventDetail
		return x
	})

	return mergedEvent
}
