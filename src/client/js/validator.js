function validateData(data) {
  const cityName = data.destination
  const date = data.date

  console.log(":::::: Checking Destination Name ::::::", cityName)
  if (cityName == null || cityName == '' || cityName.length < 3 || cityName.length > 20) {
    alert('Please enter city name of 3 to 20 characters')
    return false
  } else {
    console.log('::::::::: Checking date ::::::::', date)
    if (isValidDate(date)) {
      return true
    } else {
      alert('Please enter date in dd/mm/yyyy format')
      return false
    }
  }
}

function isValidDate(date) {
  const regex = '(0\d|1[012])/(0[1-9]|[12][0-9]|3[01])/(20)\d\d$'
  const result = date.match(regex)
  if(result != null)
    return false
  else
    return true
}

export { validateData }