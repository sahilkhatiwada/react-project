// components/WeatherCard.jsx
function WeatherCard({ data, unit, isCurrent }) {
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  
    return (
      <div className={`weather-card ${isCurrent ? 'current' : ''}`}>
        <h3>
          {isCurrent ? 
            `${data.name}, ${data.sys?.country}` : 
            new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })
          }
        </h3>
        <div className="temperature">
          {Math.round(data.main?.temp)} {tempUnit}
        </div>
        <div className="weather-condition">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
          <span>{data.weather[0].description}</span>
        </div>
        <div className="details">
          <p>Humidity: {data.main?.humidity}%</p>
          <p>Wind: {data.wind?.speed} {windUnit}</p>
          {isCurrent && <p>Pressure: {data.main?.pressure} hPa</p>}
        </div>
      </div>
    );
  }
  
  export default WeatherCard;