module.exports = (req, data) => {
	const sportQuizData = data

	let comparedResultsOfSports = []
	let mapCounter = 0
	let yourResultsOfForm = {
		age: req.body.howOldAreYou,
		gender: req.body.genderChoice,
		motivation: req.body.mainMotivation,
		groupOrSolo: Number(req.body.wolfpack),
		inOrOutdoor: Number(req.body.inOutdoor),
		fishOrLand: Number(req.body.fishLand),
		improvement: req.body.improve
	}

	let quizResult = []

	sportQuizData.map(x => {
		let percentage = 0

		const groupOrSoloInObject = x.groupOrSolo === yourResultsOfForm.groupOrSolo
		if (groupOrSoloInObject === true) {
			percentage += 33.33
		}
		if (groupOrSoloInObject === false) {
			const calcedPercentage =
				33.33 - Math.abs(yourResultsOfForm.groupOrSolo - x.groupOrSolo) * 3.33
			percentage += calcedPercentage
		}

		const inOrOutdoorInObject = x.inOrOutdoor === yourResultsOfForm.inOrOutdoor
		if (inOrOutdoorInObject === true) {
			percentage += 33.33
		}
		if (inOrOutdoorInObject === false) {
			const calcedPercentage =
				33.33 - Math.abs(yourResultsOfForm.inOrOutdoor - x.inOrOutdoor) * 3.33
			percentage += calcedPercentage
		}

		const fishOrLandInObject = x.fishOrLand === yourResultsOfForm.fishOrLand
		if (fishOrLandInObject === true) {
			percentage += 33.33
		}
		if (fishOrLandInObject === false) {
			const calcedPercentage =
				33.33 - Math.abs(yourResultsOfForm.fishOrLand - x.fishOrLand) * 6.66
			percentage += calcedPercentage
		}

		comparedResultsOfSports.push({
			percentageNum: percentage,
			index: mapCounter
		})
		mapCounter += 1
	})

	comparedResultsOfSports.sort(function(a, b) {
		return a.percentageNum - b.percentageNum
	})

	comparedResultsOfSports.reverse()

	for (let i = 0; i < 5; i++) {
		quizResult.push({
			sport: sportQuizData[comparedResultsOfSports[i].index],
			percent: comparedResultsOfSports[i].percentageNum
		})
	}

	return quizResult
}
