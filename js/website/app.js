const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const countryCode = "IN";
// Personal API Key for OpenWeatherMap API
const apiKey = "ecd39836cd3b52e98f3ad51675b49dbb";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", showWeatherData);

let weatherData = {};

/* Function called by event listener */
function showWeatherData() {
  const zipCode = document.getElementById("zip").value;
  getWebApiData(baseUrl, zipCode, apiKey)
    // then post
    .then(postData("http://localhost:8000" + "/all", weatherData))
    // then get latest data
    .then(() => {
      projectData = getData("http://localhost:8000" + "/all");
    })
    // DOM manipulation
    .then(() => {
      document.getElementById("temp").innerText = weatherData.temperature;
      document.getElementById("date").innerText = weatherData.date;
      document.getElementById("content").innerText = weatherData.userResponse;
    });
}

/* Function to GET Web API Data*/
const getWebApiData = async function (baseUrl, zipCode, apiKey) {
  const completeUrl = baseUrl + zipCode + "," + countryCode + "&appid=" + apiKey;
  const res = await fetch(completeUrl);
  try {
    const newData = await res.json();
    console.log(newData);
    // filter data 
    const temp = newData.main.temp + "";
    const feelings = document.getElementById("feelings").value;
    weatherData = {
      temperature: temp,
      date: new Date(),
      userResponse: feelings
    };
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data) => {
  console.log(data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  };
}


/* Function to GET Project Data */
const getData = async (url = '') => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  };
}