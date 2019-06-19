const fetch = require("node-fetch")

const eventsFormat = [
  {
    general: {
      sportProviderId: Math.random(),
      title: "Wandel en Rolstoel driedaagse",
      description:
        "Civic Amsterdam en Sciandri (sportbuurtwerk) organiseren op woensdag 19, donderdag 20 en vrijdag 21 juni de TWEEDE editie van de Wandel- en Rol driedaagse door de Indische Buurt, het Flevopark en omstreken voor iedereen uit Amsterdam Oost. Familieleden, vrijwilligers, mantelzorgers, kleinkinderen etc. zijn allemaal welkom! De naam verklapt het al: Niet alleen wandelaars zonder hulpmiddel, maar ook mensen die gebruik maken van een rollator of rolstoel kunnen meedoen met de Wandel- en Rol driedaagse! Wij zullen een rolstoelvriendelijke route door de buurt uitkiezen en wandelen in een rustig tempo ongeveer een uur tot anderhalf uur, waarna we eindigen bij een terras. Het doel is vooral om leuke en gezellige drie dagen met elkaar te hebben! Op 21 juni krijgen alle deelnemers een medaille. Het is toch een hele overwinning als je hier aan meedoet! Er wordt gezorgd voor drinken en er zijn lekkere hapjes aan het eind van de wandeling!"
    },
    sport: {
      sportName: "Wandelen",
      category: "?"
    },
    location: {
      city: "Kramatplantsoen 101 H",
      address: "Amsterdam",
      name: "Wijkservicepunt Flevopoort"
    },
    time: {
      timeStart: "19 juni 2019",
      timeEnd: "21 juni 2019"
    },
    date: ["19 juni 2019 - 21 juni 2019"]
  },
  {
    general: {
      sportProviderId: Math.random(),
      title: "Middenmeerloop",
      description:
        "De DaaromDiemen Middenmeerloop is een jaarlijks hardloopevenement voor wedstrijdlopers en recreanten. De hoofdafstand is 10km, daarnaast is er een 5km trimloop. De route loopt vanaf het terrein van atletiekvereniging AV’23 door Diemen en het Amsterdam Science park, waarbij zowel een natuurlijke als stadse omgeving wordt aangedaan. Er kan gekozen worden voor een afstand van 5km of 10km.",
      imgLink:
        "https://d2a3ux41sjxpco.cloudfront.net/carousel/file/project_photo/15184/normal_d8849350e8f499e0c8798806b3ed147a7dde49ba.jpg"
    },
    sport: {
      sportName: "Hardlopen",
      category: "Atletiek"
    },
    location: {
      city: "Amsterdam",
      address: "Radioweg 89",
      name: "Atletiekvereniging AV’23"
    },
    time: {
      timeStart: "10:00",
      timeEnd: "15:00"
    },
    date: ["27 oktober 2019"]
  }
]
console.log(eventsFormat)

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    console.log("sport:", id)

    // const response = await fetch(''),
    // const data = await response.json()

    const filter = eventsFormat.filter(sport => sport.sport.category === id)
    console.log(filter)

    resolve(filter)
  })
}
