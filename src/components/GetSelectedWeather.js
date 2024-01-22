import React, { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
import { PiArrowBendRightUpDuotone } from "react-icons/pi";

const GetSelectedWeather = () => {

    
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const api = "ffe63745a1e6cbad92e44b2bf6f0ea6a";

  const getWeatherData = (city) => {
    // Fetch current weather data to get latitude and longitude
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Extract latitude and longitude from the response data
        const { coord } = data;

        // Fetch forecast data with language parameter
        const apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,hourly&lang=en&appid=${api}`;
        return fetch(apiURL);
      })
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (selectedCity) {
      getWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const dayName = (Wday) => {
    let dateNum = Wday;
    dateNum = new Date(dateNum * 1000);
    dateNum.getDay();
    let options = {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
    };
    /* dateNum = Intl.DateTimeFormat('de-GR', options).format(dateNum) */
    dateNum = Intl.DateTimeFormat("en-US", options).format(dateNum);
    return dateNum;
  };

  return (
    <div className="w-main">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Weather Forcast App" />
        <meta name="keywords" content="weather,forcast,washington,istanbul,london,berlin," />
        <title>Weather Forcating App</title>
      </Helmet>  
      <div style={{ margin: "30px 0" }}>
        <h2 className="w-heading">Five Days Weather Forecast</h2>
      </div>
      <div>
        <select
          className="w-select"
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">Select a city</option>
          <option value="Berlin">Berlin</option>
          <option value="London">London</option>
          <option value="Rome">Rome</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Ankara">Ankara</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Baghdad">Baghdad</option>
          <option value="Beijing">Beijing</option>
          <option value="Brasília">Brasília</option>
          <option value="Cairo">Cairo</option>
          <option value="Copenhagen">Copenhagen</option>
          <option value="Dublin">Dublin</option>
          <option value="Riyadh">Riyadh</option>
          <option value="Washington">Washington</option>
          <option value="Warsaw">Warsaw</option>
          <option value="Pyongyang">Pyongyang</option>
          <option value="Ottawa">Ottawa</option>
          <option value="Canberra">Canberra</option>
          {/* Add more options for other cities as needed */}
        </select>
      </div>
      <div style={{ margin: "0 0 30px" }}>
        <h2 className="w-heading">{selectedCity}</h2>
      </div>
      {weatherData && weatherData.daily ? (
        <div className="w-container">
          {weatherData.daily.slice(0, 5).map((day, index) => (
            <div className="daySelected" key={index}>
              {/* <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3> */}
              <h3>{dayName(day.dt)}</h3>
              <img
                className="w-img"
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={`Weather icon for ${day.weather[0].description}`}
              />
              <p className="w-info">{day.weather[0].description}</p>
              <p className="w-info heigh">{Math.floor(day.temp.max)}°C</p>
              <p className="w-info low">{Math.floor(day.temp.min)}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="up-arrow-container">
            <PiArrowBendRightUpDuotone className="arrow" />
          </div>
          {/* <h2 className='w-loading'>Loading...</h2> */}
        </>
      )}
    </div>
  );
};

export default GetSelectedWeather;
