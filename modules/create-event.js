module.exports = (app) => {
    let allEvents = []

    app.post('/created-event', (req, res) => {
        let event = {
            title: req.body['event-name'],
            description: req.body['event-description'],
            location: req.body['event-location'],
            date: req.body['event-date'],
            timeStart: req.body['event-from-time'],
            timeEnd: req.body['event-till-time']
        }

        if (allEvents.length === 0) {
            allEvents.push(event)   
        } else if (allEvents.length > 0) {
            allEvents.map(e => {
                if (e.title === event.title) {
                    console.log('Event already exists')    
                } else {
                    console.log('Event added')
                    allEvents.push(event)      
                }      
            })
        }

        console.log(allEvents)

        res.render("pages/created-event.ejs", {
            hero: "small-hero",
            heroText: ["Create Event"]
        })
    })
}