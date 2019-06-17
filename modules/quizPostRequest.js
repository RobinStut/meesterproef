module.exports = app => {
    const request = require('request');
    app.post("/quiz", function (req, res) {

        const howOldAreYou = req.body.howOldAreYou
        const genderChoice = req.body.genderChoice[0]
        const wolfpack = Number(req.body.wolfpack)
        const inOutdoor = Number(req.body.inOutdoor)
        const fishLand = Number(req.body.fishLand)
        const improve = req.body.improve

        console.log(`${howOldAreYou} ${genderChoice} ${wolfpack} ${inOutdoor} ${fishLand} ${improve}`)

        request(`http://${window.location.host}/sportQuizFilter.json`, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

        // const jsonData = await fetch(`http://${window.location.host}/sportQuizFilter.json`).then(function (response) {
        //     //             return response.json();
        //     //         })

        // res.render("pages/setup");
    });
}