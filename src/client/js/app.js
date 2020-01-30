function handleSubmit(event) {
  event.preventDefault()

  // get data that was put into the form field
  const data = getFormData()
  console.log(data)

  const isValidData = Client.validateData(data)

  if (isValidData) {
      // make a post request with entered url
      console.log("::: Form Submitted :::")
      console.log(data)
      fetch('http://localhost:8000/trip', {
          method: 'POST',
          headers: {
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(res => {
          return res.json()
      })
      // Update DOM with results
      .then((data) => {
          updateUI(data)
      })
  }
}

function getFormData() {
  const data = {
    'destination': document.getElementById('city-name').value,
    'date': document.getElementById('trip-date').value 
  }
  return data;
}

function updateUI(data) {
  document.getElementById("location-image").src = data.imgUrl
  document.getElementById("location").innerHTML = data.destination
  document.getElementById("date").innerHTML = data.date
  document.getElementById("high-temp").innerHTML = data.weather.high
  document.getElementById("low-temp").innerHTML = data.weather.low
  document.getElementById("weather-summary").innerHTML = data.weather.summary
}

export { handleSubmit }