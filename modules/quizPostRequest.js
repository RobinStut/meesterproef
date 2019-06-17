module.exports = app => {
    const fetch = require('node-fetch');

    app.post("/quiz", async function (req, res) {

        const sportQuizRequest = await fetch(`https://raw.githubusercontent.com/RobinStut/meesterproef/serverQuiz/public/sportQuizFilter.json`)
        const sportQuizData = await sportQuizRequest.json()
        let comparedResultsOfSports = []
        let mapCounter = 0;
        let yourResultsOfForm = {
            age: req.body.howOldAreYou,
            gender: req.body.genderChoice[0],
            groupOrSolo: Number(req.body.wolfpack),
            inOrOutdoor: Number(req.body.inOutdoor),
            fishOrLand: Number(req.body.fishLand),
            improvement: req.body.improve
        }
        let quizResult = []

        sportQuizData.map(x => {
            let percentage = 0

            const groupCalc = (() => {
                const groupOrSoloInObject = x.groupOrSolo === yourResultsOfForm.groupOrSolo
                if (groupOrSoloInObject === true) {
                    percentage += 33.33;
                }
                if (groupOrSoloInObject === false) {
                    const calcedPercentage = 33.33 - (Math.abs(yourResultsOfForm.groupOrSolo - x.groupOrSolo) * 3.33)
                    percentage += calcedPercentage
                }
            })()

            const inOutdoorCalc = (() => {
                const inOrOutdoorInObject = x.inOrOutdoor === yourResultsOfForm.inOrOutdoor
                if (inOrOutdoorInObject === true) {
                    percentage += 33.33;
                }
                if (inOrOutdoorInObject === false) {
                    const calcedPercentage = 33.33 - (Math.abs(yourResultsOfForm.inOrOutdoor - x.inOrOutdoor) * 3.33)
                    percentage += calcedPercentage
                }
            })()

            const fishOrLandCalc = (() => {
                const fishOrLandInObject = x.fishOrLand === yourResultsOfForm.fishOrLand
                if (fishOrLandInObject === true) {
                    percentage += 33.33;
                }
                if (fishOrLandInObject === false) {
                    const calcedPercentage = 33.33 - (Math.abs(yourResultsOfForm.fishOrLand - x.fishOrLand) * 6.66)
                    percentage += calcedPercentage
                }
            })()
            comparedResultsOfSports.push({
                percentageNum: percentage,
                index: mapCounter
            })
            mapCounter += 1;
        });

        comparedResultsOfSports.sort(function (a, b) {
            return a.percentageNum - b.percentageNum;
        });

        comparedResultsOfSports.reverse()

        for (let i = 0; i < 5; i++) {
            // console.log(`${sportQuizData[comparedResultsOfSports[i].index].sport} with ${comparedResultsOfSports[i].percentageNum}%)`);
            quizResult.push({
                sport: sportQuizData[comparedResultsOfSports[i].index],
                percent: comparedResultsOfSports[i].percentageNum
            })
        }

        console.log(quizResult);

        res.render("pages/quizResult", {
            quizResult: quizResult,
            hero: "small-hero",
            heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
        });
    });
}