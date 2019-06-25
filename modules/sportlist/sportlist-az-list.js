module.exports = data => {
	return new Promise(async (resolve, reject) => {
		const dataMapping = JSON.parse(data).map(function(num) {
			const sportName = num.sport
			const clubName = num.naam
			const website = num.website
			const sportNameFixRx = /([\s]*^)(.*)([\s]*$)/g
			const clubNameFixRx = /("*'*)(.+)("*'*)/g
			const websiteFixRx = /(\.)(nl|com|org|eu|amsterdam|info|net|club)/g

			const sportNameResult = sportNameFixRx.exec(sportName)[2]
			const refactoredSportNameResult =
				sportNameResult.slice(-1) !== " "
					? sportNameResult
					: sportNameResult.slice(0, -1)
			const refactoredDoubleSportNameResultSpaces =
				refactoredSportNameResult.slice(-1) !== " "
					? refactoredSportNameResult
					: refactoredSportNameResult.slice(0, -1)

			const clubNameResult = clubNameFixRx.exec(clubName)[2]
			const websiteResult =
				website !== undefined ? validateWebsite() : "geen website"

			function validateWebsite() {
				const validatedWebsite =
					websiteFixRx.test(website) === true ? website : "geen website"
				return validatedWebsite
			}

			const allData = {
				sport: refactoredDoubleSportNameResultSpaces,
				naam: clubNameResult,
				website: websiteResult,
				naam_accommodatie: num.naam_accommodatie,
				adres_accommodatie: num.adres_accommodatie,
				postcode_accommodatie: num.postcode_accommodatie,
				plaats_accommodatie: num.plaats_accommodatie,
				stadsdeel: num.stadsdeel
			}
			return allData
		})

		const allSportClubs = dataMapping.filter(
			item => Object.keys(item).length !== 0
		) // remove all empty records

		const allSports = allSportClubs.map(item => item.sport)
		const uniqueSports = [...new Set(allSports)].sort()

		const sortedSports = uniqueSports.reduce((a, sport) => {
			if (sport !== undefined) {
				let firstLetter = sport[0].toLocaleUpperCase()
				// either push to an existing dict entry or create one
				if (a[firstLetter]) {
					a[firstLetter].push(sport)
				} else {
					a[firstLetter] = [sport]
				}
				return a
			}
		}, [])
		const remove = sortedSports.A.splice(4, 1)
		delete sortedSports.U
		resolve(sortedSports)
	})
}
