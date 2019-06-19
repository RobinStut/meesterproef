module.exports = (app, conceptEvents) => {
	app.post("/create-event", (req, res) => {
		let event = {
			general: {
				sportProviderId: Math.random(),
				title: req.body["event-name"],
				description: req.body["event-description"]
			},
			sport: {
				sportName: req.body["event-sport"],
				category: req.body["event-category"]
			},
			location: {
				city: req.body["event-city"],
				address: req.body["event-address"]
			},
			time: {
				timeStart: req.body["event-from-time"],
				timeEnd: req.body["event-till-time"]
			},
			date: req.body["event-date"]
		}

		conceptEvents.push(event)

		res.render("pages/sportprovider/sportprovider-edit-event.ejs", {
			hero: "small-hero",
			heroText: ["Create Event"],
			event: event
		})
	})
}
