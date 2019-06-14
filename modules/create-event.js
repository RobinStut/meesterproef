module.exports = (app) => {
    let allEvents = []

    app.post('/created-event', (req, res) => {
        let event = {
            general:{
                sportProviderId: Math.random(),
                title: req.body['event-name'],
                description: req.body['event-description'],  
            },
            sport:{
                sportName: req.body['event-sport'],
                category: req.body['event-category']
            },
            location:{
                city: req.body['event-city'],
                address: req.body['event-address']
            },
            time:{
                timeStart: req.body['event-from-time'],
                timeEnd: req.body['event-till-time']
            },
            date: req.body['event-date']
        }

        if (allEvents.length === 0) {
            allEvents.push(event)   
        } else if (allEvents.length > 0) {
            const exists = allEvents.find(e => {
                return e.general.title.toLowerCase() === event.general.title.toLowerCase()
            })
            if (!exists) {
                allEvents.push(event)
            } else {
                console.log("Sorry, that event already exists.")
            }
        }

        res.render("pages/created-event.ejs", {
            hero: "small-hero",
            heroText: ["Create Event"]
        })
    })
}