const fs = require("fs");

class Object_template {
  constructor(keys) {
    this.keys = keys;
    this.template = this.createTemplate()
  }


  createTemplate() {
    let obj = {}

    this.keys.forEach(k => {
      obj[k] = undefined
    })

    return obj
  }

  createObject(row) {
    const rawValues = row.split(",");
    const keys = Object.keys(this.template)

    rawValues.forEach((v, i) => {
      if (v.length == 0) {
        this.template[keys[i]] = undefined
      } else {
        this.template[keys[i]] = v
      }
    })

    return this.template
  }
}

fs.readFile("data/raw/sportaanbieders.csv", (err, data) => {
  if (err) throw err;

  readCSV(data)
});

function readCSV(data) {
  const csv = data
    .toString()
    .replace(/\r/g, "");

  const rowsArray = csv.split(/\n/g)
  const namingsRow = rowsArray
    .shift()
    .toLowerCase()

    .replace(/\s/g, "_")
    .split(",")

  const template = new Object_template(namingsRow)

  const finalData = rowsArray.map(r => {
    return template.createObject(r)
  })

  const finalJSON = JSON.stringify(finalData)

  fs.writeFile('data/json/sportaanbieders.json', finalJSON, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
