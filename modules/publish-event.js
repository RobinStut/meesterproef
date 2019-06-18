module.exports = (app, conceptEvents, eventsData) => {
    app.post('/publish-event', (req, res) => {
        if (req.url === '/publish-event' && eventsData.length === 0) {
            eventsData.push(conceptEvents[0])   

            conceptEvents.length = 0

            console.log('Event Data:')
            console.log(eventsData)

            res.redirect('/')
        } else if (eventsData.length > 0) {
            console.log(conceptEvents)

            const exists = eventsData.find(e => {
                return e.general.title.toLowerCase() === conceptEvents[0].general.title.toLowerCase()
            })
            if (!exists) {
                eventsData.push(conceptEvents[0])
                
                conceptEvents.length = 0

                console.log('Event Data:')
                console.log(eventsData)

                res.redirect('/')
            } else {
                console.log("Sorry, that event already exists.")

                res.redirect('/')
            }
        }
    })
}