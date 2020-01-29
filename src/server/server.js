// Dotenv
const dotenv = require('dotenv');
dotenv.config();

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Enable Fetch api
const fetch = require("node-fetch");

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
app.use(express.static('dist'));

const port = 8000;

// Spin up the server
app.listen(port, callback);

// Callback to debug
function callback() {
  console.log("listening on port " + port);
}

// API credentials
const geonamesUsername = process.env.GEONAMES_USERNAME
const darkskyKey = process.env.DARKSKY_KEY
const pixabayKey = process.env.PIXABAY_KEY

app.get('/', function (req, res) {
  console.log('I am listening')
  res.send('Hello Man I am alive')
})

// Initialize trip route with a callback function
app.post('/trip', (req, res) => {
  console.log(':::::::::: Data reached backend ::::::::')
  const inputData = {
    'destination': req.body.destination,
    'date': req.body.date
  }
  console.log(inputData)

  // Call Geonames API
  const geoNamesResult = getGeonamesData(inputData);
  console.log(":::::::: Geonames API Call Result :::::::::::");
  console.log(geoNamesResult);
  
  // // Call Darksky API
  // const darkskyResult = getDarkskyData(geoNamesResult, inputData)
  // console.log(":::::::: Darksky API Call Result :::::::::::");
  // console.log(darkskyResult);
  
  // TODO: Call Pixabay API
  
  // TODO: Return response
  // Response format
  // const expectedResponse = {
  //   'img_url': '',
  //   'destination': 'city,' + 'country',
  //   'date': userDate,
  //   'weather': {
  //     'high': 23,
  //     'low': 12,
  //     'summary': 'mostly clody'
  //   }
  // }
});


/* Function to GET latitude, longitude and country data from genomes API */
const getGeonamesData = async function (inputData) {
  const completeUrl = 'http://api.geonames.org/searchJSON?name_startsWith=' + inputData.destination + '&maxRows=1&username=' + geonamesUsername;
  const res = await fetch(completeUrl);
  try {
    const newData = await res.json();
    console.log(":::::::: Received Data from Geonames API :::::::::::");
    console.log(newData);
    // filter data in JSON
    const formattedData = {
      'cityName': newData.geonames[0].name,
      'country': newData.geonames[0].countryName,
      'longitude': newData.geonames[0].lng,
      'latitude': newData.geonames[0].lat,
      'countryCode': newData.geonames[0].countryCode
    }
    console.log(":::::::: Formatted Data :::::::::::");
    console.log(formattedData);

    // Call Darksky API
    const darkskyResult = getDarkskyData(formattedData, inputData)
    console.log(":::::::: Darksky API Call Result :::::::::::");
    console.log(darkskyResult);

    return formattedData;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

/* Function to GET weather {high, low, summary} data from Darksky API */
const getDarkskyData = async function (geonamesResult, inputData) {
  const splitDate = inputData.date.split('/');
  const day = splitDate[0];
  const month = splitDate[1];
  const year = splitDate[2];
  const timeInSeconds = Math.round(new Date(year, month, day).getTime() / 1000);
  const completeUrl = 'https://api.darksky.net/forecast/' + darkskyKey + '/' + geonamesResult.latitude + ',' + geonamesResult.longitude + ',' + timeInSeconds + '?units=si';
  console.log(":::::::::::: URL ::::::::::::::");
  console.log(completeUrl)

  const res = await fetch(completeUrl);
  try {
    const newData = await res.json();
    console.log(":::::::: Received Data from Darksky API :::::::::::");
    console.log(newData);
    const dailyData = newData.daily.data[0];
    console.log(dailyData);
    // filter data in JSON
    let formattedData = {
      'high': dailyData.temperatureHigh,
      'low': dailyData.temperatureLow,
      'summary': dailyData.summary
    }

    // If summary unavailable, custom message based on temperature
    if (formattedData.summary == undefined) {
      console.log("No option")
      if (formattedData.low < 10)
        formattedData.summary = "Cold weather"
      else if (formattedData.low < 20)
        formattedData.summary = "Pleasant weather"
      else 
        formattedData.summary = "Sunny weather"
    }
    console.log(":::::::: Formatted Data :::::::::::");
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}


// module.exports = getData;