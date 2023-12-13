import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHER

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}
const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    return request.then(response => response.data)
}


export default { getAllCountries, getWeather }

