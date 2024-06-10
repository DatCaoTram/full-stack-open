import { useState, useEffect } from "react";
import networkService from "../networkService";

const WeatherInfo = ({lat, lng}) => {
    const [weatherData, setWeatherData ] = useState({})

    useEffect(() => {
        networkService.getWeatherInfo(lat, lng)
        .then(data => setWeatherData(data))
    }, [])
    return (
        <div>
            {Object.keys(weatherData).length === 0 
                ? null 
                : (
                <>                    
                    <p>temperature {weatherData.main.temp} Celsius</p> 
                    <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        alt="weather icon" 
                    />
                    <p>wind {weatherData.wind.speed} m/s</p>
                </>
                )
            }    
        </div>
    ) 
}

export default WeatherInfo