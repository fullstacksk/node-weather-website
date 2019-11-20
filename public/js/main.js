console.log("Client Side javascript has been loaded!")



const weatherForm = document.getElementById('weatherForm')
const search = document.getElementById('location')
const weatherResponse = document.getElementById('weatherResponse')
const weatherError = document.getElementById('weatherError')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    weatherError.textContent = "Loading..."
    weatherResponse.textContent = "Loading..."
    const url = '/weather?address=' + encodeURIComponent(search.value)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherError.textContent = data.error
                weatherResponse.textContent = ""
                //console.log(data.error)
            } else {
                weatherError.textContent = ""
                weatherResponse.innerHTML = `<h5>Location : ${data.foundLocation}</h5>
                <p>Today's Weather : ${data.forecastData.summary}</p>
                <p>Highest Temperature : ${data.forecastData.temperatureHigh}</p>
                <p>Lowest Temperature : ${data.forecastData.temperatureLow}</p>
                <p>Humidity : ${data.forecastData.humidity}</p>
                <p>Precipitation : ${data.forecastData.precipProbability}</p>`
                //console.log(data.foundLocation)
                //console.log(data)

            }
        })
    })
})