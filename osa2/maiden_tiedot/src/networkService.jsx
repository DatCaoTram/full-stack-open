import axios from "axios";
const countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const api_key = import.meta.env.VITE_OWM_KEY

/*
Get all countries data from restcountries api 
*/
const getAll = () => {
    const data = axios.get(countriesUrl)
    .then(response => response.data) 
    .catch(error => console.log(error))
    return data
}

/*
Get current weather information based on latitude and longitude
*/
const getWeatherInfo = (lat, lon) => {
    const data = axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => response.data)
    .catch(error => console.log(error))
    return data
}

export default { getAll, getWeatherInfo }