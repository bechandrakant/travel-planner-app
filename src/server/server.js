// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('../public'));

const port = 8000;

// Spin up the server
app.listen(port, callback);

// Callback to debug
function callback() {
  console.log("listening on port " + port);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
  logData()
}

function logData() {
  console.log("Data sent successfully to client: \n");
  projectData.forEach(data => {
    console.log('{ temperature: ' + data.temperature +
      ', date: ' + data.date +
      ', userResponse: ' + data.userResponse + ' }');
  })
}

// Post Route
app.post("/all", postData);

function postData(req, res) {
  const newData = req.body;
  const newEntry = {
    temperature: newData.temperature,
    date: newData.date,
    userResponse: newData.userResponse
  }
  projectData.push(newEntry);
  console.log('data successfully added' +
    '{ temperature: ' + newData.temperature + ', date: ' + newData.date + ', userResponse: ' + newData.userResponse + ' }');
}