const express = require('express');
const bodyParser = require('body-parser');
const datasetRouter = require('./routes/dataset.route');
const app = express();


const csv = require('csv-parser');
const fs = require('fs');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://20.56.36.127:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


function readLines(file, cb) {
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
  
app.get('/all', (req, res) => {
  location = './WhatsgoodlyData-10.csv'
  readLines(location, (results) => {
    res.send(results);
  });
});

app.get('/questions', (req, res) => {
  location = './WhatsgoodlyData-10.csv'
  readLines(location, (results) => {
    const unique = [...new Set(results.map((item) => item.Question))];
    res.send(unique);
  });
});

app.get('/questions/:title', (req, res) => {
  let title = req.params.title;
  location = './WhatsgoodlyData-10.csv';
  readLines(location, (results) => {
    const unique = [...new Set(results.filter(item => item.Question.includes(title)).map((item) => item.Question))];
    const resultData = results.filter(item => item.Question.includes(title));
   // obj = Object.fromEntries(Object.entries(resultData).filter((key) => key !== 'Question'));
    obj = resultData.map((item) => {
      delete item.Question;
      return item;
    });
    let result = {
      question : unique,
      data : obj
    }
    console.log(result);
    res.send(result);
  });
});

app.get('/segment-types', (req, res) => {
  location = './WhatsgoodlyData-10.csv'
  readLines(location, (results) => {
    const unique = [...new Set(results.map((item) => item["Segment Type"]))];
    res.send(unique);
  });
});

app.get('/segment-description', (req, res) => {
  location = './WhatsgoodlyData-10.csv'
  readLines(location, (results) => {
    const unique = [...new Set(results.map((item) => item["Segment Description"]))];
    console.log(unique.length);
    res.send(unique);
  });
});

app.get('/answers', (req, res) => {
  location = './WhatsgoodlyData-10.csv'
  readLines(location, (results) => {
    const unique = [...new Set(results.map((item) => item["Answer"]))];
    res.send(unique);
  });
});

//app.use('/dataset',datasetRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});

const port = process.env.PORT || 5000;
app.listen(port);