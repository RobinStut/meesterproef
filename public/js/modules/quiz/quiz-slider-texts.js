export default (value, id) => {
  const wolfPack = [
    "Liever solo",
    "Mijn voorkeur gaat uit naar alleen",
    "Ik hou van een mix tussen een team en solo",
    "Sporten met meer mensen is leuker",
    "Teamsport of anders niks"
  ]
  const indoorOutdoor = [
    "Ik ben een kluizenaar, ik kom niet naar buiten",
    "Als er een indoor optie is, kies ik die",
    "Mijn keuze hangt af van hoe ik me voel",
    "Ik hou van frisse lucht",
    "Ik woon praktisch buiten"
  ]
  const fishOrland = [
    "Ik ben als een vis in het water",
    "Liever in het water dan op het droge",
    "Ik heb geen voorkeur",
    "Ik wordt liever niet nat",
    "Water is alleen om te drinken"
  ]

  if (id == 16) {
    writeToMessageField(`message${id}`, wolfPack[value - 1])
  }
  if (id == 17) {
    writeToMessageField(`message${id}`, indoorOutdoor[value - 1])
  }
  if (id == 18) {
    writeToMessageField(`message${id}`, fishOrland[value - 1])
  }

  function writeToMessageField(id, message) {
    document.getElementById(`${id}`).innerHTML = message
  }
}
