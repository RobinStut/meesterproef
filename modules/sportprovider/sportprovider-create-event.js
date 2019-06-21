module.exports = (app, conceptEvents) => {
	app.post("/create-event", (req, res) => {
		let event = {
			general: {
				eventId: Math.random(),
				title: req.body["event-name"],
				description: req.body["event-description"],
				image: req.body["event-image"],
				type: req.body["event-type"],
				recurring: req.body["event-recurring"]
			},
			sport: {
				name: req.body["event-sport"],
				category: req.body["event-category"]
			},
			location: {
				name: req.body["event-location-name"],
				city: req.body["event-city"],
				address: req.body["event-address"]
			},
			time: {
				date: req.body["event-date"],
				start: req.body["event-from-time"],
				end: req.body["event-till-time"]
			}
		}

		conceptEvents.push(event)

		res.render("pages/sportprovider/sportprovider-edit-event.ejs", {
			hero: "small-hero",
			heroText: ["Create Event"],
			event: event
		})
	})
}
