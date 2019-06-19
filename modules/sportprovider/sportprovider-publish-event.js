module.exports = (app, conceptEvents, eventsData) => {
  app.post("/publish-event", (req, res) => {
    if (req.url === "/publish-event" && eventsData.length === 0) {
      eventsData.push(conceptEvents[0])

      conceptEvents.length = 0

      console.log("Event Data:")
      console.log(eventsData)

      res.redirect("/")
    } else if (eventsData.length > 0) {
      console.log(conceptEvents)

      const exists = eventsData.find(e => {
        return (
          e.general.title.toLowerCase() ===
          conceptEvents[0].general.title.toLowerCase()
        )
      })
      if (!exists) {
        eventsData.push(conceptEvents[0])

        conceptEvents.length = 0

        console.log("Event Data:")
        console.log(eventsData)

        res.redirect("/")
      } else {
        console.log("Sorry, that event already exists.")

        res.redirect("/")
      }
    }
  })
}

module.exports = (app, fs, conceptEvents, eventsData) => {
  app.post("/publish-event", (req, res) => {
    if (req.url === "/publish-event" && eventsData.length === 0) {
      eventsData.push(conceptEvents[0])

      fs.writeFile(
        "./data/json/sportEvents.json",
        JSON.stringify(eventsData),
        err => {
          if (err) {
            return console.log(err)
          }
        }
      )

            res.redirect('/events')
        } else if (eventsData.length > 0) {
            console.log(conceptEvents)
      conceptEvents.length = 0

            const exists = eventsData.find(e => {
                return e.general.title.toLowerCase() === conceptEvents[0].general.title.toLowerCase()
            })
            if (!exists) {
                eventsData.push(conceptEvents[0])
      res.redirect("/events")
    } else if (eventsData.length > 0) {
      const exists = eventsData.find(e => {
        return (
          e.general.title.toLowerCase() ===
          conceptEvents[0].general.title.toLowerCase()
        )
      })
      if (!exists) {
        eventsData.push(conceptEvents[0])

                conceptEvents.length = 0
        conceptEvents.length = 0

                console.log('Event Data:')
                console.log(eventsData)
        console.log("Event Data:")

                res.redirect('/')
            } else {
                console.log("Sorry, that event already exists.")
        res.redirect("/")
      } else {
        console.log("Sorry, that event already exists.")

                res.redirect('/')
            }
        }
    })
        res.redirect("/")
      }
    }
  })
}
