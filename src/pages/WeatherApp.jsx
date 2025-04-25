// WeatherApp.jsx
import { useState, useEffect } from 'react';


import './WeatherApp.css';
import useDebounce from '../hooks/useDebounce';
import WeatherCard from '../components/WeatherCard';
import Loader from '../components/Loader';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState(localStorage.getItem('lastCity') || 'London');
  const [unit, setUnit] = useState(localStorage.getItem('unitPref') || 'metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [geoLoading, setGeoLoading] = useState(false);

  const debouncedCity = useDebounce(city, 500);


  const API_KEY = "e59360190996447407b49be2bca7f64b";   

  // Fetch weather data and forecast data
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Current weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok) throw new Error('City not found');
        
        const weatherJson = await weatherResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
        );
        
        const forecastJson = await forecastResponse.json();
        
        setWeatherData(weatherJson);
        setForecastData(forecastJson);
        setError(null);
        localStorage.setItem('lastCity', city);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchWeather();
  }, [city, unit, API_KEY]);

  // City suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedCity}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {

        setError('Failed to fetch suggestions', err);
        setSuggestions([]);
      }
    };

    if (debouncedCity) fetchSuggestions();
  }, [debouncedCity, API_KEY]);

  // Geolocation
  const handleGeoLocation = () => {
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          );
          const data = await response.json();
          setCity(data[0].name);
        } catch (err) {
          setError('Failed to get location', err);
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        setError('Please enable location access', err);
        setGeoLoading(false);
      }
    );
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('unitPref', newUnit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setCity(formData.get('city'));
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      
      <div className="controls">
        <button onClick={toggleUnit} className="unit-toggle">
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
        <button 
          onClick={handleGeoLocation} 
          className="geo-button"
          disabled={geoLoading}
        >
          {geoLoading ? <Loader small /> : '📍 Use My Location'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="autocomplete">
          <input
            type="text"
            name="city"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion) => (
                <div
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  onClick={() => setCity(suggestion.name)}
                  className="suggestion-item"
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {loading ? (
        <Loader />
      ) : (
        weatherData && (
          <>
            <WeatherCard 
              data={weatherData} 
              unit={unit} 
              isCurrent 
            />
            
            <div className="forecast">
              <h2>5-Day Forecast</h2>
              <div className="forecast-cards">
                {forecastData?.list
                  .filter((_, index) => index % 8 === 0)
                  .map((item) => (
                    <WeatherCard 
                      key={item.dt} 
                      data={item} 
                      unit={unit} 
                    />
                  ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default WeatherApp;