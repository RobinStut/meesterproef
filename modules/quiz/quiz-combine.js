module.exports = (req, description, quizValue) => {
	const descriptionData = JSON.parse(description)

	const mergedData = quizValue.map(x => {
		const sportName = x.sport.sport

		function matchDescription(object) {
			return object.sport === sportName
		}
		const detailDescription = descriptionData.find(matchDescription)
		x.sport.description = detailDescription.description
		return x
	})

	return mergedData
}
