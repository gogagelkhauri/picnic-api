
const csv = require('csv-parser');
const fs = require('fs');


function getDataset(file, cb){
    let results = [];
    fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data)
    })
    .on('end', () => {
      cb(results); // call the callback with `results` as an argument
    });
}

module.exports = {
    getDataset
}