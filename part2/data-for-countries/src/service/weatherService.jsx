import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const getWeather = (city) => {
    const params = `&q=${city}&units=metric`
    const request = axios.get(baseUrl + params)
    return request.then(response => response.data)
}

export default { getWeather }