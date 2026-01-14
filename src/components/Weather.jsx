import { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const search = async (cityName) => {
        try {
            if (cityName === "") {
                alert("Enter city name");
                return;
            }
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    alert("Invalid API Key. Please check your configuration.");
                } else if (response.status === 404) {
                    alert("City not found. Please enter a valid city name.");
                } else {
                    alert(data.message || "Something went wrong.");
                }

                setWeatherData({
                    humidity: "--",
                    windSpeed: "--",
                    temperature: "--",
                    location: "N/A",
                    icon: clear_icon,
                    weather: message
                });
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weather: data.weather[0].main
            })
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        search("Chennai");
    }, [])

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            <img className="weather-icon" src={weatherData.icon} alt="" />
            <p className="city">-- {weatherData.weather} --</p>
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='city'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;