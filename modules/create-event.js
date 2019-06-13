module.exports = (app) => {
    let allEvents = []

    app.post('/created-event', (req, res) => {
        let event = {
            sportproviderInfo: {
                name: 'test'
            },
            event: {
                title: req.body['event-name'],
                description: req.body['event-description'],
                location: req.body['event-location'],
                date: req.body['event-date'],
                timeStart: req.body['event-from-time'],
                timeEnd: req.body['event-till-time']
            }
        }

        console.log(event)
    })
}