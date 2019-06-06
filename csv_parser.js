const fs = require("fs");

fs.readFile("data/raw/sportaanbieders.csv", (err, data) => {
  if (err) throw err;

  readCSV(data)
});

function readCSV(data) {
  const csv = data.toString();
  const rowsArray = csv.split(/\n/g)
  const namingsRow = rowsArray
    .shift()
    .toLowerCase()
    .replace(/\r/g, "")
    .replace(/\s/g, "_")
    .split(",")
console.log(namingsRow)
}
