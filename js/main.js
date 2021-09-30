document.querySelector('button').addEventListener('click', findDayInfo)

function findDayInfo(){
    // get location (zip, city, etc.) and then input into Weather API parameter
    let location = document.querySelector('input').value

    const url = `http://api.weatherapi.com/v1/current.json?key=0cc54de2b0e14a0ca06154843213009&q=${location}&aqi=yes`
    // make a fetch request to the Weather API
    fetch(url)
        .then(res => res.text())
        .then(data => {
            // parse JSON into object so I can access it. Then get latitude + longitude
            const objectData = JSON.parse(data)
            let lat = objectData.location.lat
            let lon = objectData.location.lon
            let city = objectData.location.name
            let state = objectData.location.region
            let country = objectData.location.country
            let humidity = objectData.current.humidity
            let tempF = objectData.current.temp_f
            let tempC = objectData.current.temp_c

            document.querySelector('#location').innerHTML = `${city}, ${state} in ${country}`
            document.querySelector('#humidity').innerHTML = humidity
            document.querySelector('#temperature').innerHTML = `${tempF}°F and ${tempC}°C`
            console.log(objectData)

            // make a fetch request to the sunset API using lat + lon
            const url2 = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`

            fetch(url2)
                .then(res => res.json())
                .then(data2 => {
                    document.querySelector('#dayLength').innerText = `${data2.results.day_length} hours`
                    document.querySelector('#sunrise').innerText = data2.results.sunrise
                    document.querySelector('#solarNoon').innerText = data2.results.solar_noon
                    document.querySelector('#sunset').innerText =  data2.results.sunset
                    console.log(data2)
                })
                .catch(err => console.log(err))
        })
        .catch(error => console.log(error))
}