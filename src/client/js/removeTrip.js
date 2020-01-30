function removeTrip(event) {
  event.preventDefault()

  document.getElementById("location-image").src = ''
  document.getElementById("location").innerHTML = ''
  document.getElementById("date").innerHTML = ''
  document.getElementById("high-temp").innerHTML = ''
  document.getElementById("low-temp").innerHTML = ''
  document.getElementById("weather-summary").innerHTML = ''
  document.getElementById("trip-details").style.visibility = "hidden"
}

export { removeTrip }