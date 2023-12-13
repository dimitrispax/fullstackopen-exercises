import { useState, useEffect } from "react"

import countriesService from '../Services/coutries.js'

const Weather = ({ City }) => {

    const [weatherData, setWeatherData] = useState([]);

    /* Function that converts the temparature of Kelvin format to Celsius format. */
    const convertToCelsius = (temperature) => Math.round((temperature - 273.15))

    useEffect(() => {
        countriesService
            .getWeather(City)
            .then(response => {
                setWeatherData(response)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    /* Until the weather data are fetched from the API, informs the user.  */
    if (weatherData.length === 0) {
        return (
            <div>
                <h3>Loading the current weather forecast for {City}... </h3>
            </div>
        )
    } else { // When the data are fetched, display the data.
        return (
            <div>
                <h2>Weather in {City}</h2>
                <p>temperature {convertToCelsius(weatherData.main.temp)} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>

        )
    }
}

export default Weather